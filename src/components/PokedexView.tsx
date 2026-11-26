import React, { useState, useMemo, useRef } from 'react';
import { Pokemon, POKEMON_DATA } from '../data/pokemonData';
import { MEGA_POKEMON_IDS } from '../data/megaData';
import { getTypeBadge, TYPE_STYLES } from '../utils/typeColors';
import { PokemonImage } from './PokemonImage';
import { Search, MapPin, Compass, Filter, Box, ChevronLeft, ChevronRight, LayoutGrid, ListFilter, Sparkles } from 'lucide-react';

interface PokedexViewProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  team: Pokemon[];
}

export const PokedexView: React.FC<PokedexViewProps> = ({ 
  onSelectPokemon, 
  onAddToTeam, 
  team 
}) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedGen, setSelectedGen] = useState<string>('Todas');
  const [onlyMounts, setOnlyMounts] = useState(false);
  const [onlyMegas, setOnlyMegas] = useState(false);
  const [visibleCount, setVisibleCount] = useState(48);
  const [wrapTypes, setWrapTypes] = useState(false);
  const typeScrollRef = useRef<HTMLDivElement>(null);

  const scrollTypes = (direction: 'left' | 'right') => {
    if (typeScrollRef.current) {
      const amount = direction === 'left' ? -220 : 220;
      typeScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleTypeWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (typeScrollRef.current && !wrapTypes && e.deltaY !== 0) {
      e.currentTarget.scrollLeft += e.deltaY;
    }
  };

  const allTypes = [
    'Todos', 'Fuego', 'Agua', 'Planta', 'Eléctrico', 'Dragón', 
    'Volador', 'Fantasma', 'Normal', 'Hielo', 'Tierra', 'Lucha',
    'Psíquico', 'Bicho', 'Roca', 'Siniestro', 'Acero', 'Hada', 'Veneno'
  ];

  const filteredPokemon = useMemo(() => {
    return POKEMON_DATA.filter(p => {
      const matchSearch = 
        p.name_es.toLowerCase().includes(search.toLowerCase()) ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        String(p.id).includes(search) ||
        p.spawns.biomas_es.some(b => b.toLowerCase().includes(search.toLowerCase())) ||
        p.spawns.biomas_tag.some(t => t.toLowerCase().includes(search.toLowerCase()));

      const matchType = selectedType === 'Todos' || p.types.includes(selectedType);
      const matchGen = selectedGen === 'Todas' || String(p.generation) === selectedGen;
      const matchMount = !onlyMounts || p.mount?.is_mountable;
      const matchMega = !onlyMegas || MEGA_POKEMON_IDS.has(p.id);

      return matchSearch && matchType && matchGen && matchMount && matchMega;
    });
  }, [search, selectedType, selectedGen, onlyMounts, onlyMegas]);

  const displayedPokemon = useMemo(() => {
    return filteredPokemon.slice(0, visibleCount);
  }, [filteredPokemon, visibleCount]);

  return (
    <div className="space-y-6">
      {/* Header con personalidad CobbleES */}
      <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#111927] via-[#0d1420] to-[#070b12] border border-[#1f2d42] shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                🎮 CobbleES • Cobblemon v1.8.4
              </span>
              <span className="text-[11px] font-medium text-zinc-400 bg-[#070b12]/80 px-2 py-0.5 rounded-md border border-[#1f2d42]">
                Minecraft 1.21.1 / 1.20.1 • Fabric & NeoForge
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              Pokédex de Cobble<span className="text-emerald-400">ES</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Explora las 851 criaturas con sus modelos oficiales de Cobblemon v1.8.4. Consulta biomas de generación en Minecraft, objetos de botín, datos de montura, compatibilidad con Mega Evoluciones (Addons) y estrategias competitivas en español.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="bg-[#070b12]/90 border border-[#1f2d42] px-4 py-2.5 rounded-2xl text-center shadow-md">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold block">Registrados</span>
              <span className="text-lg font-black text-white font-mono">{POKEMON_DATA.length}</span>
            </div>
            <div className="bg-[#070b12]/90 border border-[#1f2d42] px-4 py-2.5 rounded-2xl text-center shadow-md">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold block">Monturas</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {POKEMON_DATA.filter(p => p.mount?.is_mountable).length}
              </span>
            </div>
            <div className="bg-[#070b12]/90 border border-[#1f2d42] px-4 py-2.5 rounded-2xl text-center shadow-md">
              <span className="text-[10px] text-purple-400 uppercase tracking-wider font-semibold block">Megas (Addon)</span>
              <span className="text-lg font-black text-purple-300 font-mono">
                {MEGA_POKEMON_IDS.size}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de búsqueda y filtros sin scrollbars invasivos */}
      <div className="bg-[#101623] p-4 rounded-2xl border border-[#1f2d42] space-y-3.5 shadow-md">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Input de Búsqueda */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(48);
              }}
              placeholder="Buscar por nombre, número o bioma (ej. Charizard, #0006, Nether, Montañas, Océano)..."
              className="w-full bg-[#070b12] border border-[#1f2d42] rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Filtro Generación */}
          <select
            value={selectedGen}
            onChange={(e) => {
              setSelectedGen(e.target.value);
              setVisibleCount(48);
            }}
            className="bg-[#070b12] border border-[#1f2d42] rounded-xl px-3 py-2 text-xs text-zinc-200 font-medium focus:outline-none focus:border-emerald-500 shrink-0"
          >
            <option value="Todas">Todas las generaciones</option>
            {Array.from({ length: 9 }).map((_, i) => (
              <option key={i+1} value={String(i+1)}>Gen {i+1}</option>
            ))}
          </select>

          {/* Toggle Solo Monturas */}
          <button
            onClick={() => {
              setOnlyMounts(!onlyMounts);
              setVisibleCount(48);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
              onlyMounts
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-[#070b12] text-zinc-400 border-[#1f2d42] hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Solo monturas</span>
          </button>

          {/* Toggle Solo Megas (Addon) */}
          <button
            onClick={() => {
              setOnlyMegas(!onlyMegas);
              setVisibleCount(48);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0 ${
              onlyMegas
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                : 'bg-[#070b12] text-zinc-400 border-[#1f2d42] hover:text-white'
            }`}
            title="Mostrar Pokémon que pueden Megaevolucionar con los mods Cobblemon Mega Showdown o Ascension Megamons"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Megas (Addon)</span>
          </button>
        </div>

        {/* Barra de Tipos Interactiva: con flechas de desplazamiento, rueda del ratón y modo expandir todos */}
        <div className="relative flex items-center gap-1.5 pt-1">
          {/* Botón Izquierda */}
          {!wrapTypes && (
            <button
              onClick={() => scrollTypes('left')}
              className="p-1.5 rounded-xl bg-[#070b12] hover:bg-[#161f2e] text-zinc-400 hover:text-white border border-[#1f2d42] transition-colors shrink-0 shadow-sm"
              title="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Contenedor de Chips */}
          <div 
            ref={typeScrollRef}
            onWheel={handleTypeWheel}
            className={`flex items-center gap-1.5 py-1 px-0.5 no-scrollbar scroll-smooth flex-1 ${
              wrapTypes 
                ? 'flex-wrap' 
                : 'overflow-x-auto'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-zinc-400 shrink-0 mr-1" />
            {allTypes.map(type => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setVisibleCount(48);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-950/50 scale-105'
                      : 'bg-[#070b12] text-zinc-400 hover:text-white border-[#1f2d42] hover:border-zinc-500'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Botón Derecha */}
          {!wrapTypes && (
            <button
              onClick={() => scrollTypes('right')}
              className="p-1.5 rounded-xl bg-[#070b12] hover:bg-[#161f2e] text-zinc-400 hover:text-white border border-[#1f2d42] transition-colors shrink-0 shadow-sm"
              title="Desplazar a la derecha (ver más tipos como Hada y Veneno)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Botón Desplegar Todos / Vista Cuadrícula */}
          <button
            onClick={() => setWrapTypes(!wrapTypes)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ml-1 ${
              wrapTypes 
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50' 
                : 'bg-[#070b12] text-zinc-400 border-[#1f2d42] hover:text-white hover:border-zinc-600'
            }`}
            title={wrapTypes ? "Ver en una sola fila desplazable" : "Ver todos los 18 tipos desplegados sin desplazar"}
          >
            {wrapTypes ? (
              <>
                <ListFilter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">1 fila</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver todos</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5 px-1 border-t border-[#1a2536]">
          <span>Mostrando <strong className="text-white">{displayedPokemon.length}</strong> de <strong className="text-white">{filteredPokemon.length}</strong> Pokémon en CobbleES</span>
        </div>
      </div>

      {/* Grid de Pokémon con Modelos Oficiales de Cobblemon en Movimiento */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5">
        {displayedPokemon.map((pkmn, idx) => {
          const isTeamMember = team.some(t => t.id === pkmn.id);
          const primaryType = pkmn.types[0];
          const typeStyle = TYPE_STYLES[primaryType] || {
            glow: "rgba(100, 116, 139, 0.15)",
            accent: "#64748b"
          };

          return (
            <div 
              key={pkmn.id}
              className="group relative bg-[#121722] hover:bg-[#161d2b] border border-[#20293b] hover:border-zinc-400 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between overflow-hidden"
              style={{
                boxShadow: `0 4px 24px -6px ${typeStyle.glow}`
              }}
            >
              {/* Resplandor ambiental suave del tipo */}
              <div 
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-85 transition-opacity duration-300 animate-pulse-glow"
                style={{ backgroundColor: typeStyle.accent }}
              />

              <div className="relative z-10">
                {/* Header Card */}
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-mono text-zinc-400 font-semibold">
                    #{String(pkmn.id).padStart(4, '0')}
                  </span>
                  <div className="flex items-center gap-1">
                    {MEGA_POKEMON_IDS.has(pkmn.id) && (
                      <span className="text-[9px] font-bold text-purple-300 bg-purple-950/80 border border-purple-800/60 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs" title="Tiene Mega Evolución disponible con mod addon">
                        <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                        <span>Mega</span>
                      </span>
                    )}
                    {pkmn.mount?.is_mountable && (
                      <span className="text-[10px] font-medium text-sky-400 bg-sky-950/60 border border-sky-800/50 px-1.5 py-0.2 rounded-md flex items-center gap-1">
                        <Compass className="w-3 h-3" />
                        {pkmn.mount.category_es.split(' ')[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contenedor del Modelo Cobblemon con Animación de Flotación y Sombra 3D */}
                <div 
                  onClick={() => onSelectPokemon(pkmn)}
                  className="h-32 flex flex-col items-center justify-end pb-2 cursor-pointer rounded-xl bg-[#0b0f17]/80 border border-[#1a2233] mb-2.5 group-hover:border-zinc-500 transition-colors relative overflow-hidden"
                >
                  {/* Badge 3D interactivo */}
                  <div className="absolute top-1.5 right-1.5 z-20 opacity-60 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold text-sky-300 border border-sky-800/40 flex items-center gap-1">
                    <Box className="w-2.5 h-2.5 text-sky-400" />
                    <span>3D</span>
                  </div>

                  {/* Modelo Cobblemon 3D Oficial con Movimiento de Respiración/Flotación */}
                  <div 
                    className="relative z-10 cobblemon-model-motion group-hover:scale-115 transition-transform duration-300 flex items-center justify-center h-24 w-full"
                    style={{ animationDelay: `${(idx % 6) * 0.4}s` }}
                  >
                    <PokemonImage
                      pokemon={pkmn}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Sombra de mob en el suelo de Minecraft sincronizada con la flotación */}
                  <div 
                    className="w-12 h-2.5 bg-black/60 rounded-full blur-[1.5px] cobblemon-shadow-motion pointer-events-none"
                    style={{ animationDelay: `${(idx % 6) * 0.4}s` }}
                  />
                </div>

                {/* Info */}
                <div className="space-y-1.5 mb-2.5">
                  <h3 
                    onClick={() => onSelectPokemon(pkmn)}
                    className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors cursor-pointer truncate"
                  >
                    {pkmn.name_es}
                  </h3>

                  <div className="flex flex-wrap gap-1">
                    {pkmn.types.map(t => {
                      const b = getTypeBadge(t);
                      return (
                        <span key={t} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${b.bg} ${b.text} ${b.border}`}>
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  {/* Bioma */}
                  <div className="pt-1 flex items-start gap-1 text-[11px] text-zinc-400">
                    <MapPin className="w-3 h-3 text-zinc-400 shrink-0 mt-0.5" />
                    <span className="truncate">{pkmn.spawns.biomas_es[0]}</span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="relative z-10 grid grid-cols-2 gap-1.5 pt-2 border-t border-[#1c2436] text-xs">
                <button
                  onClick={() => onSelectPokemon(pkmn)}
                  className="py-1.5 px-2 rounded-lg bg-[#0b0f17] hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium transition-colors border border-[#242f42] text-center"
                >
                  Ficha
                </button>

                <button
                  onClick={() => onAddToTeam(pkmn)}
                  disabled={isTeamMember}
                  className={`py-1.5 px-2 rounded-lg font-semibold transition-all border text-center ${
                    isTeamMember
                      ? 'bg-zinc-800/40 text-zinc-400 border-zinc-800 cursor-default'
                      : 'bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border-indigo-500/40'
                  }`}
                >
                  {isTeamMember ? 'En equipo' : '+ Equipo'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón Cargar Más */}
      {displayedPokemon.length < filteredPokemon.length && (
        <div className="text-center pt-3 pb-6">
          <button
            onClick={() => setVisibleCount(prev => prev + 48)}
            className="px-6 py-2.5 rounded-xl bg-[#121722] hover:bg-[#18202d] text-zinc-200 hover:text-white font-semibold text-xs border border-[#263042] hover:border-zinc-400 transition-all shadow-md"
          >
            Cargar {Math.min(48, filteredPokemon.length - displayedPokemon.length)} más ({filteredPokemon.length - displayedPokemon.length} restantes)
          </button>
        </div>
      )}

      {filteredPokemon.length === 0 && (
        <div className="text-center py-16 bg-[#121722] rounded-2xl border border-[#20293b]">
          <p className="text-sm text-zinc-400">No se encontraron Pokémon con los filtros actuales.</p>
        </div>
      )}
    </div>
  );
};
