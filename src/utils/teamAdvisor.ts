import { Pokemon, POKEMON_DATA } from '../data/pokemonData';

// Tabla de efectividades simplificada
const TYPE_CHART: Record<string, Record<string, number>> = {
  "Normal": { "Lucha": 2, "Fantasma": 0 },
  "Fuego": { "Agua": 2, "Tierra": 2, "Roca": 2, "Fuego": 0.5, "Planta": 0.5, "Hielo": 0.5, "Bicho": 0.5, "Acero": 0.5, "Hada": 0.5 },
  "Agua": { "Eléctrico": 2, "Planta": 2, "Fuego": 0.5, "Agua": 0.5, "Hielo": 0.5, "Acero": 0.5 },
  "Planta": { "Fuego": 2, "Hielo": 2, "Veneno": 2, "Volador": 2, "Bicho": 2, "Agua": 0.5, "Planta": 0.5, "Eléctrico": 0.5, "Tierra": 0.5 },
  "Eléctrico": { "Tierra": 2, "Eléctrico": 0.5, "Volador": 0.5, "Acero": 0.5 },
  "Hielo": { "Fuego": 2, "Lucha": 2, "Roca": 2, "Acero": 2, "Hielo": 0.5 },
  "Lucha": { "Volador": 2, "Psíquico": 2, "Hada": 2, "Bicho": 0.5, "Roca": 0.5, "Siniestro": 0.5 },
  "Veneno": { "Tierra": 2, "Psíquico": 2, "Planta": 0.5, "Lucha": 0.5, "Veneno": 0.5, "Bicho": 0.5, "Hada": 0.5 },
  "Tierra": { "Agua": 2, "Planta": 2, "Hielo": 2, "Eléctrico": 0, "Veneno": 0.5, "Roca": 0.5 },
  "Volador": { "Eléctrico": 2, "Hielo": 2, "Roca": 2, "Tierra": 0, "Planta": 0.5, "Lucha": 0.5, "Bicho": 0.5 },
  "Psíquico": { "Bicho": 2, "Fantasma": 2, "Siniestro": 2, "Lucha": 0.5, "Psíquico": 0.5 },
  "Bicho": { "Fuego": 2, "Volador": 2, "Roca": 2, "Planta": 0.5, "Lucha": 0.5, "Tierra": 0.5 },
  "Roca": { "Agua": 2, "Planta": 2, "Lucha": 2, "Tierra": 2, "Acero": 2, "Normal": 0.5, "Fuego": 0.5, "Veneno": 0.5, "Volador": 0.5 },
  "Fantasma": { "Fantasma": 2, "Siniestro": 2, "Normal": 0, "Lucha": 0, "Veneno": 0.5, "Bicho": 0.5 },
  "Dragón": { "Hielo": 2, "Dragón": 2, "Hada": 2, "Fuego": 0.5, "Agua": 0.5, "Planta": 0.5, "Eléctrico": 0.5 },
  "Acero": { "Fuego": 2, "Lucha": 2, "Tierra": 2, "Veneno": 0, "Normal": 0.5, "Planta": 0.5, "Hielo": 0.5, "Volador": 0.5, "Psíquico": 0.5, "Bicho": 0.5, "Roca": 0.5, "Dragón": 0.5, "Acero": 0.5, "Hada": 0.5 },
  "Siniestro": { "Lucha": 2, "Bicho": 2, "Hada": 2, "Psíquico": 0, "Fantasma": 0.5, "Siniestro": 0.5 },
  "Hada": { "Veneno": 2, "Acero": 2, "Dragón": 0, "Lucha": 0.5, "Bicho": 0.5, "Siniestro": 0.5 }
};

export const ALL_TYPES = [
  "Normal", "Fuego", "Agua", "Planta", "Eléctrico", "Hielo",
  "Lucha", "Veneno", "Tierra", "Volador", "Psíquico", "Bicho",
  "Roca", "Fantasma", "Dragón", "Acero", "Siniestro", "Hada"
];

export interface TeamAnalysis {
  weaknesses: Record<string, number>;
  resistances: Record<string, number>;
  immunities: Record<string, number>;
  criticalWeaknesses: string[];
  avgSpeed: number;
  avgHp: number;
  rolesPresent: string[];
  aiAdvice: string[];
  suggestedTeammate?: {
    pokemon: Pokemon;
    reason_es: string;
  };
}

export function analyzeTeam(team: Pokemon[]): TeamAnalysis {
  if (team.length === 0) {
    return {
      weaknesses: {},
      resistances: {},
      immunities: {},
      criticalWeaknesses: [],
      avgSpeed: 0,
      avgHp: 0,
      rolesPresent: [],
      aiAdvice: ["Añade al menos un Pokémon a tu equipo para que la IA pueda analizar sinergias."]
    };
  }

  const weaknesses: Record<string, number> = {};
  const resistances: Record<string, number> = {};
  const immunities: Record<string, number> = {};

  ALL_TYPES.forEach(t => {
    weaknesses[t] = 0;
    resistances[t] = 0;
    immunities[t] = 0;
  });

  team.forEach(pkmn => {
    ALL_TYPES.forEach(attackType => {
      let multiplier = 1;
      pkmn.types.forEach(defType => {
        const typeDef = TYPE_CHART[defType];
        if (typeDef && typeDef[attackType] !== undefined) {
          multiplier *= typeDef[attackType];
        }
      });

      if (multiplier === 0) {
        immunities[attackType] = (immunities[attackType] || 0) + 1;
      } else if (multiplier > 1) {
        weaknesses[attackType] = (weaknesses[attackType] || 0) + 1;
      } else if (multiplier < 1) {
        resistances[attackType] = (resistances[attackType] || 0) + 1;
      }
    });
  });

  const criticalWeaknesses = Object.keys(weaknesses).filter(t => weaknesses[t] >= 2);
  const avgSpeed = Math.round(team.reduce((acc, p) => acc + p.base_stats.speed, 0) / team.length);
  const avgHp = Math.round(team.reduce((acc, p) => acc + p.base_stats.hp, 0) / team.length);

  const rolesPresent = team.map(p => p.pvp.rol);
  const aiAdvice: string[] = [];

  // Consejos inteligentes de la IA
  if (criticalWeaknesses.length > 0) {
    aiAdvice.push(
      `🚨 **Vulnerabilidad Compartida:** Tienes ${criticalWeaknesses.length} tipos críticos a los que 2 o más Pokémon son débiles: **${criticalWeaknesses.join(', ')}**. Un atacante rival con cobertura en estos tipos podría causarte estragos.`
    );
  } else {
    aiAdvice.push(`🛡️ **Excelente Cobertura Defensiva:** Tu equipo no tiene debilidades compartidas alarmantes.`);
  }

  // Comprobar si tienen control de trampas (Stealth Rock)
  const hasHazards = team.some(p => p.pvp.mejores_ataques.some(m => m.nombre_en.includes('Stealth Rock') || m.nombre.includes('Trampa Rocas')));
  if (!hasHazards) {
    aiAdvice.push(`🪨 **Falta Hazard Setter:** Ningún Pokémon tiene *Trampa Rocas (Stealth Rock)*. En Cobblemon competitivo, romper las bandas focus y desgastar aves como Charizard con trampas da una ventaja gigante.`);
  }

  // Comprobar velocidad
  if (avgSpeed < 80) {
    aiAdvice.push(`🐢 **Equipo Lento:** La velocidad media de tu equipo es baja (${avgSpeed}). Podrías considerar un *Revenge Killer* veloz con Pañuelo Elección (Choice Scarf) o un atacante con prioridad como Dragapult o Dragonite.`);
  } else if (avgSpeed > 105) {
    aiAdvice.push(`⚡ **Hyper Offense:** Tu equipo es muy veloz (${avgSpeed} de velocidad media). Ideal para un estilo agresivo y barrer partidas.`);
  }

  // Encontrar el mejor compañero de equipo (IA Suggestion)
  let suggestedTeammate: { pokemon: Pokemon; reason_es: string } | undefined;

  if (team.length < 6) {
    const candidates = POKEMON_DATA.filter(p => !team.some(member => member.id === p.id));
    
    // Evaluar cada candidato para ver cuál mitiga más debilidades críticas
    let bestScore = -999;
    let bestCandidate: Pokemon | null = null;
    let candidateReason = "";

    candidates.forEach(cand => {
      let score = 0;
      let reasons: string[] = [];

      // Si resiste debilidades críticas
      criticalWeaknesses.forEach(critType => {
        cand.types.forEach(t => {
          const typeDef = TYPE_CHART[t];
          if (typeDef && typeDef[critType] !== undefined) {
            if (typeDef[critType] < 1) {
              score += 3;
              reasons.push(`resiste ataques de tipo ${critType}`);
            } else if (typeDef[critType] === 0) {
              score += 5;
              reasons.push(`es totalmente inmune a ${critType}`);
            }
          }
        });
      });

      // Si aporta rol útil
      if (!hasHazards && cand.pvp.mejores_ataques.some(m => m.nombre_en.includes('Stealth Rock') || m.nombre.includes('Trampa Rocas'))) {
        score += 4;
        reasons.push("aporta Trampa Rocas para desgastar al rival");
      }

      // Si es montura y el equipo no tiene monturas
      const hasMount = team.some(p => p.mount?.is_mountable);
      if (!hasMount && cand.mount?.is_mountable) {
        score += 2;
        reasons.push(`sirve como montura ${cand.mount.category_es} veloz`);
      }

      if (score > bestScore) {
        bestScore = score;
        bestCandidate = cand;
        candidateReason = reasons.length > 0 
          ? `La IA recomienda a **${cand.name_es}** porque ${reasons.slice(0, 3).join(', ')} y equilibra las estadísticas del grupo.`
          : `Añade a **${cand.name_es}** para ofrecer variedad de tipos y potencia ofensiva.`;
      }
    });

    if (bestCandidate) {
      suggestedTeammate = {
        pokemon: bestCandidate,
        reason_es: candidateReason
      };
    }
  }

  return {
    weaknesses,
    resistances,
    immunities,
    criticalWeaknesses,
    avgSpeed,
    avgHp,
    rolesPresent,
    aiAdvice,
    suggestedTeammate
  };
}
