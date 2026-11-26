import React, { useState } from 'react';
import { Pokemon, POKEMON_DATA } from '../data/pokemonData';
import { 
  performDetailedAudit, 
  ALL_TYPES, 
  STARTING_ANCHORS, 
  StartingAnchor, 
  StrategicSuggestion 
} from '../utils/competitiveEngine';
import { getTypeBadge } from '../utils/typeColors';
import { PokemonImage } from './PokemonImage';
import { 
  Trash2, 
  Plus, 
  Layers, 
  Target, 
  Swords, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Flame, 
  Compass, 
  Trophy, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  ExternalLink,
  RotateCw,
  Gem,
  Shield,
  Users
} from 'lucide-react';

interface TeamBuilderViewProps {
  team: Pokemon[];
  onRemoveFromTeam: (pokemonId: number) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
  onClearTeam: () => void;
  onOpenPokemon: (pokemon: Pokemon) => void;
}

export const TeamBuilderView: React.FC<TeamBuilderViewProps> = ({
  team,
  onRemoveFromTeam,
  onAddToTeam,
  onClearTeam,
  onOpenPokemon
}) => {
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'synergy' | 'threats' | 'movesets'>('synergy');
  const [suggestionFilter, setSuggestionFilter] = useState<'all' | 'gems' | 'defensive' | 'offensive' | 'type'>('all');
  const [rotationSeed, setRotationSeed] = useState(0);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('Acero');

  // Auditoría detallada con soporte de filtros y rotación de sugerencias
  const audit = performDetailedAudit(team, {
    filterTab: suggestionFilter,
    rotationSeed,
    selectedType: selectedTypeFilter
  });

  // Tipos presentes y faltantes en el equipo
  const presentTypes = new Set<string>();
  team.forEach(p => p.types.forEach(t => presentTypes.add(t)));
  const missingTypes = ALL_TYPES.filter(t => !presentTypes.has(t));

  // Helper para renderizar texto con negritas markdown **...**
  const renderFormattedReason = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Helper para buscar el objeto Pokemon completo de un StartingAnchor
  const handleAddAnchor = (anchor: StartingAnchor) => {
    const found = POKEMON_DATA.find(p => p.id === anchor.id || p.name.toLowerCase() === anchor.name.toLowerCase());
    if (found) {
      onAddToTeam(found);
    }
  };

  // Calcular calificación general del equipo cuando está completo o en progreso
  const getTeamRating = () => {
    if (team.length === 0) return { letter: '-', title: 'Sin integrantes', color: 'text-zinc-500' };
    let score = 50;
    if (audit.cores.fwgCore.present) score += 15;
    if (audit.cores.dfsCore.present) score += 15;
    if (audit.cores.groundImmunity.present) score += 15;
    if (audit.cores.hazardControl.hasSetter) score += 5;
    if (audit.cores.hazardControl.hasRemoval) score += 5;
    score -= audit.criticalWeaknesses.length * 8;
    const coveredThreats = audit.threatsEvaluation.filter(t => !t.isVulnerable).length;
    score += coveredThreats * 4;

    if (score >= 90) return { letter: 'S', title: 'Equilibrio Magistral', color: 'text-amber-400' };
    if (score >= 75) return { letter: 'A+', title: 'Sinergia Competitiva Alta', color: 'text-emerald-400' };
    if (score >= 60) return { letter: 'B', title: 'Buen Balance Táctico', color: 'text-blue-400' };
    return { letter: 'C', title: 'Vulnerable a Presión Meta', color: 'text-orange-400' };
  };

  const rating = getTeamRating();

  return (
    <div className="space-y-6">
      {/* =========================================================================
          ENCABEZADO PRINCIPAL CON PROGRESO DEL EQUIPO
         ========================================================================= */}
      <div className="bg-[#121722] border border-[#20293b] rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Laboratorio de Sinergias & Creador de Equipos
                </h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Análisis táctico autónomo en tiempo real según las reglas de Cobblemon y Smogon OU.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Medidor de Integrantes */}
            <div className="bg-[#0b0f17] border border-[#20293b] px-3.5 py-1.5 rounded-xl flex items-center gap-2.5">
              <span className="text-xs text-zinc-400 font-medium">Equipo:</span>
              <span className="text-sm font-bold font-mono text-white">
                {team.length} <span className="text-zinc-500">/ 6</span>
              </span>
              <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    team.length === 6 ? 'bg-emerald-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${(team.length / 6) * 100}%` }}
                />
              </div>
            </div>

            {team.length > 0 && (
              <button
                onClick={onClearTeam}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-300 text-xs font-medium border border-red-800/40 transition-colors"
                title="Reiniciar equipo"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vaciar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          GRID DE 6 RANURAS DEL EQUIPO
         ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, idx) => {
          const member = team[idx];

          if (member) {
            return (
              <div 
                key={member.id}
                className="bg-[#121722] border border-[#20293b] hover:border-indigo-500/50 rounded-2xl p-3 flex flex-col justify-between relative group shadow-md transition-all hover:-translate-y-0.5"
              >
                {/* Botón quitar */}
                <button
                  onClick={() => onRemoveFromTeam(member.id)}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-[#0b0f17]/80 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 border border-[#20293b] transition-colors z-10"
                  title="Quitar del equipo"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-400/80 font-bold px-1.5 py-0.5 rounded bg-indigo-950/40 border border-indigo-800/30">
                      SLOT {idx + 1}
                    </span>
                  </div>

                  {/* Modelo / Imagen con animación */}
                  <div 
                    onClick={() => onOpenPokemon(member)}
                    className="h-24 flex items-center justify-center cursor-pointer my-1.5 rounded-xl bg-[#0b0f17]/70 p-2 border border-[#1b2230] group-hover:border-indigo-500/30 transition-colors"
                    title="Ver ficha completa"
                  >
                    <PokemonImage 
                      pokemon={member} 
                      className="max-h-full max-w-full object-contain filter drop-shadow hover:scale-110 transition-transform duration-200" 
                    />
                  </div>

                  {/* Nombre */}
                  <h4 
                    onClick={() => onOpenPokemon(member)}
                    className="font-bold text-xs text-white text-center cursor-pointer hover:text-indigo-300 transition-colors truncate"
                  >
                    {member.name_es}
                  </h4>

                  {/* Tipos */}
                  <div className="flex justify-center gap-1 mt-1">
                    {member.types.map(t => {
                      const b = getTypeBadge(t);
                      return (
                        <span key={t} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border ${b.bg} ${b.text} ${b.border}`}>
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Objeto Recomendado */}
                <div className="mt-2.5 pt-2 border-t border-[#20293b] text-[10px] text-zinc-400 flex items-center justify-center gap-1.5">
                  {member.pvp.objeto_sprite && (
                    <img 
                      src={member.pvp.objeto_sprite} 
                      alt="" 
                      className="w-4 h-4 object-contain [image-rendering:pixelated] shrink-0"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  )}
                  <span className="truncate text-zinc-300 font-medium">
                    {member.pvp.objeto_recomendado.split('(')[0]}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={`empty-${idx}`}
              className="bg-[#121722]/40 border-2 border-dashed border-[#20293b] hover:border-zinc-700 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[190px] text-center transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[#0b0f17] border border-[#20293b] flex items-center justify-center text-zinc-500 mb-2 font-mono text-xs font-bold group-hover:text-indigo-400 group-hover:border-indigo-500/40 transition-colors">
                {idx + 1}
              </div>
              <span className="text-xs font-medium text-zinc-400">Ranura Libre</span>
              <span className="text-[10px] text-zinc-600 mt-0.5">Esperando Pokémon</span>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          ESTADO CERO: EQUIPO VACÍO (team.length === 0)
          Hero que pide al jugador añadir su primer Pokémon + Grid de 6 Pilares Meta
         ========================================================================= */}
      {team.length === 0 && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-950/40 via-[#121722] to-indigo-950/20 border border-indigo-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Paso 1: Elige el Pilar de tu Estrategia</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Añade tu primer Pokémon para iniciar el Análisis Táctico en Vivo
              </h2>
              <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                Cada gran alineación se cimienta en torno a un <strong className="text-white">Pokémon ancla (Anchor)</strong>. En cuanto añadas al primer integrante, el motor calculará automáticamente sus coberturas elementales, detectará amenazas críticas del metagame y te sugerirá compañeros ideales para formar núcleos indestructibles (Fuego-Agua-Planta y Dragón-Hada-Acero).
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Pilares de Apertura Recomendados (Meta Cobblemon)
                </h3>
                <p className="text-xs text-zinc-400">
                  Selecciona uno de estos referentes competitivos para estructurar tu equipo con ventaja:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {STARTING_ANCHORS.map(anchor => {
                const fullPkmn = POKEMON_DATA.find(p => p.id === anchor.id || p.name.toLowerCase() === anchor.name.toLowerCase());

                return (
                  <div 
                    key={anchor.id}
                    className="bg-[#121722] border border-[#20293b] hover:border-indigo-500/60 rounded-2xl p-4 flex flex-col justify-between space-y-3.5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {anchor.types.map(t => {
                            const b = getTypeBadge(t);
                            return (
                              <span key={t} className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${b.bg} ${b.text} ${b.border}`}>
                                {t}
                              </span>
                            );
                          })}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 font-bold">
                          #{String(anchor.id).padStart(4, '0')}
                        </span>
                      </div>

                      {/* Header con Imagen */}
                      <div className="flex items-center gap-3.5 mt-2.5">
                        <div 
                          onClick={() => fullPkmn && onOpenPokemon(fullPkmn)}
                          className="w-16 h-16 rounded-xl bg-[#0b0f17] border border-[#1b2230] p-1 flex items-center justify-center shrink-0 cursor-pointer hover:border-indigo-500/40 transition-colors"
                          title="Ver ficha completa"
                        >
                          {fullPkmn ? (
                            <PokemonImage pokemon={fullPkmn} className="max-h-full max-w-full object-contain filter drop-shadow" />
                          ) : (
                            <img 
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${anchor.id}.png`}
                              alt={anchor.name_es}
                              className="max-h-full max-w-full object-contain"
                            />
                          )}
                        </div>

                        <div>
                          <h4 
                            onClick={() => fullPkmn && onOpenPokemon(fullPkmn)}
                            className="font-bold text-base text-white hover:text-indigo-300 transition-colors cursor-pointer"
                          >
                            {anchor.name_es}
                          </h4>
                          <span className="inline-block text-[11px] font-medium text-indigo-400 bg-indigo-950/50 border border-indigo-800/30 px-2 py-0.5 rounded-md mt-0.5">
                            {anchor.role}
                          </span>
                        </div>
                      </div>

                      {/* Razón táctica */}
                      <p className="text-xs text-zinc-300 mt-2.5 leading-relaxed bg-[#0b0f17]/60 p-2.5 rounded-xl border border-[#1b2230]">
                        {anchor.whyGoodLead}
                      </p>

                      {/* Objeto */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-zinc-400">
                        {anchor.item_sprite && (
                          <img 
                            src={anchor.item_sprite} 
                            alt="" 
                            className="w-4 h-4 object-contain [image-rendering:pixelated]"
                          />
                        )}
                        <span className="truncate">Objeto: <strong className="text-zinc-200">{anchor.item}</strong></span>
                      </div>
                    </div>

                    {/* Botón Acción */}
                    <div className="pt-2 border-t border-[#20293b] flex gap-2">
                      <button
                        onClick={() => handleAddAnchor(anchor)}
                        className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-900/30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Iniciar con {anchor.name_es}</span>
                      </button>
                      {fullPkmn && (
                        <button
                          onClick={() => onOpenPokemon(fullPkmn)}
                          className="p-2 rounded-xl bg-[#0b0f17] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#20293b] transition-colors"
                          title="Ver ficha técnica"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ESTADO EN CONSTRUCCIÓN (1 <= team.length < 6)
          Diagnóstico en vivo + Recomendaciones estratégicas múltiples
         ========================================================================= */}
      {team.length > 0 && team.length < 6 && (
        <div className="space-y-5">
          {/* Barra de Diagnóstico Táctico en Vivo */}
          <div className="bg-[#121722] border border-[#20293b] rounded-2xl p-4 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#20293b]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-sm text-white">
                  Diagnóstico Táctico en Vivo ({team.length}/6 miembros)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {/* Inmunidad a Tierra */}
                <span className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 ${
                  audit.cores.groundImmunity.present
                    ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                    : 'bg-red-950/40 border-red-800/40 text-red-300'
                }`}>
                  {audit.cores.groundImmunity.present ? (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  ) : (
                    <ShieldAlert className="w-3.5 h-3.5" />
                  )}
                  <span>{audit.cores.groundImmunity.present ? 'Inmune a Terremoto' : 'Vulnerable a Terremoto'}</span>
                </span>

                {/* Núcleo Dragón-Hada-Acero */}
                <span className={`px-2.5 py-1 rounded-lg border font-semibold ${
                  audit.cores.dfsCore.present
                    ? 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300'
                    : 'bg-zinc-800/80 border-zinc-700 text-zinc-400'
                }`}>
                  Núcleo DFS: {audit.cores.dfsCore.present ? 'Completo' : `Falta ${audit.cores.dfsCore.missing.join('/')}`}
                </span>

                {/* Núcleo Fuego-Agua-Planta */}
                <span className={`px-2.5 py-1 rounded-lg border font-semibold ${
                  audit.cores.fwgCore.present
                    ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                    : 'bg-zinc-800/80 border-zinc-700 text-zinc-400'
                }`}>
                  Núcleo FWG: {audit.cores.fwgCore.present ? 'Completo' : `Falta ${audit.cores.fwgCore.missing.join('/')}`}
                </span>
              </div>
            </div>

            {/* Avisos rápidos de debilidades críticas */}
            {audit.criticalWeaknesses.length > 0 && (
              <div className="mt-3 flex items-start gap-2 bg-red-950/20 border border-red-900/30 rounded-xl p-3 text-xs text-red-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div>
                  <strong className="font-semibold">Debilidad Compartida Crítica:</strong> Tienes {audit.criticalWeaknesses.length} tipos con 2 o más miembros vulnerables ({audit.criticalWeaknesses.join(', ')}). Prioriza añadir un compañero que resista o anule estos ataques.
                </div>
              </div>
            )}
          </div>

          {/* Sección de Recomendaciones Autónomas e Inteligentes */}
          <div className="space-y-3.5">
            {/* Cabecera con Botón de Barajar / Descubrir más opciones */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Compañeros con Sinergia & Descubrimientos Tácticos
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Análisis bilateral preciso: coberturas mutuas, anulación de debilidades y herramientas clave.
                </p>
              </div>

              <button
                onClick={() => setRotationSeed(prev => prev + 1)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] self-start sm:self-auto"
                title="Mostrar otros Pokémon viables de la Pokédex"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>Barajar / Descubrir otros ({rotationSeed + 1})</span>
              </button>
            </div>

            {/* Filtros de Sugerencia */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121722] border border-[#20293b] rounded-xl text-xs">
              <button
                onClick={() => setSuggestionFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  suggestionFilter === 'all'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Máxima Sinergia</span>
              </button>

              <button
                onClick={() => setSuggestionFilter('gems')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  suggestionFilter === 'gems'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Gem className="w-3.5 h-3.5 text-amber-400" />
                <span>Gemas & Anti-Meta (Gens 1-9)</span>
              </button>

              <button
                onClick={() => setSuggestionFilter('defensive')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  suggestionFilter === 'defensive'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                <span>Muros & Soporte</span>
              </button>

              <button
                onClick={() => setSuggestionFilter('offensive')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  suggestionFilter === 'offensive'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Swords className="w-3.5 h-3.5 text-rose-400" />
                <span>Sweepers & Ofensiva</span>
              </button>

              <button
                onClick={() => setSuggestionFilter('type')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  suggestionFilter === 'type'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Por Tipo Faltante</span>
              </button>
            </div>

            {/* Selector de tipo cuando el filtro 'type' está activo */}
            {suggestionFilter === 'type' && (
              <div className="p-2.5 bg-[#0b0f17] border border-[#20293b] rounded-xl flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-[11px] text-zinc-400 font-medium shrink-0 mr-1">Filtrar por:</span>
                {(missingTypes.length > 0 ? missingTypes : ALL_TYPES).map(t => {
                  const isSelected = selectedTypeFilter === t;
                  const b = getTypeBadge(t);
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTypeFilter(t)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all shrink-0 ${
                        isSelected 
                          ? `${b.bg} ${b.text} ${b.border} ring-2 ring-indigo-400/50 scale-105` 
                          : 'bg-[#121722] text-zinc-400 border-[#20293b] hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Grid de Recomendaciones */}
            {audit.suggestions && audit.suggestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {audit.suggestions.map((sug) => {
                  const getCategoryStyle = (cat: StrategicSuggestion['category']) => {
                    switch (cat) {
                      case 'Núcleo':
                        return 'bg-blue-950/60 border-blue-800/40 text-blue-300';
                      case 'Inmunidad & Control':
                        return 'bg-amber-950/60 border-amber-800/40 text-amber-300';
                      case 'Counter de Amenaza':
                        return 'bg-red-950/60 border-red-800/40 text-red-300';
                      case 'Rematador Ofensivo':
                        return 'bg-purple-950/60 border-purple-800/40 text-purple-300';
                      case 'Gema Oculta':
                        return 'bg-emerald-950/60 border-emerald-800/40 text-emerald-300';
                      case 'Muro & Soporte':
                        return 'bg-cyan-950/60 border-cyan-800/40 text-cyan-300';
                      default:
                        return 'bg-zinc-800 border-zinc-700 text-zinc-300';
                    }
                  };

                  return (
                    <div 
                      key={sug.pokemon.id}
                      className="bg-[#121722] border border-[#20293b] hover:border-indigo-500/60 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all hover:shadow-lg"
                    >
                      <div>
                        {/* Top: Categoría, Generación y Sinergia Score */}
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getCategoryStyle(sug.category)}`}>
                              {sug.highlightBadge}
                            </span>
                            {sug.generationTag && (
                              <span className="text-[9px] font-mono text-zinc-500 px-1 py-0.2 rounded bg-zinc-800/60">
                                {sug.generationTag}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                            Sinergia: <strong className="text-emerald-400 font-bold">{sug.synergyScore}%</strong>
                          </span>
                        </div>

                        {/* Foto & Nombre */}
                        <div className="flex items-center gap-3 my-2.5">
                          <div 
                            onClick={() => onOpenPokemon(sug.pokemon)}
                            className="w-14 h-14 rounded-xl bg-[#0b0f17] border border-[#1b2230] p-1 flex items-center justify-center shrink-0 cursor-pointer hover:border-indigo-500/40 transition-colors"
                            title="Ver ficha completa"
                          >
                            <PokemonImage pokemon={sug.pokemon} className="max-h-full max-w-full object-contain filter drop-shadow" />
                          </div>

                          <div className="min-w-0">
                            <h4 
                              onClick={() => onOpenPokemon(sug.pokemon)}
                              className="font-bold text-sm text-white hover:text-indigo-300 transition-colors cursor-pointer truncate"
                            >
                              {sug.pokemon.name_es}
                            </h4>
                            <div className="flex gap-1 mt-1">
                              {sug.pokemon.types.map(t => {
                                const b = getTypeBadge(t);
                                return (
                                  <span key={t} className={`text-[9px] font-medium px-1.5 py-0.2 rounded border ${b.bg} ${b.text} ${b.border}`}>
                                    {t}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Pareja Clave del Equipo (Sinergia directa con miembro activo) */}
                        {sug.partnerName && (
                          <div className="mb-2 px-2 py-1 rounded-lg bg-indigo-950/40 border border-indigo-800/30 text-[10px] text-indigo-300 flex items-center gap-1.5">
                            <Users className="w-3 h-3 text-indigo-400 shrink-0" />
                            <span className="truncate">Pareja Clave: <strong className="text-white">{sug.partnerName}</strong></span>
                          </div>
                        )}

                        {/* Razón táctica con por qué encaja (sin ambigüedades) */}
                        <p className="text-[11px] text-zinc-300 leading-relaxed bg-[#0b0f17]/70 p-2.5 rounded-xl border border-[#1b2230]">
                          {renderFormattedReason(sug.reason_es)}
                        </p>

                        {/* Objeto Recomendado */}
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-zinc-400">
                          {sug.pokemon.pvp.objeto_sprite && (
                            <img 
                              src={sug.pokemon.pvp.objeto_sprite} 
                              alt="" 
                              className="w-3.5 h-3.5 object-contain [image-rendering:pixelated]"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          )}
                          <span className="truncate">Objeto: <strong className="text-zinc-200">{sug.pokemon.pvp.objeto_recomendado.split('(')[0]}</strong></span>
                        </div>
                      </div>

                      {/* Botón Añadir */}
                      <div className="pt-2 border-t border-[#20293b] flex gap-2">
                        <button
                          onClick={() => onAddToTeam(sug.pokemon)}
                          className="flex-1 py-1.5 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Añadir</span>
                        </button>
                        <button
                          onClick={() => onOpenPokemon(sug.pokemon)}
                          className="p-1.5 rounded-xl bg-[#0b0f17] hover:bg-zinc-800 text-zinc-400 hover:text-white border border-[#20293b] transition-colors"
                          title="Ver ficha técnica"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#121722] border border-[#20293b] rounded-2xl p-6 text-center text-zinc-400 text-xs">
                No se encontraron sugerencias específicas para este filtro. Intenta con "Máxima Sinergia" o barajar opciones.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          ESTADO EQUIPO COMPLETO (team.length === 6)
          Reporte Maestro de Sinergia
         ========================================================================= */}
      {team.length === 6 && (
        <div className="bg-gradient-to-r from-emerald-950/30 via-[#121722] to-indigo-950/30 border border-emerald-900/40 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#20293b]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    ¡Equipo Cobblemon Completo!
                  </h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">
                    6 / 6 Miembros
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Auditoría final: tu alineación cuenta con una calificación de <strong className={rating.color}>Tier {rating.letter} ({rating.title})</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Listo para combates competitivos y gimnasios.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-xs">
            <div className="p-3 bg-[#0b0f17] border border-[#20293b] rounded-xl space-y-1">
              <span className="text-zinc-400 text-[11px] block">Núcleo Elemental FWG</span>
              <span className={`font-bold ${audit.cores.fwgCore.present ? 'text-emerald-400' : 'text-amber-400'}`}>
                {audit.cores.fwgCore.present ? '✅ Completo' : '⚠️ Incompleto'}
              </span>
            </div>

            <div className="p-3 bg-[#0b0f17] border border-[#20293b] rounded-xl space-y-1">
              <span className="text-zinc-400 text-[11px] block">Núcleo Fantasía DFS</span>
              <span className={`font-bold ${audit.cores.dfsCore.present ? 'text-emerald-400' : 'text-amber-400'}`}>
                {audit.cores.dfsCore.present ? '👑 Completo' : '⚠️ Incompleto'}
              </span>
            </div>

            <div className="p-3 bg-[#0b0f17] border border-[#20293b] rounded-xl space-y-1">
              <span className="text-zinc-400 text-[11px] block">Inmunidad a Terremoto</span>
              <span className={`font-bold ${audit.cores.groundImmunity.present ? 'text-emerald-400' : 'text-red-400'}`}>
                {audit.cores.groundImmunity.present ? '🛡️ Cubierta' : '🚨 Vulnerable'}
              </span>
            </div>

            <div className="p-3 bg-[#0b0f17] border border-[#20293b] rounded-xl space-y-1">
              <span className="text-zinc-400 text-[11px] block">Control de Trampas</span>
              <span className={`font-bold ${
                audit.cores.hazardControl.hasSetter && audit.cores.hazardControl.hasRemoval 
                  ? 'text-emerald-400' 
                  : 'text-amber-400'
              }`}>
                {audit.cores.hazardControl.hasSetter && audit.cores.hazardControl.hasRemoval ? '✅ Total' : '⚠️ Parcial'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PESTAÑAS DE PROFUNDIZACIÓN TÁCTICA
          1. Núcleos y Matriz de Defensas
          2. Evaluación de Amenazas OU
          3. Movesets y Objetos Equipados
         ========================================================================= */}
      {team.length > 0 && (
        <div className="space-y-4">
          <div className="flex border-b border-[#20293b] bg-[#121722] rounded-2xl p-1.5 gap-1.5 text-xs">
            {[
              { id: 'synergy' as const, label: 'Núcleos & Matriz Defensiva', icon: Layers },
              { id: 'threats' as const, label: 'Evaluación de Amenazas OU', icon: Target },
              { id: 'movesets' as const, label: 'Estrategias & Movesets Óptimos', icon: Swords },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeAnalysisTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAnalysisTab(tab.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Sinergia, Núcleos y Matriz */}
          {activeAnalysisTab === 'synergy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
              {/* Tarjetas de Núcleos */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 bg-[#121722] border border-[#20293b] rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-500" />
                      Núcleo Fuego - Agua - Planta (FWG)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      audit.cores.fwgCore.present 
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40' 
                        : 'bg-amber-950/50 text-amber-300 border border-amber-800/40'
                    }`}>
                      {audit.cores.fwgCore.present ? 'Completo' : 'Incompleto'}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {audit.cores.fwgCore.status.replace(/✅|⚠️/g, '')}
                  </p>
                </div>

                <div className="p-4 bg-[#121722] border border-[#20293b] rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Núcleo Dragón - Hada - Acero (DFS)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      audit.cores.dfsCore.present 
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40' 
                        : 'bg-amber-950/50 text-amber-300 border border-amber-800/40'
                    }`}>
                      {audit.cores.dfsCore.present ? 'Completo' : 'Incompleto'}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {audit.cores.dfsCore.status.replace(/👑|⚠️/g, '')}
                  </p>
                </div>

                <div className="p-4 bg-[#121722] border border-[#20293b] rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      Inmunidad a Terremoto (Ground Immunity)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      audit.cores.groundImmunity.present 
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40' 
                        : 'bg-red-950/50 text-red-300 border border-red-800/40'
                    }`}>
                      {audit.cores.groundImmunity.present ? 'Cubierta' : 'Vulnerable'}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {audit.cores.groundImmunity.status.replace(/🛡️|🚨/g, '')}
                  </p>
                </div>

                <div className="p-4 bg-[#121722] border border-[#20293b] rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-rose-400" />
                      Control de Trampas (Hazard Control)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      audit.cores.hazardControl.hasSetter && audit.cores.hazardControl.hasRemoval
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40' 
                        : 'bg-amber-950/50 text-amber-300 border border-amber-800/40'
                    }`}>
                      {audit.cores.hazardControl.hasSetter && audit.cores.hazardControl.hasRemoval ? 'Total' : 'Parcial'}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {audit.cores.hazardControl.status.replace(/✅|⚠️/g, '')}
                  </p>
                </div>
              </div>

              {/* Matriz de Debilidades y Resistencias */}
              <div className="lg:col-span-6 bg-[#121722] border border-[#20293b] rounded-2xl p-4 space-y-3">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Matriz Defensiva Elemental (18 Tipos)
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Muestra cuántos integrantes de tu equipo son débiles a cada tipo de ataque:
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                  {ALL_TYPES.map(type => {
                    const count = audit.weaknesses[type] || 0;
                    const resists = audit.resistances[type] || 0;
                    const isCritical = count >= 2;

                    return (
                      <div 
                        key={type}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          isCritical 
                            ? 'bg-red-950/40 border-red-800/60 text-red-200' 
                            : count > 0 
                            ? 'bg-[#0b0f17] border-[#20293b] text-zinc-300' 
                            : 'bg-[#0b0f17]/40 border-[#20293b]/50 text-zinc-500'
                        }`}
                      >
                        <span className="text-[10px] text-zinc-400 font-semibold block">{type}</span>
                        <div className="mt-1 flex items-center justify-center gap-1 font-mono">
                          <span className={`text-xs font-bold ${isCritical ? 'text-red-400' : 'text-zinc-200'}`}>
                            {count} deb
                          </span>
                        </div>
                        {resists > 0 && (
                          <span className="text-[9px] text-emerald-400 block mt-0.5">
                            {resists} res
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {audit.teamAdvice.length > 0 && (
                  <div className="mt-3 p-3 bg-[#0b0f17] rounded-xl border border-[#20293b] space-y-1.5">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      Consejos del Motor Competitivo:
                    </span>
                    {audit.teamAdvice.map((adv, i) => (
                      <p key={i} className="text-[11px] text-zinc-300 leading-relaxed">
                        • {adv.replace(/\*\*/g, '')}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Evaluación de Amenazas OU */}
          {activeAnalysisTab === 'threats' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {audit.threatsEvaluation.map(item => (
                  <div 
                    key={item.threat.name}
                    className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                      item.isVulnerable 
                        ? 'bg-red-950/20 border-red-900/50' 
                        : 'bg-[#121722] border-[#20293b]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">
                            {item.threat.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                            Peligro {item.threat.threatLevel}
                          </span>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          item.isVulnerable 
                            ? 'bg-red-900/40 text-red-300 border border-red-800/50' 
                            : 'bg-emerald-900/40 text-emerald-300 border border-emerald-800/50'
                        }`}>
                          {item.isVulnerable ? '⚠️ Sin Counter' : '✅ Cubierto'}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed">
                        {item.threat.reason}
                      </p>

                      <div className="p-3 bg-[#0b0f17] rounded-xl border border-[#20293b] text-xs text-zinc-300 leading-relaxed">
                        {item.howToBeat.replace(/¡Peligro! /g, '')}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#20293b] text-[11px] text-zinc-400">
                      Counters más fiables: <strong className="text-zinc-200">{item.threat.bestCounters.join(', ')}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Movesets y Objetos Recomendados */}
          {activeAnalysisTab === 'movesets' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                {team.map((member) => (
                  <div key={member.id} className="bg-[#121722] border border-[#20293b] rounded-2xl p-4 space-y-3 shadow-md">
                    <div className="flex items-center justify-between border-b border-[#20293b] pb-3">
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={() => onOpenPokemon(member)}
                          className="w-12 h-12 rounded-xl bg-[#0b0f17] p-1 border border-[#20293b] flex items-center justify-center cursor-pointer hover:border-indigo-500/40 transition-colors"
                        >
                          <PokemonImage pokemon={member} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <h4 
                            onClick={() => onOpenPokemon(member)}
                            className="font-bold text-sm text-white hover:text-indigo-300 transition-colors cursor-pointer"
                          >
                            {member.name_es}
                          </h4>
                          <span className="text-[11px] text-indigo-400 font-medium">{member.pvp.rol}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {member.pvp.objeto_sprite && (
                          <div className="w-8 h-8 rounded-lg bg-[#0b0f17] p-1 border border-[#20293b] flex items-center justify-center shrink-0">
                            <img 
                              src={member.pvp.objeto_sprite} 
                              alt="" 
                              className="max-h-full max-w-full object-contain [image-rendering:pixelated]"
                              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <div className="text-right">
                          <span className="text-[10px] text-zinc-500 block">Objeto Óptimo</span>
                          <span className="font-bold text-xs text-zinc-200">
                            {member.pvp.objeto_recomendado.split('(')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {member.pvp.mejores_ataques.map((atk, i) => (
                        <div key={i} className="p-2.5 bg-[#0b0f17] rounded-xl border border-[#20293b] flex items-start gap-2.5">
                          <span className="font-mono text-indigo-400 text-xs font-bold w-4">{i + 1}.</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{atk.nombre}</span>
                              <span className="text-[10px] text-zinc-400 px-1.5 py-0.2 rounded bg-zinc-800">
                                {atk.categoria}
                              </span>
                            </div>
                            <p className="text-zinc-400 text-[11px] mt-0.5 leading-normal">{atk.razon}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
