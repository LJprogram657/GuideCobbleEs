import React, { useState, useMemo, useRef } from 'react';
import { POKEMON_DATA, Pokemon } from '../data/pokemonData';
import { PokemonImage } from './PokemonImage';
import { getTypeBadge } from '../utils/typeColors';
import { 
  TreePine, 
  Search, 
  MapPin, 
  Sun, 
  Moon, 
  CloudRain, 
  Layers, 
  ExternalLink, 
  Plus, 
  ShieldAlert, 
  Sparkles,
  Compass,
  Check,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter
} from 'lucide-react';

interface BiomeExplorerViewProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  team: Pokemon[];
}

export const BiomeExplorerView: React.FC<BiomeExplorerViewProps> = ({
  onSelectPokemon,
  onAddToTeam,
  team
}) => {
  const [selectedBiome, setSelectedBiome] = useState<string>('Todos');
  const [biomeSearch, setBiomeSearch] = useState<string>('');
  const [rarityFilter, setRarityFilter] = useState<string>('Todas');
  const [dimensionFilter, setDimensionFilter] = useState<'overworld' | 'nether' | 'end' | 'all'>('all');
  const [wrapBiomes, setWrapBiomes] = useState<boolean>(false);
  const biomeScrollRef = useRef<HTMLDivElement>(null);

  const scrollBiomes = (direction: 'left' | 'right') => {
    if (biomeScrollRef.current) {
      const amount = direction === 'left' ? -260 : 260;
      biomeScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleBiomeWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (biomeScrollRef.current && !wrapBiomes && e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  // Extraer todos los biomas únicos con contador de apariciones
  const biomeStats = useMemo(() => {
    const counts: Record<string, number> = {};
    POKEMON_DATA.forEach(p => {
      p.spawns.biomas_es.forEach(b => {
        counts[b] = (counts[b] || 0) + 1;
      });
    });

    const list = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return list;
  }, []);

  // Categorías de dimensiones para agrupar biomas
  const isNetherBiome = (name: string) => name.toLowerCase().includes('nether') || name.toLowerCase().includes('almas') || name.toLowerCase().includes('basalto') || name.toLowerCase().includes('volcán');
  const isEndBiome = (name: string) => name.toLowerCase().includes('fin') || name.toLowerCase().includes('the end') || name.toLowerCase().includes('islas lejanas');

  const filteredBiomesList = useMemo(() => {
    return biomeStats.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(biomeSearch.toLowerCase());
      if (!matchSearch) return false;

      if (dimensionFilter === 'nether') return isNetherBiome(b.name);
      if (dimensionFilter === 'end') return isEndBiome(b.name);
      if (dimensionFilter === 'overworld') return !isNetherBiome(b.name) && !isEndBiome(b.name);
      return true;
    });
  }, [biomeStats, biomeSearch, dimensionFilter]);

  // Filtrar Pokémon según el bioma y rareza seleccionados
  const matchingPokemon = useMemo(() => {
    return POKEMON_DATA.filter(p => {
      const inBiome = selectedBiome === 'Todos' || p.spawns.biomas_es.includes(selectedBiome);
      if (!inBiome) return false;

      if (rarityFilter !== 'Todas' && p.spawns.rareza !== rarityFilter) {
        return false;
      }

      if (dimensionFilter === 'nether' && selectedBiome === 'Todos') {
        return p.spawns.biomas_es.some(isNetherBiome);
      }
      if (dimensionFilter === 'end' && selectedBiome === 'Todos') {
        return p.spawns.biomas_es.some(isEndBiome);
      }
      if (dimensionFilter === 'overworld' && selectedBiome === 'Todos') {
        return p.spawns.biomas_es.some(b => !isNetherBiome(b) && !isEndBiome(b));
      }

      return true;
    });
  }, [selectedBiome, rarityFilter, dimensionFilter]);

  return (
    <div className="space-y-6">
      {/* Hero Banner del Explorador de Biomas */}
      <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#101b17] via-[#0d141e] to-[#070b12] border border-[#1b3b2b] shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                🗺️ Radar de Exploración de Minecraft
              </span>
              <span className="text-[11px] font-medium text-zinc-400 bg-[#070b12]/80 px-2 py-0.5 rounded-md border border-[#1f2d42]">
                Generación Dinámica de Spawns en CobbleES
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              Buscador por Bioma de Minecraft
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              ¿Estás en tu base o explorando el mapa de tu servidor? Selecciona cualquier bioma del Overworld, Nether o The End para descubrir al instante qué criaturas aparecen, sus condiciones de clima/horario y niveles exactos.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="bg-[#070b12]/90 border border-[#1f2d42] px-4 py-2.5 rounded-2xl text-center shadow-md">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block">Biomas Mapeados</span>
              <span className="text-lg font-black text-white font-mono">{biomeStats.length}</span>
            </div>
            <div className="bg-[#070b12]/90 border border-[#1f2d42] px-4 py-2.5 rounded-2xl text-center shadow-md">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">En este Bioma</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{matchingPokemon.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de selección de dimensión y biomas */}
      <div className="bg-[#101623] p-4 rounded-2xl border border-[#1f2d42] space-y-3.5 shadow-md">
        {/* Selector de dimensión */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-[#1a2536]">
          <div className="flex items-center gap-1.5 p-1 bg-[#070b12] rounded-xl border border-[#1f2d42] text-xs w-full sm:w-auto">
            <button
              onClick={() => { setDimensionFilter('all'); setSelectedBiome('Todos'); }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dimensionFilter === 'all'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Todas las Dimensiones
            </button>
            <button
              onClick={() => { setDimensionFilter('overworld'); setSelectedBiome('Todos'); }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dimensionFilter === 'overworld'
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🌲 Overworld
            </button>
            <button
              onClick={() => { setDimensionFilter('nether'); setSelectedBiome('Todos'); }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dimensionFilter === 'nether'
                  ? 'bg-rose-700 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🔥 Nether
            </button>
            <button
              onClick={() => { setDimensionFilter('end'); setSelectedBiome('Todos'); }}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-semibold transition-all ${
                dimensionFilter === 'end'
                  ? 'bg-purple-700 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              🌌 The End
            </button>
          </div>

          {/* Filtro de rareza */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-zinc-400">Rareza:</span>
            <select
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
              className="bg-[#070b12] border border-[#1f2d42] rounded-xl px-3 py-1.5 text-xs text-zinc-200 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="Todas">Todas las rarezas</option>
              <option value="Común">Común</option>
              <option value="Poco común">Poco común</option>
              <option value="Raro">Raro</option>
              <option value="Ultra Raro">Ultra Raro</option>
            </select>
          </div>
        </div>

        {/* Buscador de biomas */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={biomeSearch}
            onChange={(e) => setBiomeSearch(e.target.value)}
            placeholder="Escribe para buscar un bioma de Minecraft (ej: Desierto, Badlands, Océano, Taiga, Cerezos, Jungla)..."
            className="w-full bg-[#070b12] border border-[#1f2d42] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Barra de Biomas Interactiva: con flechas de desplazamiento, rueda del ratón y modo expandir todos */}
        <div className="relative flex items-center gap-1.5 pt-1">
          {/* Botón Izquierda */}
          {!wrapBiomes && (
            <button
              onClick={() => scrollBiomes('left')}
              className="p-1.5 rounded-xl bg-[#070b12] hover:bg-[#161f2e] text-zinc-400 hover:text-white border border-[#1f2d42] transition-colors shrink-0 shadow-sm"
              title="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Contenedor de Chips */}
          <div 
            ref={biomeScrollRef}
            onWheel={handleBiomeWheel}
            className={`flex items-center gap-1.5 py-1 px-0.5 no-scrollbar scroll-smooth flex-1 ${
              wrapBiomes 
                ? 'flex-wrap max-h-60 overflow-y-auto' 
                : 'overflow-x-auto'
            }`}
          >
            <button
              onClick={() => setSelectedBiome('Todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                selectedBiome === 'Todos'
                  ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-950/50'
                  : 'bg-[#070b12] text-zinc-400 hover:text-white border-[#1f2d42] hover:border-zinc-500'
              }`}
            >
              Todos los Biomas
            </button>
            {filteredBiomesList.map(b => {
              const isSelected = selectedBiome === b.name;
              return (
                <button
                  key={b.name}
                  onClick={() => setSelectedBiome(b.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-950/50'
                      : 'bg-[#070b12] text-zinc-400 hover:text-white border-[#1f2d42] hover:border-zinc-500'
                  }`}
                >
                  <span>{b.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/30 text-emerald-200' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {b.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Botón Derecha */}
          {!wrapBiomes && (
            <button
              onClick={() => scrollBiomes('right')}
              className="p-1.5 rounded-xl bg-[#070b12] hover:bg-[#161f2e] text-zinc-400 hover:text-white border border-[#1f2d42] transition-colors shrink-0 shadow-sm"
              title="Desplazar a la derecha (ver más biomas)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Botón Desplegar Todos / Vista Cuadrícula */}
          <button
            onClick={() => setWrapBiomes(!wrapBiomes)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ml-1 ${
              wrapBiomes 
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50' 
                : 'bg-[#070b12] text-zinc-400 border-[#1f2d42] hover:text-white hover:border-zinc-600'
            }`}
            title={wrapBiomes ? "Ver en una sola fila desplazable" : "Ver todos los biomas desplegados"}
          >
            {wrapBiomes ? (
              <>
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1 fila</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver todos ({filteredBiomesList.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resultados de Spawns en el Bioma */}
      <div>
        <div className="flex items-center justify-between mb-3.5 px-1">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TreePine className="w-4 h-4 text-emerald-400" />
              <span>Criaturas que Spawnean en: <strong className="text-emerald-400">{selectedBiome}</strong></span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Haz clic en cualquier tarjeta para ver su modelo 3D y estrategias competitivas.
            </p>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {matchingPokemon.length} Pokémon encontrados
          </span>
        </div>

        {matchingPokemon.length === 0 ? (
          <div className="bg-[#101623] border border-[#1f2d42] rounded-2xl p-8 text-center text-zinc-400 text-xs">
            No se encontraron criaturas en este bioma con los filtros actuales.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {matchingPokemon.map(pkmn => {
              const isInTeam = team.some(t => t.id === pkmn.id);
              const getRarityBadge = (rareza: string) => {
                switch (rareza) {
                  case 'Ultra Raro':
                    return 'bg-purple-950/60 text-purple-300 border-purple-800/40';
                  case 'Raro':
                    return 'bg-amber-950/60 text-amber-300 border-amber-800/40';
                  case 'Poco común':
                    return 'bg-blue-950/60 text-blue-300 border-blue-800/40';
                  default:
                    return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40';
                }
              };

              return (
                <div
                  key={pkmn.id}
                  className="bg-[#121722] border border-[#1f2d42] hover:border-emerald-500/60 rounded-2xl p-3.5 flex flex-col justify-between space-y-3 transition-all hover:shadow-lg"
                >
                  <div>
                    {/* Top: Número, Tipos y Rareza */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {pkmn.types.map(t => {
                          const b = getTypeBadge(t);
                          return (
                            <span key={t} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${b.bg} ${b.text} ${b.border}`}>
                              {t}
                            </span>
                          );
                        })}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRarityBadge(pkmn.spawns.rareza)}`}>
                        {pkmn.spawns.rareza}
                      </span>
                    </div>

                    {/* Foto y Nombre */}
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => onSelectPokemon(pkmn)}
                        className="w-16 h-16 rounded-xl bg-[#070b12] border border-[#1f2d42] p-1 flex items-center justify-center shrink-0 cursor-pointer hover:border-emerald-500/40 transition-colors"
                      >
                        <PokemonImage pokemon={pkmn} className="max-h-full max-w-full object-contain filter drop-shadow hover:scale-110 transition-transform" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold block">
                          #{String(pkmn.id).padStart(4, '0')}
                        </span>
                        <h4
                          onClick={() => onSelectPokemon(pkmn)}
                          className="font-bold text-sm text-white hover:text-emerald-400 transition-colors cursor-pointer truncate"
                        >
                          {pkmn.name_es}
                        </h4>
                        <span className="text-[11px] text-zinc-400 block mt-0.5 truncate">
                          Niveles: <strong className="text-zinc-200">{pkmn.spawns.niveles}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Condiciones de Spawn */}
                    <div className="mt-2.5 p-2 rounded-xl bg-[#070b12] border border-[#1f2d42] text-[11px] text-zinc-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Condiciones: <strong className="text-zinc-200">{pkmn.spawns.condiciones_es}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">Biomas: <span className="text-zinc-300">{pkmn.spawns.biomas_es.slice(0, 2).join(', ')}</span></span>
                      </div>
                    </div>

                    {/* Botín / Drops en Minecraft */}
                    {pkmn.drops && pkmn.drops.length > 0 && (
                      <div className="mt-2 text-[10px] text-zinc-400 flex items-center gap-1.5 truncate">
                        <span className="text-zinc-500">Drop:</span>
                        {pkmn.drops[0].sprite && (
                          <img 
                            src={pkmn.drops[0].sprite} 
                            alt="" 
                            className="w-3.5 h-3.5 object-contain [image-rendering:pixelated]" 
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        )}
                        <span className="text-zinc-300 truncate">{pkmn.drops[0].item_es} ({pkmn.drops[0].probabilidad})</span>
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="pt-2 border-t border-[#1f2d42] flex gap-2">
                    <button
                      onClick={() => onAddToTeam(pkmn)}
                      disabled={isInTeam}
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        isInTeam 
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                      }`}
                    >
                      {isInTeam ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>En equipo</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Añadir</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onSelectPokemon(pkmn)}
                      className="p-1.5 rounded-xl bg-[#070b12] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#1f2d42] transition-colors"
                      title="Ver ficha completa"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
