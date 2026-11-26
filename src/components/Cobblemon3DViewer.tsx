import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Loader2, RotateCw, ZoomIn, Eye, Sparkles } from 'lucide-react';

interface Cobblemon3DViewerProps {
  pokemonName: string;
  className?: string;
  height?: string;
  autoRotate?: boolean;
}

export const Cobblemon3DViewer: React.FC<Cobblemon3DViewerProps> = ({
  pokemonName,
  className = '',
  height = '320px',
  autoRotate = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animations, setAnimations] = useState<string[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<string>('');
  const [isRotating, setIsRotating] = useState(autoRotate);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  const cleanName = pokemonName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const modelUrl = `/cobblemon-proxy/pokedex/pokemon/${cleanName}/models/${cleanName}.gltf`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setError(null);
    setAnimations([]);
    actionsRef.current = {};

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const heightPx = container.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.2, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Clear previous canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Iluminación estilo Minecraft / Blockbench
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(3, 8, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4ff, 0.8);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 8;
    controls.minDistance = 1;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // 4. Cargar Modelo GLTF Oficial de Cobblemon
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isDisposed = false;

    loader.load(
      modelUrl,
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;

        // Centrar y escalar el modelo según su bounding box
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Reposicionar al centro
        model.position.x -= center.x;
        model.position.y -= box.min.y; // Apoyar en el suelo
        model.position.z -= center.z;

        // Ajustar distancia de cámara según tamaño
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetDistance = Math.max(maxDim * 2.2, 2.0);
        camera.position.set(0, size.y * 0.7, targetDistance);
        controls.target.set(0, size.y * 0.45, 0);
        controls.update();

        // Aplicar texturas nítidas pixel art (NearestFilter para Minecraft/Cobblemon)
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

        // 5. Configurar Animaciones
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

          // Elegir animación idle o la primera por defecto
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
      (err) => {
        if (isDisposed) return;
        console.error('Error cargando modelo Cobblemon 3D:', err);
        setError('No se pudo cargar el modelo 3D oficial.');
        setLoading(false);
      }
    );

    // 6. Loop de Renderizado
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [cleanName, modelUrl]);

  // Cambiar animación activa
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

  // Alternar rotación automática
  const toggleAutoRotate = () => {
    const nextState = !isRotating;
    setIsRotating(nextState);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = nextState;
    }
  };

  return (
    <div className={`relative rounded-2xl bg-[#090d14] border border-[#20293b] overflow-hidden ${className}`}>
      {/* Canvas 3D */}
      <div 
        ref={containerRef} 
        style={{ height }} 
        className="w-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090d14]/90 backdrop-blur-xs z-20">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin mb-2" />
          <span className="text-xs font-semibold text-zinc-300">
            Cargando modelo 3D oficial de Cobblemon...
          </span>
          <span className="text-[10px] text-zinc-500 font-mono mt-1">
            Blockbench GLTF + Texturas Minecraft
          </span>
        </div>
      )}

      {/* Error Overlay */}
      {error && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090d14]/90 p-4 text-center z-20">
          <p className="text-xs text-amber-400 font-medium mb-1">{error}</p>
          <span className="text-[11px] text-zinc-400">
            El archivo 3D de Cobblemon no respondió a través del proxy.
          </span>
        </div>
      )}

      {/* Barra de Controles Superiores / Inferiores */}
      {!loading && !error && (
        <>
          {/* Badge superior indicador */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121722]/80 backdrop-blur-xs border border-[#242f42] text-[10px] text-sky-300 font-medium pointer-events-none shadow-sm">
            <Sparkles className="w-3 h-3 text-sky-400" />
            <span>Modelo 3D Oficial Cobblemon (GLTF)</span>
          </div>

          {/* Controles de Animación y Rotación */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
            {/* Selector de Animaciones */}
            {animations.length > 0 && (
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

            {/* Botón de Auto-Rotación */}
            <button
              onClick={toggleAutoRotate}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border shadow-md ${
                isRotating
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-[#121722]/90 text-zinc-400 hover:text-white border-[#242f42]'
              }`}
              title="Alternar rotación automática"
            >
              <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Girar 360°</span>
            </button>
          </div>

          {/* Ayuda de gestos */}
          <div className="absolute top-2.5 right-2.5 z-10 hidden sm:flex items-center gap-1 text-[10px] text-zinc-500 bg-[#121722]/60 px-2 py-0.5 rounded-md pointer-events-none">
            <Eye className="w-2.5 h-2.5" />
            <span>Arrastra para rotar • Rueda para zoom</span>
          </div>
        </>
      )}
    </div>
  );
};
