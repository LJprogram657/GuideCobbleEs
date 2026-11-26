import React, { useState, useMemo } from 'react';
import { Pokemon, POKEMON_DATA } from '../data/pokemonData';
import { Compass, Wind, Gauge, MapPin } from 'lucide-react';
import { getTypeBadge, TYPE_STYLES } from '../utils/typeColors';
import { PokemonImage } from './PokemonImage';

interface MountsViewProps {
  onSelectPokemon: (pokemon: Pokemon) => void;
  onAddToTeam: (pokemon: Pokemon) => void;
}

export const MountsView: React.FC<MountsViewProps> = ({ onSelectPokemon }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'aerial' | 'land' | 'water'>('all');
  const [sortBy, setSortBy] = useState<'speed' | 'acceleration' | 'stamina'>('speed');

  const mountablePokemon = useMemo(() => {
    return POKEMON_DATA.filter(p => p.mount?.is_mountable);
  }, []);

  const filteredAndSortedMounts = useMemo(() => {
    let list = mountablePokemon.filter(p => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'aerial') return p.mount?.category === 'aerial' || p.mount?.category === 'hybrid';
      if (selectedCategory === 'land') return p.mount?.category === 'land' || p.mount?.category === 'hybrid';
      if (selectedCategory === 'water') return p.mount?.category === 'water';
      return true;
    });

    list.sort((a, b) => {
      const mA = a.mount!;
      const mB = b.mount!;
      if (sortBy === 'speed') return mB.speed_score - mA.speed_score;
      if (sortBy === 'acceleration') return mB.acceleration - mA.acceleration;
      if (sortBy === 'stamina') return mB.stamina - mA.stamina;
      return 0;
    });

    return list;
  }, [mountablePokemon, selectedCategory, sortBy]);

  const top1 = filteredAndSortedMounts[0];
  const top2 = filteredAndSortedMounts[1];
  const top3 = filteredAndSortedMounts[2];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#1a2333] via-[#141b27] to-[#0f141f] border border-[#2d3748] shadow-lg">
        <div className="relative z-10 space-y-1.5 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
            Mecánicas de Montura Cobblemon
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ranking de Monturas y Velocidades
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Descubre qué criaturas alcanzan la mayor velocidad punta en Minecraft. Filtra por vuelo, tierra o agua para elegir tu montura de exploración.
          </p>
        </div>
      </div>

      {/* Controles de filtro y orden */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#141a24] p-3 rounded-xl border border-[#263042]">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Todas las monturas' },
            { id: 'aerial', label: 'Aéreas (Vuelo)' },
            { id: 'land', label: 'Terrestres' },
            { id: 'water', label: 'Acuáticas' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white font-bold border-sky-500 shadow-sm'
                  : 'bg-[#0d1117] text-zinc-400 hover:text-zinc-200 border-[#263042]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
          <span className="text-zinc-400 font-medium">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0d1117] border border-[#2d3748] rounded-xl px-3 py-1.5 text-zinc-200 font-semibold focus:outline-none focus:border-sky-500"
          >
            <option value="speed">Velocidad Máxima</option>
            <option value="acceleration">Aceleración</option>
            <option value="stamina">Estamina</option>
          </select>
        </div>
      </div>

      {/* Podio Top 3 con Modelos de Cobblemon */}
      {filteredAndSortedMounts.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* #2 */}
          <div 
            onClick={() => onSelectPokemon(top2)}
            className="order-2 md:order-1 bg-[#131924] border border-[#242f42] rounded-2xl p-4 cursor-pointer hover:border-zinc-400 transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-zinc-400 font-bold px-2 py-0.5 bg-zinc-800 rounded">Puesto #2</span>
                <span className="text-zinc-400 font-medium">{top2.mount?.category_es}</span>
              </div>
              <div className="h-28 flex items-center justify-center my-2 bg-[#0b0f17]/50 rounded-xl p-2 border border-[#1e2638]">
                <PokemonImage 
                  pokemon={top2} 
                  className="max-h-full max-w-full object-contain filter drop-shadow-md" 
                />
              </div>
              <h3 className="text-base font-bold text-white text-center mt-1">{top2.name_es}</h3>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#20293b] text-center text-xs">
              <span className="text-zinc-400">Velocidad: </span>
              <span className="font-mono font-bold text-sky-400 text-sm">{top2.mount?.speed_score}/100</span>
            </div>
          </div>

          {/* #1 Destacado */}
          <div 
            onClick={() => onSelectPokemon(top1)}
            className="order-1 md:order-2 bg-[#172030] border-2 border-sky-500 rounded-2xl p-5 cursor-pointer hover:scale-[1.01] transition-all flex flex-col justify-between shadow-lg shadow-sky-950/40 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-slate-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
              Mayor Velocidad
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-sky-300 font-bold px-2 py-0.5 bg-sky-950 rounded border border-sky-800/60">Puesto #1</span>
                <span className="text-xs text-sky-400 font-bold">Tier {top1.mount?.tier}</span>
              </div>
              <div className="h-32 flex items-center justify-center my-2 bg-[#0b0f17]/70 rounded-xl p-2 border border-sky-800/40">
                <PokemonImage 
                  pokemon={top1} 
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(14,165,233,0.3)]" 
                />
              </div>
              <h3 className="text-lg font-extrabold text-white text-center mt-1">{top1.name_es}</h3>
              <p className="text-xs text-zinc-300 text-center">{top1.mount?.category_es}</p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-sky-900/60 text-center text-xs">
              <span className="text-zinc-400">Velocidad Máxima: </span>
              <span className="font-mono font-black text-sky-400 text-base">{top1.mount?.speed_score}/100</span>
            </div>
          </div>

          {/* #3 */}
          <div 
            onClick={() => onSelectPokemon(top3)}
            className="order-3 bg-[#131924] border border-[#242f42] rounded-2xl p-4 cursor-pointer hover:border-zinc-400 transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-zinc-400 font-bold px-2 py-0.5 bg-zinc-800 rounded">Puesto #3</span>
                <span className="text-zinc-400 font-medium">{top3.mount?.category_es}</span>
              </div>
              <div className="h-28 flex items-center justify-center my-2 bg-[#0b0f17]/50 rounded-xl p-2 border border-[#1e2638]">
                <PokemonImage 
                  pokemon={top3} 
                  className="max-h-full max-w-full object-contain filter drop-shadow-md" 
                />
              </div>
              <h3 className="text-base font-bold text-white text-center mt-1">{top3.name_es}</h3>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#20293b] text-center text-xs">
              <span className="text-zinc-400">Velocidad: </span>
              <span className="font-mono font-bold text-sky-400 text-sm">{top3.mount?.speed_score}/100</span>
            </div>
          </div>
        </div>
      )}

      {/* Tabla Comparativa con Modelos */}
      <div className="bg-[#141a24] border border-[#263042] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e131d] text-zinc-400 uppercase text-[10px] tracking-wider border-b border-[#263042]">
              <tr>
                <th className="py-3 px-3.5">#</th>
                <th className="py-3 px-3.5">Pokémon</th>
                <th className="py-3 px-3.5">Tipo</th>
                <th className="py-3 px-3.5 text-center">Tier</th>
                <th className="py-3 px-3.5">Velocidad</th>
                <th className="py-3 px-3.5 text-center">Acel.</th>
                <th className="py-3 px-3.5 text-center">Estamina</th>
                <th className="py-3 px-3.5 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20293b]">
              {filteredAndSortedMounts.map((pkmn, index) => {
                const m = pkmn.mount!;

                return (
                  <tr key={pkmn.id} className="hover:bg-[#1a2232] transition-colors">
                    <td className="py-3 px-3.5 font-mono text-zinc-400 font-bold">
                      {index + 1}
                    </td>

                    <td className="py-3 px-3.5">
                      <div 
                        onClick={() => onSelectPokemon(pkmn)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0b0f17] p-1 flex items-center justify-center shrink-0 border border-[#263042]">
                          <PokemonImage 
                            pokemon={pkmn} 
                            className="max-h-full max-w-full object-contain" 
                          />
                        </div>
                        <span className="font-bold text-white hover:text-sky-400 transition-colors">
                          {pkmn.name_es}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-zinc-300 font-medium">
                      {m.category_es}
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">
                        {m.tier}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 min-w-[150px]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sky-400 w-6 text-right font-bold">
                          {m.speed_score}
                        </span>
                        <div className="flex-1 h-2 bg-[#0b0f17] rounded-full overflow-hidden border border-[#263042]">
                          <div 
                            className="h-full rounded-full bg-sky-500"
                            style={{ width: `${m.speed_score}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-center font-mono text-emerald-400 font-bold">
                      {m.acceleration}
                    </td>

                    <td className="py-3 px-3.5 text-center font-mono text-amber-400 font-bold">
                      {m.stamina}
                    </td>

                    <td className="py-3 px-3.5 text-center">
                      <button
                        onClick={() => onSelectPokemon(pkmn)}
                        className="text-[11px] bg-[#0d121c] hover:bg-zinc-800 text-zinc-200 px-3 py-1.5 rounded-lg border border-[#2d3748] transition-colors font-medium"
                      >
                        Ver Spawns
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
