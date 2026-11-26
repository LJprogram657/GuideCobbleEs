import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Loader2, RotateCw, Sparkles, Box, CheckCircle2 } from 'lucide-react';
import { POKEMON_DATA } from '../data/pokemonData';

interface Cobblemon3DViewerProps {
  pokemonName: string;
  className?: string;
  height?: string;
  autoRotate?: boolean;
}

export const Cobblemon3DViewer: React.FC<Cobblemon3DViewerProps> = ({
  pokemonName,
  className = '',
  height = '340px',
  autoRotate = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [animations, setAnimations] = useState<string[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<string>('');
  const [isRotating, setIsRotating] = useState(autoRotate);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  const cleanName = pokemonName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const pokeData = POKEMON_DATA.find(p => p.name.toLowerCase() === pokemonName.toLowerCase() || p.name_es.toLowerCase() === pokemonName.toLowerCase());
  const pokeId = pokeData?.id || 1;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setIsFallback(false);
    setAnimations([]);
    actionsRef.current = {};

    // 1. Escena, Cámara y Renderizador Three.js
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const heightPx = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.3, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Iluminación de Estudio 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(3, 8, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4ff, 0.8);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    // 3. OrbitControls (Rotación 360°, Zoom y Amortiguación)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 8;
    controls.minDistance = 1;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    let animationFrameId: number;
    let isDisposed = false;
    const clock = new THREE.Clock();
    let floatingMesh: THREE.Object3D | null = null;

    // Función auxiliar para construir el Escenario 3D Holográfico interactivo
    const setupHolographicStage = (textureUrl: string) => {
      if (isDisposed) return;
      setIsFallback(true);

      // Limpiar elementos no lumínicos
      while (scene.children.length > 3) {
        scene.remove(scene.children[scene.children.length - 1]);
      }

      // Base / Pedestal 3D de exhibición metálica
      const pedestalGeo = new THREE.CylinderGeometry(1.1, 1.25, 0.15, 32);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: 0x162032,
        roughness: 0.4,
        metalness: 0.6,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = -0.075;
      scene.add(pedestal);

      // Anillo de energía fluorescente
      const ringGeo = new THREE.TorusGeometry(1.08, 0.02, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.01;
      scene.add(ring);

      // Cargar textura en alta resolución del render 3D
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(textureUrl, (texture) => {
        if (isDisposed) return;
        texture.colorSpace = THREE.SRGBColorSpace;

        const planeGeo = new THREE.PlaneGeometry(1.9, 1.9);
        const planeMat = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.05,
          side: THREE.DoubleSide
        });

        const planeMesh = new THREE.Mesh(planeGeo, planeMat);
        planeMesh.position.set(0, 1.05, 0);
        scene.add(planeMesh);
        floatingMesh = planeMesh;

        // Sombra de contacto suave en el pedestal
        const shadowGeo = new THREE.CircleGeometry(0.75, 32);
        const shadowMat = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.45,
        });
        const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        shadowMesh.rotation.x = -Math.PI / 2;
        shadowMesh.position.y = 0.02;
        scene.add(shadowMesh);

        setLoading(false);
      }, undefined, () => {
        // Si la textura de Pokémon Home fallara, cargar artwork oficial
        const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`;
        textureLoader.load(fallbackUrl, (tex) => {
          if (isDisposed) return;
          const planeGeo = new THREE.PlaneGeometry(1.9, 1.9);
          const planeMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
          const planeMesh = new THREE.Mesh(planeGeo, planeMat);
          planeMesh.position.set(0, 1.05, 0);
          scene.add(planeMesh);
          floatingMesh = planeMesh;
          setLoading(false);
        });
      });
    };

    // 4. Cargar modelo GLTF Oficial de Blockbench de Cobblemon
    const loader = new GLTFLoader();
    const modelUrl = `/cobblemon-proxy/pokedex/pokemon/${cleanName}/models/${cleanName}.gltf`;

    // Timeout de seguridad: si cobblemon.tools tarda más de 3.5 segundos o no existe, conmutar a 3D interactivo
    const timer = setTimeout(() => {
      if (loading && !isDisposed) {
        setupHolographicStage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`);
      }
    }, 3500);

    loader.load(
      modelUrl,
      (gltf) => {
        clearTimeout(timer);
        if (isDisposed) return;

        const model = gltf.scene;

        // Centrar y escalar según el bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.x -= center.x;
        model.position.y -= box.min.y;
        model.position.z -= center.z;

        // Ajustar distancia de cámara
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetDistance = Math.max(maxDim * 2.2, 2.0);
        camera.position.set(0, size.y * 0.7, targetDistance);
        controls.target.set(0, size.y * 0.45, 0);
        controls.update();

        // Orientar de frente
        model.rotation.y = -0.35;

        // Texturas nítidas estilo Minecraft
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
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

        scene.add(model);

        // Configurar animaciones de Blockbench
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          const clipNames: string[] = [];
          const actions: Record<string, THREE.AnimationAction> = {};

          gltf.animations.forEach((clip) => {
            const cleanClipName = clip.name
              .replace(/^animation\.[a-z0-9_]+\./i, '')
              .replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());

            clipNames.push(cleanClipName);
            actions[cleanClipName] = mixer.clipAction(clip);
          });

          setAnimations(clipNames);
          actionsRef.current = actions;

          const defaultClip = clipNames.find(n => n.toLowerCase().includes('ground idle') || n.toLowerCase().includes('idle')) || clipNames[0];
          if (defaultClip && actions[defaultClip]) {
            actions[defaultClip].play();
            currentActionRef.current = actions[defaultClip];
            setSelectedAnimation(defaultClip);
          }
        }

        setLoading(false);
      },
      undefined,
      () => {
        clearTimeout(timer);
        if (isDisposed) return;
        // Si el archivo GLTF no existe en Cobblemon (o la red falla), activar el escenario 3D interactivo
        setupHolographicStage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`);
      }
    );

    // 5. Bucle de renderizado constante
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Animación suave de respiración / flotación en el escenario 3D
      if (floatingMesh) {
        floatingMesh.position.y = 1.05 + Math.sin(elapsed * 2.2) * 0.06;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Redimensionamiento responsive
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [cleanName, pokeId]);

  const handleAnimationChange = (animName: string) => {
    setSelectedAnimation(animName);
    const newAction = actionsRef.current[animName];
    if (newAction && currentActionRef.current !== newAction) {
      if (currentActionRef.current) {
        currentActionRef.current.fadeOut(0.3);
      }
      newAction.reset().fadeIn(0.3).play();
      currentActionRef.current = newAction;
    }
  };

  const toggleAutoRotate = () => {
    const nextState = !isRotating;
    setIsRotating(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
    }
  };

  return (
    <div className={`relative rounded-2xl bg-[#090d14] border border-[#20293b] overflow-hidden ${className}`}>
      {/* Contenedor Canvas Three.js */}
      <div 
        ref={containerRef} 
        style={{ height }} 
        className="w-full cursor-grab active:cursor-grabbing"
      />

      {/* Indicador de Carga */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090d14]/90 backdrop-blur-xs z-20">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin mb-2" />
          <span className="text-xs font-semibold text-zinc-300">
            Cargando visualizador 3D...
          </span>
          <span className="text-[10px] text-zinc-500 font-mono mt-1">
            Optimizando texturas y geometría
          </span>
        </div>
      )}

      {/* Controles y Etiquetas */}
      {!loading && (
        <>
          {/* Badge Superior */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121722]/85 backdrop-blur-xs border border-[#242f42] text-[10px] pointer-events-none shadow-sm">
            {isFallback ? (
              <>
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Visualizador 3D Interactivo (360°)</span>
              </>
            ) : (
              <>
                <Box className="w-3 h-3 text-sky-400" />
                <span className="text-sky-300 font-semibold">Modelo 3D Oficial Blockbench (Cobblemon)</span>
              </>
            )}
          </div>

          {/* Barra de Controles Inferiores */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
            {/* Selector de animaciones de Blockbench si existen */}
            {!isFallback && animations.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#121722]/90 backdrop-blur-xs border border-[#242f42] rounded-xl px-2 py-1 shadow-md">
                <span className="text-[10px] text-zinc-400 font-medium">Animación:</span>
                <select
                  value={selectedAnimation}
                  onChange={(e) => handleAnimationChange(e.target.value)}
                  className="bg-transparent text-xs text-sky-300 font-semibold focus:outline-none cursor-pointer"
                >
                  {animations.map(anim => (
                    <option key={anim} value={anim} className="bg-[#121722] text-zinc-200">
                      {anim}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Subtítulo si está en modo escenario 3D */}
            {isFallback && (
              <div className="px-2 py-1 rounded-lg bg-[#121722]/80 border border-[#1e2738] text-[10px] text-zinc-400 hidden sm:block">
                Arrastra para girar en 360° • Rueda para Zoom
              </div>
            )}

            {/* Botón de Giro 360° */}
            <button
              onClick={toggleAutoRotate}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border shadow-md ml-auto ${
                isRotating
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-[#121722]/90 text-zinc-400 hover:text-white border-[#242f42]'
              }`}
              title="Alternar rotación continua automática"
            >
              <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Girar 360°</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
