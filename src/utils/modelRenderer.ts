import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let sharedRenderer: THREE.WebGLRenderer | null = null;
let sharedScene: THREE.Scene | null = null;
let sharedCamera: THREE.PerspectiveCamera | null = null;
let loader: GLTFLoader | null = null;

const CACHE_VERSION = 'v4';
const memoryCache = new Map<string, string>();
const pendingPromises = new Map<string, Promise<string | null>>();

function initRenderer() {
  if (sharedRenderer) return;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  sharedRenderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  sharedRenderer.setSize(256, 256);
  sharedRenderer.setPixelRatio(1.5);
  sharedRenderer.outputColorSpace = THREE.SRGBColorSpace;

  sharedScene = new THREE.Scene();
  sharedCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
  sharedScene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
  dirLight.position.set(3, 8, 5);
  sharedScene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xbad2ff, 0.8);
  fillLight.position.set(-3, 2, -3);
  sharedScene.add(fillLight);

  loader = new GLTFLoader();
}

/**
 * Renderiza en offscreen canvas una captura 3D exacta del modelo Blockbench oficial de Cobblemon.
 * Aplica la animación Ground Idle para que el mob adopte su postura viva oficial y no la T-Pose de modelado.
 */
export async function getCobblemon3DRender(pokemonName: string): Promise<string | null> {
  const slug = pokemonName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Memoria rápida
  if (memoryCache.has(slug)) {
    return memoryCache.get(slug)!;
  }

  // 2. LocalStorage persistente con versionado
  const cacheKey = `cobble_render_${CACHE_VERSION}_${slug}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      memoryCache.set(slug, cached);
      return cached;
    }
  } catch {
    // Si localStorage está lleno o bloqueado
  }

  // 3. Evitar peticiones duplicadas simultáneas
  if (pendingPromises.has(slug)) {
    return pendingPromises.get(slug)!;
  }

  const promise = new Promise<string | null>((resolve) => {
    try {
      initRenderer();
      if (!sharedRenderer || !sharedScene || !sharedCamera || !loader) {
        resolve(null);
        return;
      }

      const modelUrl = `/cobblemon-proxy/pokedex/pokemon/${slug}/models/${slug}.gltf`;

      loader.load(
        modelUrl,
        (gltf) => {
          if (!sharedRenderer || !sharedScene || !sharedCamera) {
            resolve(null);
            return;
          }

          // Limpiar modelos anteriores de la escena (mantener las 3 luces fijas)
          while (sharedScene.children.length > 3) {
            sharedScene.remove(sharedScene.children[sharedScene.children.length - 1]);
          }

          const model = gltf.scene;

          // 1. APLICAR ANIMACIÓN IDLE (Elimina la T-Pose / Rest Pose de modelado)
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            const idleClip = gltf.animations.find(a => 
              a.name.toLowerCase().includes('ground_idle') ||
              a.name.toLowerCase().includes('idle') ||
              a.name.toLowerCase().includes('pose')
            ) || gltf.animations[0];

            if (idleClip) {
              const action = mixer.clipAction(idleClip);
              action.play();
              // Avanzar el tiempo de animación para que los huesos adopten la postura natural
              mixer.update(0.15);
            }
          }

          // 2. Actualizar matrices de huesos tras la pose de animación
          model.updateMatrixWorld(true);

          // 3. Centrar el modelo con base en su pose viva
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          model.position.x -= center.x;
          model.position.y -= center.y;
          model.position.z -= center.z;

          // Mirar de frente hacia la cámara con un ángulo 3/4 suave
          model.rotation.y = -0.35;
          model.rotation.x = 0.05;

          const maxDim = Math.max(size.x, size.y, size.z);
          sharedCamera.position.set(0, size.y * 0.1, Math.max(maxDim * 1.85, 2.0));
          sharedCamera.lookAt(0, 0, 0);

          // Filtro nearest para texturas nítidas pixel art
          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                if (mat.map) {
                  mat.map.magFilter = THREE.NearestFilter;
                  mat.map.minFilter = THREE.NearestMipmapNearestFilter;
                  mat.map.needsUpdate = true;
                }
              }
            }
          });

          sharedScene.add(model);
          sharedRenderer.render(sharedScene, sharedCamera);

          const dataUrl = sharedRenderer.domElement.toDataURL('image/png');

          memoryCache.set(slug, dataUrl);
          try {
            localStorage.setItem(cacheKey, dataUrl);
          } catch {
            // Ignorar límite de almacenamiento
          }

          resolve(dataUrl);
        },
        undefined,
        () => {
          resolve(null);
        }
      );
    } catch {
      resolve(null);
    }
  }).finally(() => {
    pendingPromises.delete(slug);
  });

  pendingPromises.set(slug, promise);
  return promise;
}
