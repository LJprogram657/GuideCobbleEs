import { Pokemon, POKEMON_DATA } from '../data/pokemonData';

// Tabla de efectividades de tipos
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

// Mayores amenazas del meta actual de Cobblemon / Smogon OU
export interface MetaThreat {
  name: string;
  types: string[];
  threatLevel: 'Extrema' | 'Alta' | 'Moderada';
  reason: string;
  bestCounters: string[];
  effectiveCheckTypes: string[];
}

export interface StrategicSuggestion {
  pokemon: Pokemon;
  category: 'Núcleo' | 'Inmunidad & Control' | 'Counter de Amenaza' | 'Rematador Ofensivo' | 'Gema Oculta' | 'Muro & Soporte';
  title: string;
  reason_es: string;
  synergyScore: number;
  highlightBadge: string;
  partnerName?: string;
  partnerSynergy?: string;
  keyTrait?: string;
  generationTag?: string;
}

// 6 Pilares competitivos recomendados para abrir equipo
export interface StartingAnchor {
  id: number;
  slug: string;
  name: string;
  name_es: string;
  role: string;
  types: string[];
  whyGoodLead: string;
  item: string;
  item_sprite?: string;
}

export const STARTING_ANCHORS: StartingAnchor[] = [
  {
    id: 445,
    slug: 'garchomp',
    name: 'Garchomp',
    name_es: 'Garchomp',
    role: 'Atacante Físico / Hazard Setter',
    types: ['Dragón', 'Tierra'],
    whyGoodLead: 'Pilar ofensivo absoluto. Presiona con Terremoto con STAB, coloca Trampa Rocas de inicio y castiga el daño de contacto con Piel Tosca y Casco Dentado.',
    item: 'Casco Dentado (Rocky Helmet)',
    item_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rocky-helmet.png'
  },
  {
    id: 823,
    slug: 'corviknight',
    name: 'Corviknight',
    name_es: 'Corviknight',
    role: 'Muro Físico / Pivot Defensivo',
    types: ['Volador', 'Acero'],
    whyGoodLead: 'La mejor muralla defensiva del meta. Es 100% inmune a Tierra (Terremoto) y Veneno, limpia trampas con Despejar y pivota a salvo con Ida y Vuelta.',
    item: 'Restos (Leftovers)',
    item_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leftovers.png'
  },
  {
    id: 887,
    slug: 'dragapult',
    name: 'Dragapult',
    name_es: 'Dragapult',
    role: 'Fast Cleaner / Pivot Mixto',
    types: ['Dragón', 'Fantasma'],
    whyGoodLead: 'El Pokémon no legendario más veloz (142 Vel). Supera prácticamente a todo el metagame, rompe sustitutos con Flechas Gemelas y genera impulso con Ida y Vuelta.',
    item: 'Cinta Elección (Choice Band)',
    item_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png'
  },
  {
    id: 36,
    slug: 'clefable',
    name: 'Clefable',
    name_es: 'Clefable',
    role: 'Soporte Táctico / Muro Mágico',
    types: ['Hada'],
    whyGoodLead: 'Muro imprescindible de tipo Hada que anula a atacantes Dragón y Lucha. Su habilidad Muro Mágico lo vuelve inmune al daño de veneno, quemadura y trampas.',
    item: 'Vidasfera (Life Orb)',
    item_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/life-orb.png'
  },
  {
    id: 637,
    slug: 'volcarona',
    name: 'Volcarona',
    name_es: 'Volcarona',
    role: 'Setup Sweeper Especial',
    types: ['Bicho', 'Fuego'],
    whyGoodLead: 'Una sola Danza Aleteo duplica su ataque especial, defensa especial y velocidad. Capaz de barrer al rival por completo con Danza Llama y Zumbido.',
    item: 'Botas Gruesas (Heavy-Duty Boots)',
    item_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heavy-duty-boots.png'
  },
  {
    id: 748,
    slug: 'toxapex',
    name: 'Toxapex',
    name_es: 'Toxapex',
    role: 'Muro Mixto / Tóxico & Desgaste',
    types: ['Veneno', 'Agua'],
    whyGoodLead: 'Defensas descomunales combinadas con la habilidad Regeneración, que recupera 1/3 de su vida al salir del campo. Neutraliza sweepers físicos y especiales.',
    item: 'Lodo Negro (Black Sludge)',
    item_sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/black-sludge.png'
  }
];

export const META_THREATS: MetaThreat[] = [
  {
    name: "Garchomp / Great Tusk",
    types: ["Dragón", "Tierra"],
    threatLevel: "Extrema",
    reason: "Terremoto con STAB y Danza Espada pulveriza equipos sin inmunidad a Tierra ni muros físicos.",
    bestCounters: ["Corviknight", "Dondozo", "Toxapex", "Gliscor", "Skarmory"],
    effectiveCheckTypes: ["Hielo", "Hada", "Agua"]
  },
  {
    name: "Dragapult",
    types: ["Dragón", "Fantasma"],
    threatLevel: "Extrema",
    reason: "Su colosal velocidad (142) y cobertura mixta con Cinta/Gafas Elección barre equipos frágiles.",
    bestCounters: ["Kingambit", "Ting-Lu", "Clodsire", "Grimmsnarl", "Clefable"],
    effectiveCheckTypes: ["Hada", "Hielo", "Siniestro"]
  },
  {
    name: "Dragonite",
    types: ["Dragón", "Volador"],
    threatLevel: "Alta",
    reason: "Habilidad Compensación (Multiscale) le permite aguantar cualquier golpe, meter Danza Dragón y rematar con Velocidad Extrema.",
    bestCounters: ["Dondozo (Ignorante)", "Cloyster", "Corviknight", "Toxapex"],
    effectiveCheckTypes: ["Hielo (x4)", "Roca", "Hada"]
  },
  {
    name: "Gholdengo",
    types: ["Acero", "Fantasma"],
    threatLevel: "Alta",
    reason: "Su habilidad 'Cuerpo Áureo' lo hace inmune a movimientos de estado y bloquea Despejar (Defog), atrapando tus trampas.",
    bestCounters: ["Ting-Lu", "Chi-Yu", "Clodsire", "Kingambit", "Great Tusk"],
    effectiveCheckTypes: ["Fuego", "Tierra", "Fantasma", "Siniestro"]
  },
  {
    name: "Kingambit",
    types: ["Siniestro", "Acero"],
    threatLevel: "Extrema",
    reason: "En juego tardío activa 'General Supremo' sumando hasta +50% de ataque por aliados caídos, y remata con Golpe Bajo (Sucker Punch).",
    bestCounters: ["Great Tusk", "Iron Valiant", "Dondozo", "Corviknight", "Zamazenta"],
    effectiveCheckTypes: ["Lucha (x4)", "Fuego", "Tierra"]
  },
  {
    name: "Kyogre (Equipos de Lluvia)",
    types: ["Agua"],
    threatLevel: "Extrema",
    reason: "Llovizna + Salpicar (Water Spout) con Pañuelo Elección destruye casi cualquier Pokémon que no sea inmune a Agua.",
    bestCounters: ["Clodsire (Absorbe Agua)", "Gastrodon", "Blissey", "Ferrothorn"],
    effectiveCheckTypes: ["Planta", "Eléctrico", "Agua (Absorbe Agua)"]
  }
];

export interface CoreAnalysis {
  fwgCore: { present: boolean; missing: string[]; status: string };
  dfsCore: { present: boolean; missing: string[]; status: string };
  groundImmunity: { present: boolean; status: string };
  hazardControl: { hasSetter: boolean; hasRemoval: boolean; status: string };
}

export interface DetailedTeamAudit {
  weaknesses: Record<string, number>;
  resistances: Record<string, number>;
  immunities: Record<string, number>;
  criticalWeaknesses: string[];
  cores: CoreAnalysis;
  threatsEvaluation: Array<{
    threat: MetaThreat;
    isVulnerable: boolean;
    howToBeat: string;
    teamAnswers: string[];
  }>;
  suggestedTeammate?: {
    pokemon: Pokemon;
    strategicRole: string;
    synergyScore: number;
    reason_es: string;
  };
  suggestions: StrategicSuggestion[];
  teamAdvice: string[];
}

// Conjunto curado de Pokémon destacados, gemas ocultas y alternativas anti-meta a lo largo de las 9 generaciones
export const DIVERSE_GEMS_NAMES = new Set([
  "Garganacl", "Tinkaton", "Ceruledge", "Armarouge", "Clodsire", "Skeledirge", 
  "Meowscarada", "Baxcalibur", "Dondozo", "Breloom", "Excadrill", "Rotom", 
  "Gliscor", "Scizor", "Ferrothorn", "Grimmsnarl", "Hatterene", "Hippowdon", 
  "Mimikyu", "Ursaluna", "Annihilape", "Gholdengo", "Pawmot", "Chandelure", 
  "Weavile", "Mamoswine", "Staraptor", "Galvantula", "Hawlucha", "Araquanid", 
  "Centiskorch", "Gastrodon", "Torkoal", "Slowbro", "Skarmory", "Milotic", 
  "Flygon", "Zapdos", "Kingambit", "Kommo-o", "Togekiss", "Magnezone", "Crobat",
  "Nidoking", "Cloyster", "Heracross", "Blissey", "Swampert", "Ludicolo",
  "Electivire", "Froslass", "Krookodile", "Mienshao", "Reuniclus", "Mandibuzz",
  "Aegislash", "Noivern", "Vikavolt", "Ribombee", "Mudsdale", "Salazzle", "Bewear",
  "Corviknight", "Orbeetle", "Drednaw", "Coalossal", "Sirfetch'd", "Runerigus",
  "Obstagoon", "Copperajah", "Gengar", "Alakazam", "Lucario", "Tyranitar",
  "Salamence", "Dragonite", "Volcarona", "Toxapex", "Clefable", "Rotom-Wash",
  "Rotom-Heat", "Great Tusk", "Iron Valiant", "Iron Bundle", "Roaring Moon"
]);

export interface SuggestionOptions {
  filterTab?: 'all' | 'gems' | 'defensive' | 'offensive' | 'type';
  rotationSeed?: number;
  selectedType?: string;
}

// Evalúa la sinergia bilateral precisa entre un candidato y el equipo actual
export function evaluateCandidateSynergy(
  cand: Pokemon,
  team: Pokemon[],
  context: {
    criticalWeaknesses: string[];
    weaknesses: Record<string, number>;
    hasGroundImmunity: boolean;
    hasHazardRemoval: boolean;
    fwgMissing: string[];
    dfsMissing: string[];
    threatsEvaluation: Array<{ threat: MetaThreat; isVulnerable: boolean }>;
  }
) {
  let score = 50; // Base score
  let bestPartner: Pokemon | null = null;
  let bestPartnerScore = -1;
  let partnerWeaknessCovered = "";
  let partnerCoversCand = "";
  let keyTrait = "";

  // 1. Análisis de Sinergia Bilateral Teammate por Teammate
  team.forEach(teammate => {
    let pairScore = 0;
    let coveredTypes: string[] = [];
    let reciprocals: string[] = [];

    // Qué debilidades de teammate cubre el candidato
    ALL_TYPES.forEach(t => {
      let teamMult = 1;
      teammate.types.forEach(defT => {
        const row = TYPE_CHART[defT];
        if (row && row[t] !== undefined) teamMult *= row[t];
      });

      if (teamMult >= 2) {
        // teammate es débil a t. ¿cand lo resiste o es inmune?
        let candMult = 1;
        cand.types.forEach(defT => {
          const row = TYPE_CHART[defT];
          if (row && row[t] !== undefined) candMult *= row[t];
        });

        // Caso especial levitación contra Tierra
        if (t === "Tierra" && cand.abilities.some(a => a.name.toLowerCase().includes("levitate") || a.name.toLowerCase().includes("levitaci"))) {
          candMult = 0;
        }

        if (candMult === 0) {
          pairScore += teamMult >= 4 ? 28 : 16;
          coveredTypes.push(`inmunidad total a ${t}`);
        } else if (candMult < 1) {
          pairScore += teamMult >= 4 ? 20 : 10;
          coveredTypes.push(`resistencia a ${t}`);
        }
      }
    });

    // Qué debilidades del candidato cubre teammate (reciprocidad)
    ALL_TYPES.forEach(t => {
      let candMult = 1;
      cand.types.forEach(defT => {
        const row = TYPE_CHART[defT];
        if (row && row[t] !== undefined) candMult *= row[t];
      });

      if (candMult >= 2) {
        let teamMult = 1;
        teammate.types.forEach(defT => {
          const row = TYPE_CHART[defT];
          if (row && row[t] !== undefined) teamMult *= row[t];
        });
        if (t === "Tierra" && (teammate.types.includes("Volador") || teammate.abilities.some(a => a.name.toLowerCase().includes("levitate")))) {
          teamMult = 0;
        }

        if (teamMult === 0) {
          pairScore += 12;
          reciprocals.push(`inmunidad a ${t}`);
        } else if (teamMult < 1) {
          pairScore += 8;
          reciprocals.push(`resiste ${t}`);
        }
      }
    });

    if (pairScore > bestPartnerScore) {
      bestPartnerScore = pairScore;
      bestPartner = teammate;
      partnerWeaknessCovered = coveredTypes.slice(0, 2).join(' y ');
      partnerCoversCand = reciprocals.slice(0, 2).join(' y ');
    }
  });

  score += Math.min(35, bestPartnerScore);

  // 2. Cobertura de debilidades críticas compartidas del equipo
  context.criticalWeaknesses.forEach(crit => {
    let candMult = 1;
    cand.types.forEach(defT => {
      const row = TYPE_CHART[defT];
      if (row && row[crit] !== undefined) candMult *= row[crit];
    });

    if (crit === "Tierra" && cand.abilities.some(a => a.name.toLowerCase().includes("levitate"))) candMult = 0;

    if (candMult === 0) score += 15;
    else if (candMult < 1) score += 9;
    else if (candMult >= 2) score -= 12; // Penalizar si comparte la misma debilidad crítica
  });

  // 3. Aportes esenciales al equipo
  // Inmunidad a Tierra
  const isGroundImmune = cand.types.includes("Volador") || cand.abilities.some(a => a.name.toLowerCase().includes("levitate") || a.name.toLowerCase().includes("levitaci"));
  if (!context.hasGroundImmunity && isGroundImmune) {
    score += 26;
    keyTrait = "Inmunidad vital a Terremoto";
  }

  // Cierre de núcleos
  if (context.dfsMissing.length === 1 && cand.types.includes(context.dfsMissing[0])) {
    score += 24;
    keyTrait = `Sella el Núcleo DFS aportando ${context.dfsMissing[0]}`;
  } else if (context.fwgMissing.length === 1 && cand.types.includes(context.fwgMissing[0])) {
    score += 20;
    keyTrait = `Sella el Núcleo FWG aportando ${context.fwgMissing[0]}`;
  }

  // Control de trampas
  const hasRemovalMove = cand.pvp.mejores_ataques.some(m => m.nombre_en.includes("Defog") || m.nombre_en.includes("Rapid Spin") || m.nombre.includes("Despejar") || m.nombre.includes("Giro Rápido"));
  if (!context.hasHazardRemoval && hasRemovalMove) {
    score += 18;
    if (!keyTrait) keyTrait = "Control y Despeje de Trampas";
  }

  // Counter de amenazas OU sin cubrir
  context.threatsEvaluation.filter(th => th.isVulnerable).forEach(th => {
    if (th.threat.bestCounters.some(c => c.toLowerCase().includes(cand.name.toLowerCase()) || cand.name.toLowerCase().includes(c.toLowerCase())) ||
        th.threat.effectiveCheckTypes.some(t => cand.types.includes(t))) {
      score += 16;
      if (!keyTrait) keyTrait = `Counter directo de ${th.threat.name}`;
    }
  });

  // Habilidades de alto impacto
  if (cand.abilities.some(a => a.name.toLowerCase().includes("regenerator") || a.name.toLowerCase().includes("regeneraci"))) {
    score += 10;
    if (!keyTrait) keyTrait = "Habilidad Regeneración (33% PS al salir)";
  } else if (cand.abilities.some(a => a.name.toLowerCase().includes("unaware") || a.name.toLowerCase().includes("ignorante"))) {
    score += 10;
    if (!keyTrait) keyTrait = "Habilidad Ignorante (frena setup rival)";
  } else if (cand.abilities.some(a => a.name.toLowerCase().includes("magic guard") || a.name.toLowerCase().includes("muro m"))) {
    score += 10;
    if (!keyTrait) keyTrait = "Habilidad Muro Mágico (inmune a trampas y veneno)";
  }

  // Normalizar score entre 65 y 99
  const normalizedScore = Math.min(99, Math.max(68, Math.round(score)));

  return {
    score: normalizedScore,
    bestPartner,
    partnerWeaknessCovered,
    partnerCoversCand,
    keyTrait
  };
}

// Genera recomendaciones detalladas con soporte de filtros y rotación (para evitar que siempre salgan los mismos)
export function getSynergySuggestions(
  team: Pokemon[],
  options?: SuggestionOptions
): StrategicSuggestion[] {
  if (team.length === 0 || team.length >= 6) return [];

  const filterTab = options?.filterTab || 'all';
  const rotationSeed = options?.rotationSeed || 0;
  const selectedType = options?.selectedType;

  // Cálculos base del equipo
  const allTeamTypes = new Set<string>();
  let hasGroundImmunity = false;
  let hasHazardRemoval = false;
  const weaknesses: Record<string, number> = {};
  ALL_TYPES.forEach(t => { weaknesses[t] = 0; });

  team.forEach(p => {
    p.types.forEach(t => allTeamTypes.add(t));
    if (p.types.includes("Volador") || p.abilities.some(a => a.name.toLowerCase().includes("levitate") || a.name.toLowerCase().includes("levitaci"))) {
      hasGroundImmunity = true;
    }
    if (p.pvp.mejores_ataques.some(m => m.nombre_en.includes("Defog") || m.nombre.includes("Despejar") || m.nombre_en.includes("Rapid Spin") || m.nombre.includes("Giro Rápido")) || p.pvp.objeto_recomendado.includes("Heavy-Duty Boots")) {
      hasHazardRemoval = true;
    }

    ALL_TYPES.forEach(atkType => {
      let mult = 1;
      p.types.forEach(defType => {
        const typeDef = TYPE_CHART[defType];
        if (typeDef && typeDef[atkType] !== undefined) mult *= typeDef[atkType];
      });
      if (mult > 1) weaknesses[atkType]++;
    });
  });

  const criticalWeaknesses = Object.keys(weaknesses).filter(t => weaknesses[t] >= 2);

  const fwgMissing: string[] = [];
  if (!allTeamTypes.has("Fuego")) fwgMissing.push("Fuego");
  if (!allTeamTypes.has("Agua")) fwgMissing.push("Agua");
  if (!allTeamTypes.has("Planta")) fwgMissing.push("Planta");

  const dfsMissing: string[] = [];
  if (!allTeamTypes.has("Dragón")) dfsMissing.push("Dragón");
  if (!allTeamTypes.has("Hada")) dfsMissing.push("Hada");
  if (!allTeamTypes.has("Acero")) dfsMissing.push("Acero");

  const threatsEvaluation = META_THREATS.map(threat => {
    const answers = team.filter(member => 
      threat.effectiveCheckTypes.some(t => member.types.includes(t)) ||
      threat.bestCounters.some(c => c.toLowerCase().includes(member.name.toLowerCase()))
    );
    return { threat, isVulnerable: answers.length === 0 };
  });

  const context = {
    criticalWeaknesses,
    weaknesses,
    hasGroundImmunity,
    hasHazardRemoval,
    fwgMissing,
    dfsMissing,
    threatsEvaluation
  };

  // Filtrar candidatos viables (BST >= 460 o gemas competitivas) y que no estén en el equipo
  const teamIds = new Set(team.map(m => m.id));
  const viableCandidates = POKEMON_DATA.filter(p => {
    if (teamIds.has(p.id)) return false;
    const isViableBst = p.base_stats.total >= 460;
    const isSpecialGems = DIVERSE_GEMS_NAMES.has(p.name) || p.name === 'Chansey' || p.name === 'Clodsire' || p.name === 'Quagsire' || p.name === 'Rotom';
    return isViableBst || isSpecialGems;
  });

  // Evaluar cada candidato
  const scoredList = viableCandidates.map(cand => {
    const evaluation = evaluateCandidateSynergy(cand, team, context);
    return {
      cand,
      ...evaluation
    };
  });

  // Aplicar filtro según la pestaña activa
  let filtered = scoredList;

  if (filterTab === 'gems') {
    filtered = scoredList.filter(item => 
      DIVERSE_GEMS_NAMES.has(item.cand.name) || (item.cand.generation >= 4 && item.cand.base_stats.total >= 470)
    );
  } else if (filterTab === 'defensive') {
    filtered = scoredList.filter(item => 
      item.cand.pvp.rol.toLowerCase().includes('muro') || 
      item.cand.pvp.rol.toLowerCase().includes('tanque') || 
      item.cand.pvp.rol.toLowerCase().includes('soporte') || 
      item.cand.pvp.rol.toLowerCase().includes('defensivo') ||
      item.cand.base_stats.defense >= 100 || 
      item.cand.base_stats.sp_defense >= 100
    );
  } else if (filterTab === 'offensive') {
    filtered = scoredList.filter(item => 
      item.cand.pvp.rol.toLowerCase().includes('sweeper') || 
      item.cand.pvp.rol.toLowerCase().includes('atacante') || 
      item.cand.pvp.rol.toLowerCase().includes('wallbreaker') || 
      item.cand.pvp.rol.toLowerCase().includes('cleaner') ||
      item.cand.base_stats.attack >= 110 || 
      item.cand.base_stats.sp_attack >= 110 ||
      item.cand.base_stats.speed >= 105
    );
  } else if (filterTab === 'type' && selectedType) {
    filtered = scoredList.filter(item => item.cand.types.includes(selectedType));
  }

  // Ordenar por score de sinergia descendente
  filtered.sort((a, b) => b.score - a.score);

  // Pool de los mejores candidatos (hasta 24 opciones viables)
  const topPool = filtered.slice(0, 24);
  if (topPool.length === 0) return [];

  // Rotación mediante rotationSeed para mostrar diferentes Pokémon cada vez que baraja
  const count = 4;
  const startIndex = (rotationSeed * count) % Math.max(1, topPool.length);
  const selectedCandidates: typeof topPool = [];

  for (let i = 0; i < count; i++) {
    const idx = (startIndex + i) % topPool.length;
    const item = topPool[idx];
    if (item && !selectedCandidates.some(s => s.cand.id === item.cand.id)) {
      selectedCandidates.push(item);
    }
  }

  // Generar explicaciones detalladas y sin ambigüedades
  return selectedCandidates.map(item => {
    const cand = item.cand;
    const partner = item.bestPartner;

    // Determinar categoría y badge específico
    let category: StrategicSuggestion['category'] = 'Núcleo';
    let highlightBadge = 'Sinergia';
    let title = `${cand.name_es} como ${cand.pvp.rol}`;

    const isImmune = cand.types.includes("Volador") || cand.abilities.some(a => a.name.toLowerCase().includes("levitate"));
    const isCoreDfs = dfsMissing.length === 1 && cand.types.includes(dfsMissing[0]);
    const isCoreFwg = fwgMissing.length === 1 && cand.types.includes(fwgMissing[0]);
    const isGem = DIVERSE_GEMS_NAMES.has(cand.name);

    if (isCoreDfs) {
      category = 'Núcleo';
      highlightBadge = '👑 Sella Núcleo DFS';
      title = `Completa Dragón-Hada-Acero`;
    } else if (isCoreFwg) {
      category = 'Núcleo';
      highlightBadge = '🔥 Sella Núcleo FWG';
      title = `Completa Fuego-Agua-Planta`;
    } else if (!hasGroundImmunity && isImmune) {
      category = 'Inmunidad & Control';
      highlightBadge = '🛡️ Inmune a Terremoto';
      title = `Inmunidad Terrestre Clave`;
    } else if (isGem) {
      category = 'Gema Oculta';
      highlightBadge = '💎 Gema Anti-Meta';
      title = `Opción Táctica Especial`;
    } else if (cand.pvp.rol.toLowerCase().includes('sweeper') || cand.pvp.rol.toLowerCase().includes('atacante')) {
      category = 'Rematador Ofensivo';
      highlightBadge = '⚔️ Potencia Ofensiva';
      title = `Presión de Ataque & Cobertura`;
    } else {
      category = 'Muro & Soporte';
      highlightBadge = '🧱 Muralla Defensiva';
      title = `Resistencia & Control de Campo`;
    }

    // Construcción del texto de sinergia hiper-específico (sin ambigüedad)
    const sentences: string[] = [];

    if (partner) {
      if (item.partnerWeaknessCovered) {
        sentences.push(`Cubre a tu **${partner.name_es}** aportando ${item.partnerWeaknessCovered} ante sus debilidades principales.`);
      }
      if (item.partnerCoversCand) {
        sentences.push(`A cambio, tu **${partner.name_es}** le protege con ${item.partnerCoversCand}, formando un pivote bilateral seguro.`);
      }
    }

    if (item.keyTrait) {
      sentences.push(item.keyTrait + '.');
    }

    // Mención a sus movimientos clave
    const keyAtk = cand.pvp.mejores_ataques[0];
    if (keyAtk && !sentences.some(s => s.includes(keyAtk.nombre))) {
      sentences.push(`Ejecuta **${keyAtk.nombre}** (${keyAtk.tipo}) con su objeto competitivo **${cand.pvp.objeto_recomendado.split('(')[0].trim()}**.`);
    }

    const reason_es = sentences.join(' ');

    return {
      pokemon: cand,
      category,
      title,
      reason_es,
      synergyScore: item.score,
      highlightBadge,
      partnerName: partner?.name_es,
      partnerSynergy: item.partnerWeaknessCovered,
      keyTrait: item.keyTrait,
      generationTag: `Gen ${cand.generation}`
    };
  });
}

// 5. Función principal de auditoría
export function performDetailedAudit(
  team: Pokemon[],
  options?: SuggestionOptions
): DetailedTeamAudit {
  const weaknesses: Record<string, number> = {};
  const resistances: Record<string, number> = {};
  const immunities: Record<string, number> = {};

  ALL_TYPES.forEach(t => {
    weaknesses[t] = 0;
    resistances[t] = 0;
    immunities[t] = 0;
  });

  const allTeamTypes = new Set<string>();
  let hasGroundImmunity = false;
  let hasHazardSetter = false;
  let hasHazardRemoval = false;

  team.forEach(p => {
    p.types.forEach(t => allTeamTypes.add(t));
    if (p.types.includes("Volador") || p.abilities.some(a => a.name.toLowerCase().includes("levitate") || a.name.toLowerCase().includes("levitaci"))) {
      hasGroundImmunity = true;
    }
    if (p.pvp.mejores_ataques.some(m => m.nombre_en.includes("Stealth Rock") || m.nombre.includes("Trampa Rocas") || m.nombre_en.includes("Spikes"))) {
      hasHazardSetter = true;
    }
    if (p.pvp.mejores_ataques.some(m => m.nombre_en.includes("Defog") || m.nombre.includes("Despejar") || m.nombre_en.includes("Rapid Spin") || m.nombre.includes("Giro Rápido")) || p.pvp.objeto_recomendado.includes("Heavy-Duty Boots")) {
      hasHazardRemoval = true;
    }

    // Calcular debilidades individuales
    ALL_TYPES.forEach(atkType => {
      let mult = 1;
      p.types.forEach(defType => {
        const typeDef = TYPE_CHART[defType];
        if (typeDef && typeDef[atkType] !== undefined) {
          mult *= typeDef[atkType];
        }
      });

      if (mult === 0) immunities[atkType]++;
      else if (mult > 1) weaknesses[atkType]++;
      else if (mult < 1) resistances[atkType]++;
    });
  });

  const criticalWeaknesses = Object.keys(weaknesses).filter(t => weaknesses[t] >= 2);

  // 1. Núcleo Fuego - Agua - Planta (FWG Core)
  const hasFire = allTeamTypes.has("Fuego");
  const hasWater = allTeamTypes.has("Agua");
  const hasGrass = allTeamTypes.has("Planta");
  const fwgMissing: string[] = [];
  if (!hasFire) fwgMissing.push("Fuego");
  if (!hasWater) fwgMissing.push("Agua");
  if (!hasGrass) fwgMissing.push("Planta");

  // 2. Núcleo Dragón - Hada - Acero (DFS Fantasy Core)
  const hasDragon = allTeamTypes.has("Dragón");
  const hasFairy = allTeamTypes.has("Hada");
  const hasSteel = allTeamTypes.has("Acero");
  const dfsMissing: string[] = [];
  if (!hasDragon) dfsMissing.push("Dragón");
  if (!hasFairy) dfsMissing.push("Hada");
  if (!hasSteel) dfsMissing.push("Acero");

  const cores: CoreAnalysis = {
    fwgCore: {
      present: fwgMissing.length === 0,
      missing: fwgMissing,
      status: fwgMissing.length === 0 
        ? "✅ Núcleo Elemental Completo (Fuego-Agua-Planta): Excelente sinergia de coberturas mutuas."
        : `⚠️ Núcleo Incompleto: Te falta ${fwgMissing.join(' y ')} para cerrar el triángulo elemental clásico.`
    },
    dfsCore: {
      present: dfsMissing.length === 0,
      missing: dfsMissing,
      status: dfsMissing.length === 0
        ? "👑 Núcleo de Fantasía Completo (Dragón-Hada-Acero): El núcleo defensivo más temido del meta."
        : `⚠️ Núcleo de Fantasía Incompleto: Te falta incorporar ${dfsMissing.join(' y ')} para resistir Dragones y Hadas rivales.`
    },
    groundImmunity: {
      present: hasGroundImmunity,
      status: hasGroundImmunity
        ? "🛡️ Inmunidad a Tierra Activa: Tienes Pokémon Voladores o Levitación para anular Terremoto."
        : "🚨 VULNERABILIDAD CRÍTICA A TERREMOTO: Según la comunidad de Reddit y Smogon, no tener un tipo Volador o Levitación es la causa #1 de perder combates contra Garchomp o Great Tusk."
    },
    hazardControl: {
      hasSetter: hasHazardSetter,
      hasRemoval: hasHazardRemoval,
      status: hasHazardSetter && hasHazardRemoval
        ? "✅ Control Total de Trampas: Puedes colocar Trampa Rocas y despejar trampas rivales."
        : !hasHazardSetter
        ? "⚠️ Falta Hazard Setter: Sin Trampa Rocas no podrás desgastar a Pokémon voladores ni romper Bandas Focus."
        : "⚠️ Falta Hazard Removal: Trampa Rocas desgastará un 25-50% de vida a tus miembros cada vez que entren."
    }
  };

  // 3. Evaluación de Amenazas del Meta
  const threatsEvaluation = META_THREATS.map(threat => {
    const answers: string[] = [];
    team.forEach(member => {
      const isSuper = threat.effectiveCheckTypes.some(t => member.types.includes(t));
      const resists = threat.types.some(t => member.types.includes("Volador") && t === "Tierra");
      if (isSuper || resists || threat.bestCounters.some(c => c.toLowerCase().includes(member.name.toLowerCase()))) {
        answers.push(member.name_es);
      }
    });

    const isVulnerable = answers.length === 0;
    return {
      threat,
      isVulnerable,
      howToBeat: isVulnerable 
        ? `¡Peligro! Tu equipo no tiene respuesta firme contra ${threat.name}. Te recomendamos añadir a ${threat.bestCounters.slice(0, 2).join(' o ')}.`
        : `Tienes a ${answers.join(' y ')} listos para contrarrestar a ${threat.name}.`,
      teamAnswers: answers
    };
  });

  // 4. Consejos Generales de la IA
  const teamAdvice: string[] = [];
  if (criticalWeaknesses.length > 0) {
    teamAdvice.push(`Tienes **${criticalWeaknesses.join(', ')}** como debilidades compartidas alarmantes. Un atacante con cobertura en estos elementos puede derribar a varios integrantes seguidos.`);
  }
  if (!hasGroundImmunity) {
    teamAdvice.push(`**Prioridad Absoluta:** Incorpora un tipo **Volador** (como Corviknight, Togekiss, Charizard o Dragonite) o Levitación para ser 100% inmune a Terremoto.`);
  }
  if (dfsMissing.length === 1) {
    teamAdvice.push(`Estás a solo un paso de completar el **Núcleo de Fantasía (Dragón-Hada-Acero)**. Añade un tipo **${dfsMissing[0]}** para sellar tus defensas.`);
  }

  // 5. Sugerencias dinámicas
  const suggestions = getSynergySuggestions(team, options);
  const suggestedTeammate = suggestions.length > 0 ? {
    pokemon: suggestions[0].pokemon,
    strategicRole: suggestions[0].pokemon.pvp.rol,
    synergyScore: suggestions[0].synergyScore,
    reason_es: suggestions[0].reason_es
  } : undefined;

  return {
    weaknesses,
    resistances,
    immunities,
    criticalWeaknesses,
    cores,
    threatsEvaluation,
    suggestedTeammate,
    suggestions,
    teamAdvice
  };
}
