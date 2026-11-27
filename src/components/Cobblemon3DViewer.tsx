import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Loader2, RotateCw, Box, AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
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
  const [hasModel, setHasModel] = useState<boolean | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [animations, setAnimations] = useState<string[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<string>('');
  const [isRotating, setIsRotating] = useState(autoRotate);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction>>({});
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  const cleanName = pokemonName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const pokeData = POKEMON_DATA.find(p => p.name.toLowerCase() === pokemonName.toLowerCase() || p.name_es.toLowerCase() === pokemonName.toLowerCase());
  const isOfficiallyInCobblemon = pokeData?.has_cobblemon_model ?? true;

  const showdownAniUrl = `https://play.pokemonshowdown.com/sprites/ani/${cleanName}.gif`;
  const home3dUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeData?.id || 1}.png`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoading(true);
    setHasModel(null);
    setLoadError(null);
    setAnimations([]);
    actionsRef.current = {};

    // 1. Configuración de Escena Three.js
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const heightPx = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.2, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(3, 8, 5);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa5c4ff, 0.9);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    // 3. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 9;
    controls.minDistance = 0.8;
    controls.autoRotate = isRotating;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    let animationFrameId: number;
    let isDisposed = false;
    const clock = new THREE.Clock();

    // 4. Intentar cargar el modelo GLTF con respaldo inteligente
    const loader = new GLTFLoader();

    // URLs en cascada: primero el proxy local, luego la URL directa
    const modelUrls = [
      `/cobblemon-proxy/pokedex/pokemon/${cleanName}/models/${cleanName}.gltf`,
      `https://cobblemon.tools/pokedex/pokemon/${cleanName}/models/${cleanName}.gltf`
    ];

    const tryLoadModel = (urlIndex: number) => {
      if (urlIndex >= modelUrls.length) {
        if (isDisposed) return;
        setLoading(false);
        if (isOfficiallyInCobblemon) {
          // El Pokémon sí tiene modelo oficial, pero la conexión falló
          setLoadError('No se pudo establecer conexión con el servidor 3D de Cobblemon. Puede deberse a un reinicio de red temporal.');
          setHasModel(null);
        } else {
          // El Pokémon realmente no tiene modelo implementado en Cobblemon
          setHasModel(false);
        }
        return;
      }

      const currentUrl = modelUrls[urlIndex];

      loader.load(
        currentUrl,
        (gltf) => {
          if (isDisposed) return;

          const model = gltf.scene;

          // Centrar modelo
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          model.position.x -= center.x;
          model.position.y -= box.min.y;
          model.position.z -= center.z;

          // Ajustar distancia y enfoque de la cámara
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetDistance = Math.max(maxDim * 2.2, 2.0);
          camera.position.set(0, size.y * 0.7, targetDistance);
          controls.target.set(0, size.y * 0.45, 0);
          controls.update();

          // Orientar de frente
          model.rotation.y = Math.PI - 0.35;

          // Filtrado pixel-art de texturas
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

          // Animaciones de Blockbench
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

          setHasModel(true);
          setLoading(false);
          setLoadError(null);
        },
        undefined,
        () => {
          // Si falló el primer enlace, intentar con el siguiente en cascada
          tryLoadModel(urlIndex + 1);
        }
      );
    };

    tryLoadModel(0);

    // 5. Bucle de render
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [cleanName, retryKey, isOfficiallyInCobblemon]);

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
    <div className={`relative rounded-2xl bg-[#080c14] border border-[#1e2738] overflow-hidden ${className}`}>
      {/* Contenedor del Canvas 3D */}
      <div 
        ref={containerRef} 
        style={{ height, display: hasModel === true ? 'block' : 'none' }} 
        className="w-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080c14]/90 backdrop-blur-xs z-20">
          <Loader2 className="w-8 h-8 text-sky-400 animate-spin mb-2" />
          <span className="text-xs font-semibold text-zinc-300">
            Cargando modelo 3D oficial de Cobblemon...
          </span>
          <span className="text-[10px] text-zinc-500 font-mono mt-1">
            Conectando con el servidor de assets de Minecraft
          </span>
        </div>
      )}

      {/* Modelo 3D cargado con éxito */}
      {!loading && hasModel === true && (
        <>
          {/* Badge Superior */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#101724]/90 backdrop-blur-xs border border-[#243044] text-[10px] pointer-events-none shadow-sm">
            <Box className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-300 font-bold">Modelo 3D Oficial Blockbench (Cobblemon)</span>
          </div>

          {/* Barra de Controles Inferiores */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
            {animations.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#101724]/90 backdrop-blur-xs border border-[#243044] rounded-xl px-2.5 py-1 shadow-md">
                <span className="text-[10px] text-zinc-400 font-medium">Animación:</span>
                <select
                  value={selectedAnimation}
                  onChange={(e) => handleAnimationChange(e.target.value)}
                  className="bg-transparent text-xs text-sky-300 font-semibold focus:outline-none cursor-pointer"
                >
                  {animations.map(anim => (
                    <option key={anim} value={anim} className="bg-[#101724] text-zinc-200">
                      {anim}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={toggleAutoRotate}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-semibold transition-all border shadow-md ml-auto ${
                isRotating
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-[#101724]/90 text-zinc-400 hover:text-white border-[#243044]'
              }`}
              title="Alternar rotación automática"
            >
              <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Girar 360°</span>
            </button>
          </div>
        </>
      )}

      {/* Si hubo un error de conexión de red */}
      {!loading && loadError && (
        <div style={{ minHeight: height }} className="flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#080c14]">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-inner">
            <WifiOff className="w-6 h-6" />
          </div>

          <div className="max-w-md space-y-1">
            <h4 className="font-bold text-white text-sm">Error de conexión con el modelo 3D</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{loadError}</p>
          </div>

          <button
            onClick={() => setRetryKey(prev => prev + 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-950/50 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reintentar carga del modelo 3D</span>
          </button>
        </div>
      )}

      {/* Si la especie realmente NO tiene modelo en Cobblemon todavía */}
      {!loading && hasModel === false && !loadError && (
        <div style={{ minHeight: height }} className="flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#080c14]">
          <div className="relative w-36 h-36 flex items-center justify-center bg-[#0d131f] rounded-2xl border border-[#1e2738] shadow-inner p-2">
            <img 
              src={showdownAniUrl} 
              alt={pokemonName} 
              className="max-h-28 max-w-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = home3dUrl;
              }}
            />
          </div>

          <div className="max-w-md space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Modelo Blockbench pendiente en Cobblemon</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              El equipo oficial de Cobblemon ha modelado ~400 criaturas hasta la fecha. <strong>{pokemonName}</strong> aún no cuenta con archivo 3D de Minecraft en el mod; se añadirá en próximas versiones oficiales.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
