import React, { useState } from 'react';
import { Pokemon } from '../data/pokemonData';
import { getMegasForPokemon, MegaEvolution } from '../data/megaData';
import { getTypeBadge, TYPE_STYLES } from '../utils/typeColors';
import { PokemonImage } from './PokemonImage';
import { Cobblemon3DViewer } from './Cobblemon3DViewer';
import { 
  X, Compass, Swords, Shield, Zap, MapPin, Package, Check, Plus, ExternalLink, Box, Sparkles, Layers
} from 'lucide-react';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  isInTeam: boolean;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ 
  pokemon, 
  onClose, 
  onAddToTeam, 
  isInTeam 
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'model3d' | 'spawns' | 'mount' | 'pvp' | 'megas'>('info');

  if (!pokemon) return null;

  const megas = getMegasForPokemon(pokemon.id);

  const primaryType = pokemon.types[0];
  const typeStyle = TYPE_STYLES[primaryType] || {
    glow: "rgba(100, 116, 139, 0.2)",
    accent: "#64748b"
  };

  const statColors: Record<string, string> = {
    hp: 'bg-emerald-500',
    attack: 'bg-orange-500',
    defense: 'bg-amber-500',
    sp_attack: 'bg-blue-500',
    sp_defense: 'bg-indigo-500',
    speed: 'bg-rose-500'
  };

  const cleanSlug = pokemon.name.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#121722] border border-[#242f42] rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar Absoluto */}
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 text-zinc-400 hover:text-white bg-[#0b0f17]/80 hover:bg-zinc-800/90 rounded-xl transition-all border border-[#263042] shadow-sm cursor-pointer"
          title="Cerrar (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header con personalidad y luz del tipo */}
        <div 
          className="relative p-5 sm:p-6 border-b border-[#20293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden pr-14"
          style={{
            background: `linear-gradient(135deg, ${typeStyle.glow} 0%, rgba(18, 23, 34, 0.98) 100%)`
          }}
        >
          {/* Info Principal: Imagen + Nombres */}
          <div className="flex items-center gap-4 relative z-10">
            {/* Modelo Cobblemon 3D con Animación de Flotación y Sombra */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 bg-[#0b0f17]/90 rounded-2xl p-2 border border-[#263042] flex flex-col items-center justify-end shadow-inner shrink-0 pb-1">
              <div className="cobblemon-model-motion h-14 sm:h-16 w-full flex items-center justify-center">
                <PokemonImage 
                  pokemon={pokemon} 
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]" 
                />
              </div>
              <div className="w-10 h-1.5 bg-black/60 rounded-full blur-[1px] cobblemon-shadow-motion pointer-events-none mt-0.5" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="text-xs font-mono font-bold text-zinc-400">
                  #{String(pokemon.id).padStart(4, '0')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#0b0f17]/90 text-zinc-300 font-semibold border border-zinc-700/60">
                  Gen {pokemon.generation}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-300 font-semibold border border-sky-500/30 flex items-center gap-1">
                  <Box className="w-3 h-3 text-sky-400" />
                  3D Cobblemon
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {pokemon.name_es}
              </h2>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {pokemon.types.map(t => {
                  const b = getTypeBadge(t);
                  return (
                    <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${b.bg} ${b.text} ${b.border}`}>
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Botones de Acción (Sin romper textos) */}
          <div className="flex items-center gap-2 relative z-10 shrink-0 sm:self-center">
            <button
              onClick={() => setActiveTab('model3d')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm ${
                activeTab === 'model3d'
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-sky-950/40'
                  : 'bg-sky-950/60 text-sky-300 hover:bg-sky-900/60 border-sky-800/60'
              }`}
            >
              <Box className="w-4 h-4" />
              <span>Ver en 3D</span>
            </button>

            <button
              onClick={() => onAddToTeam(pokemon)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm ${
                isInTeam
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent'
              }`}
            >
              {isInTeam ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>En tu equipo</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Añadir al equipo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pestañas de navegación con scroll horizontal suave si es necesario */}
        <div className="flex border-b border-[#20293b] bg-[#0b0f17]/70 px-4 overflow-x-auto no-scrollbar gap-1">
          {[
            { id: 'info' as const, label: 'General', icon: Shield },
            { id: 'model3d' as const, label: 'Modelo 3D', icon: Box },
            ...(megas.length > 0 ? [{ id: 'megas' as const, label: `Megas (${megas.length})`, icon: Sparkles, isHighlight: true }] : []),
            { id: 'spawns' as const, label: 'Spawns y Biomas', icon: MapPin },
            { id: 'mount' as const, label: 'Montura', icon: Compass },
            { id: 'pvp' as const, label: 'Estrategia PvP', icon: Swords },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  isActive 
                    ? tab.id === 'megas'
                      ? 'border-purple-400 text-purple-300 font-bold bg-purple-500/10'
                      : 'border-indigo-400 text-indigo-300 font-bold bg-indigo-500/5' 
                    : tab.id === 'megas'
                      ? 'border-transparent text-purple-400 hover:text-purple-200 hover:bg-purple-500/5 font-semibold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${
                  isActive 
                    ? tab.id === 'megas' ? 'text-purple-400' : 'text-indigo-400' 
                    : tab.id === 'megas' ? 'text-purple-400' : 'text-zinc-500'
                }`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* TAB 1: General & Stats */}
          {activeTab === 'info' && (
            <div className="space-y-5">
              {/* Acceso directo al Visor 3D */}
              <div 
                onClick={() => setActiveTab('model3d')}
                className="bg-gradient-to-r from-sky-950/50 via-[#121824] to-[#141b27] border border-sky-800/50 hover:border-sky-500/80 p-3.5 rounded-xl cursor-pointer flex items-center justify-between group transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block group-hover:text-sky-300 transition-colors">
                      Ver {pokemon.name_es} en 3D interactivo
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Gira en 360°, haz zoom y reproduce sus animaciones oficiales de Blockbench.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Visualizador 3D &rarr;
                </span>
              </div>

              {/* Lore */}
              <div className="bg-[#0b0f17] p-4 rounded-xl border border-[#20293b]">
                <p className="text-zinc-300 leading-relaxed italic">
                  "{pokemon.description_es}"
                </p>
                <div className="mt-2.5 text-[11px] text-zinc-400 font-medium">
                  Línea evolutiva: {pokemon.evolution_es}
                </div>
              </div>

              {/* Estadísticas Base */}
              <div className="bg-[#0b0f17] p-4 rounded-xl border border-[#20293b]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Estadísticas Base
                  </span>
                  <span className="font-mono text-zinc-400 font-bold">Total: {pokemon.base_stats.total}</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'PS', value: pokemon.base_stats.hp, max: 200, key: 'hp' },
                    { label: 'Ataque', value: pokemon.base_stats.attack, max: 180, key: 'attack' },
                    { label: 'Defensa', value: pokemon.base_stats.defense, max: 180, key: 'defense' },
                    { label: 'At. Especial', value: pokemon.base_stats.sp_attack, max: 180, key: 'sp_attack' },
                    { label: 'Def. Especial', value: pokemon.base_stats.sp_defense, max: 180, key: 'sp_defense' },
                    { label: 'Velocidad', value: pokemon.base_stats.speed, max: 180, key: 'speed' },
                  ].map(stat => (
                    <div key={stat.label} className="grid grid-cols-12 items-center text-xs">
                      <span className="col-span-3 text-zinc-400 font-medium">{stat.label}</span>
                      <span className="col-span-2 text-right font-mono font-bold text-white pr-3">
                        {stat.value}
                      </span>
                      <div className="col-span-7 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${statColors[stat.key]} transition-all duration-300`}
                          style={{ width: `${Math.min(100, (stat.value / stat.max) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Habilidades */}
              <div>
                <span className="font-bold text-white block mb-2">Habilidades en Cobblemon</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pokemon.abilities.map(ab => (
                    <div key={ab.name} className="p-3 bg-[#0b0f17] rounded-xl border border-[#20293b]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{ab.name}</span>
                        {ab.is_hidden && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            Oculta
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-normal">{ab.effect_es}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3D: Visor de Modelo 3D Oficial Cobblemon */}
          {activeTab === 'model3d' && (
            <div className="space-y-4">
              <div className="bg-[#0b0f17] p-4 rounded-xl border border-[#20293b]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Box className="w-4 h-4 text-sky-400" />
                      Visualizador 3D Oficial de Cobblemon ({pokemon.name_es})
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      Cargado en tiempo real desde el archivo GLTF oficial con texturas de Minecraft y animaciones.
                    </p>
                  </div>
                </div>

                <Cobblemon3DViewer 
                  pokemonName={pokemon.name} 
                  height="360px" 
                  autoRotate={true} 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#0b0f17] rounded-xl border border-[#20293b] space-y-1">
                  <span className="font-semibold text-white block">Controles 3D:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    • <strong>Arrastra con el ratón:</strong> Rota el modelo en cualquier ángulo.<br />
                    • <strong>Rueda del ratón:</strong> Haz zoom in / zoom out.<br />
                    • <strong>Botón Girar 360°:</strong> Activa o desactiva la rotación automática suave.
                  </p>
                </div>
                <div className="p-3 bg-[#0b0f17] rounded-xl border border-[#20293b] space-y-1">
                  <span className="font-semibold text-white block">Animaciones de Blockbench:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Usa el selector inferior para alternar entre Ground Idle (respiración en tierra), Air/Water Idle, Pose, parpadeo o sueño.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Mega Evoluciones (Addons) */}
          {activeTab === 'megas' && megas.length > 0 && (
            <div className="space-y-4">
              {/* Banner informativo de aclaración */}
              <div className="bg-gradient-to-r from-purple-950/40 via-[#131124] to-[#0b0f17] border border-purple-800/40 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-xs sm:text-sm">
                      Mega Evolución en Cobblemon (Vía Mod Addon)
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      En el mod base oficial de Cobblemon no hay Megas. Se activan mediante los mods complementarios de la comunidad <strong>Cobblemon: Mega Showdown</strong> o <strong>Ascension Megamons</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de formas Mega (Charizard y Mewtwo tienen 2, otros tienen 1) */}
              <div className="space-y-4">
                {megas.map((mega, index) => (
                  <div key={index} className="bg-[#0b0f17] border border-[#20293b] rounded-2xl p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      {/* Imagen / Sprite Animado de la Mega */}
                      <div className="relative w-28 h-28 bg-[#121724] border border-purple-900/40 rounded-2xl p-2 flex flex-col items-center justify-center shrink-0 shadow-lg">
                        <img 
                          src={mega.animatedSprite} 
                          alt={mega.megaNameEs} 
                          className="max-h-20 max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] [image-rendering:pixelated]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = mega.sprite;
                          }}
                        />
                        <div className="absolute bottom-1 right-1 bg-purple-950/80 border border-purple-800/60 px-1 rounded text-[8px] font-mono text-purple-300 font-bold">
                          +100 BST
                        </div>
                      </div>

                      {/* Detalles principales */}
                      <div className="space-y-2 flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="text-lg font-black text-white flex items-center justify-center sm:justify-start gap-2">
                            <span>{mega.megaNameEs}</span>
                            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                              Mega
                            </span>
                          </h4>
                          <span className="text-[11px] font-mono text-zinc-400">
                            BST: <span className="text-purple-300 font-bold">{mega.stats.total}</span> (Base: {pokemon.base_stats.total})
                          </span>
                        </div>

                        {/* Tipos */}
                        <div className="flex items-center justify-center sm:justify-start gap-1.5">
                          {mega.types.map(t => {
                            const b = getTypeBadge(t);
                            return (
                              <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${b.bg} ${b.text} ${b.border}`}>
                                {t}
                              </span>
                            );
                          })}
                        </div>

                        {/* Objeto Megapiedra Requerido */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                          <div className="w-7 h-7 bg-[#121724] border border-[#263042] rounded-lg p-0.5 flex items-center justify-center shrink-0">
                            <img src={mega.itemSprite} alt={mega.itemRequired} className="max-h-full max-w-full object-contain" />
                          </div>
                          <span className="text-xs text-zinc-300">
                            Megapiedra: <strong className="text-amber-300 font-mono">{mega.itemRequired}</strong>
                          </span>
                        </div>

                        <p className="text-[11px] text-zinc-400 italic">
                          "{mega.descriptionEs}"
                        </p>
                      </div>
                    </div>

                    {/* Nueva Habilidad */}
                    <div className="p-3 bg-[#121722] rounded-xl border border-[#20293b]">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-bold text-white text-xs">Nueva Habilidad: {mega.ability}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 pl-5">
                        {mega.abilityEffectEs}
                      </p>
                    </div>

                    {/* Estadísticas de la Mega vs Base */}
                    <div>
                      <span className="font-semibold text-zinc-400 block mb-2 text-[11px]">Estadísticas Base de la Mega (+100 incremento):</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { label: 'PS', val: mega.stats.hp, base: pokemon.base_stats.hp, color: 'text-emerald-400' },
                          { label: 'Ataque', val: mega.stats.attack, base: pokemon.base_stats.attack, color: 'text-orange-400' },
                          { label: 'Defensa', val: mega.stats.defense, base: pokemon.base_stats.defense, color: 'text-amber-400' },
                          { label: 'Atq. Esp.', val: mega.stats.sp_attack, base: pokemon.base_stats.sp_attack, color: 'text-blue-400' },
                          { label: 'Def. Esp.', val: mega.stats.sp_defense, base: pokemon.base_stats.sp_defense, color: 'text-indigo-400' },
                          { label: 'Velocidad', val: mega.stats.speed, base: pokemon.base_stats.speed, color: 'text-rose-400' },
                        ].map((stat, idx) => {
                          const diff = stat.val - stat.base;
                          return (
                            <div key={idx} className="bg-[#121724] p-2 rounded-lg border border-[#1e2636] flex items-center justify-between">
                              <span className="text-[10px] text-zinc-400 font-medium">{stat.label}</span>
                              <div className="flex items-center gap-1">
                                <span className={`font-mono font-bold text-xs ${stat.color}`}>{stat.val}</span>
                                {diff !== 0 && (
                                  <span className={`text-[9px] font-mono ${diff > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                    ({diff > 0 ? `+${diff}` : diff})
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Spawns en Minecraft */}
          {activeTab === 'spawns' && (
            <div className="space-y-4">
              <div className="bg-[#0b0f17] p-4 rounded-xl border border-[#20293b] space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#20293b] pb-2.5">
                  <div>
                    <span className="text-[11px] text-zinc-400 font-medium">Rareza</span>
                    <p className="font-bold text-emerald-400">{pokemon.spawns.rareza}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-400 font-medium">Rango de Niveles</span>
                    <p className="font-bold text-white">Nivel {pokemon.spawns.niveles}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-400 font-medium block mb-1">Condiciones climáticas / Generación</span>
                  <p className="text-zinc-200 bg-[#121722] p-3 rounded-xl border border-[#20293b] leading-relaxed">
                    {pokemon.spawns.condiciones_es}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-400 font-medium block mb-1.5">Biomas de Minecraft:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {pokemon.spawns.biomas_es.map(b => (
                      <span key={b} className="bg-zinc-800 text-zinc-200 font-semibold px-2.5 py-1 rounded-lg text-xs border border-zinc-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags Oficiales de Cobblemon */}
                <div>
                  <span className="text-[11px] text-zinc-400 font-medium block mb-1.5">
                    Tags de Datapack (Cobblemon):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pokemon.spawns.biomas_tag.map(tag => (
                      <span key={tag} className="font-mono text-xs bg-[#070a10] text-cyan-300 border border-cyan-800/60 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drops */}
              <div>
                <span className="font-bold text-white block mb-2 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-400" />
                  Objetos que Suelta al Derrotarlo (Drops)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pokemon.drops.map(d => (
                    <div key={d.item_es} className="p-3 bg-[#0b0f17] rounded-xl border border-[#20293b] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-[#141b28] p-1 border border-[#263042] flex items-center justify-center shrink-0">
                          {d.sprite ? (
                            <img 
                              src={d.sprite} 
                              alt={d.item_es} 
                              className="max-h-full max-w-full object-contain [image-rendering:pixelated]"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Package className="w-4 h-4 text-amber-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{d.item_es}</p>
                          <p className="text-[10px] text-zinc-400 font-mono">{d.item_en}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">{d.probabilidad}</span>
                        <p className="text-[10px] text-zinc-400 mt-1 font-mono">Cant: {d.cantidad}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Montura Cobblemon */}
          {activeTab === 'mount' && (
            <div>
              {pokemon.mount?.is_mountable ? (
                <div className="space-y-4">
                  <div className="p-4 bg-[#0b0f17] rounded-xl border border-[#20293b] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#20293b] pb-2.5">
                      <div>
                        <span className="text-[11px] text-zinc-400 font-medium">Categoría</span>
                        <h4 className="font-bold text-white text-base">Montura {pokemon.mount.category_es}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-400 font-medium">Tier</span>
                        <p className="font-black text-indigo-400 text-lg">{pokemon.mount.tier}</p>
                      </div>
                    </div>

                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {pokemon.mount.notes_es}
                    </p>

                    <div className="grid grid-cols-4 gap-2 text-center pt-1">
                      <div className="bg-[#121722] p-2.5 rounded-xl border border-[#20293b]">
                        <span className="text-[10px] text-zinc-400 block font-medium">Velocidad</span>
                        <span className="font-mono font-bold text-sky-400 text-base">{pokemon.mount.speed_score}/100</span>
                      </div>
                      <div className="bg-[#121722] p-2.5 rounded-xl border border-[#20293b]">
                        <span className="text-[10px] text-zinc-400 block font-medium">Aceleración</span>
                        <span className="font-mono font-bold text-emerald-400 text-base">{pokemon.mount.acceleration}/100</span>
                      </div>
                      <div className="bg-[#121722] p-2.5 rounded-xl border border-[#20293b]">
                        <span className="text-[10px] text-zinc-400 block font-medium">Estamina</span>
                        <span className="font-mono font-bold text-amber-400 text-base">{pokemon.mount.stamina}/100</span>
                      </div>
                      <div className="bg-[#121722] p-2.5 rounded-xl border border-[#20293b]">
                        <span className="text-[10px] text-zinc-400 block font-medium">Pasajeros</span>
                        <span className="font-mono font-bold text-purple-400 text-base">{pokemon.mount.seats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-[#0b0f17] rounded-xl border border-[#20293b]">
                  <p className="text-zinc-400">Este Pokémon no cuenta con función de montura en Cobblemon.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Estrategia Competitiva */}
          {activeTab === 'pvp' && (
            <div className="space-y-4">
              <div className="bg-[#0b0f17] p-4 rounded-xl border border-[#20293b] space-y-3">
                <div className="flex items-center justify-between border-b border-[#20293b] pb-2.5">
                  <div>
                    <span className="text-[11px] text-zinc-400 font-medium">Rol Competitivo</span>
                    <h4 className="font-bold text-white text-sm">{pokemon.pvp.rol}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-400 font-medium">Naturaleza</span>
                    <p className="font-bold text-zinc-200">{pokemon.pvp.naturaleza}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#121722] p-3 rounded-xl border border-[#20293b] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-400 block mb-0.5 font-medium">Objeto Recomendado</span>
                      <span className="font-bold text-emerald-400 text-xs">{pokemon.pvp.objeto_recomendado}</span>
                    </div>
                    {pokemon.pvp.objeto_sprite && (
                      <div className="w-9 h-9 rounded-lg bg-[#0b0f17] p-1 border border-[#263042] flex items-center justify-center shrink-0">
                        <img 
                          src={pokemon.pvp.objeto_sprite} 
                          alt={pokemon.pvp.objeto_recomendado} 
                          className="max-h-full max-w-full object-contain [image-rendering:pixelated]"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="bg-[#121722] p-3 rounded-xl border border-[#20293b]">
                    <span className="text-[10px] text-zinc-400 block mb-0.5 font-medium">Reparto de EVs</span>
                    <span className="font-mono font-bold text-sky-400">{pokemon.pvp.evs}</span>
                  </div>
                </div>
              </div>

              {/* Ataques */}
              <div>
                <span className="font-bold text-white block mb-2">Los 4 Ataques Sugeridos</span>
                <div className="space-y-2">
                  {pokemon.pvp.mejores_ataques.map((atk, index) => {
                    const badge = getTypeBadge(atk.tipo);
                    return (
                      <div key={atk.nombre} className="p-3 bg-[#0b0f17] rounded-xl border border-[#20293b]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-zinc-500 font-bold">{index + 1}.</span>
                          <span className="font-bold text-white">{atk.nombre}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                            {atk.tipo}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-zinc-800 text-zinc-300 font-medium">
                            {atk.categoria}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-normal pl-4">{atk.razon}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
