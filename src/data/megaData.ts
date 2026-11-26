// Base de datos de Mega Evoluciones soportadas en Cobblemon mediante Addons oficiales de la comunidad
// (Principalmente los mods: Cobblemon: Mega Showdown y Ascension Megamons)

export interface MegaEvolution {
  pokemonId: number;
  baseSpecies: string;
  megaName: string;
  megaNameEs: string;
  types: string[];
  itemRequired: string;
  itemSprite: string;
  sprite: string;
  animatedSprite: string;
  ability: string;
  abilityEffectEs: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    sp_attack: number;
    sp_defense: number;
    speed: number;
    total: number;
  };
  addonMod: string;
  descriptionEs: string;
}

export const MEGA_EVOLUTIONS_DATA: MegaEvolution[] = [
  {
    "pokemonId": 3,
    "baseSpecies": "Venusaur",
    "megaName": "Mega Venusaur",
    "megaNameEs": "Mega Venusaur",
    "types": [
      "Planta",
      "Veneno"
    ],
    "itemRequired": "Venusaurita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/venusaurite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/venusaur-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/venusaur-mega.gif",
    "ability": "Sebo (Thick Fat)",
    "abilityEffectEs": "Reduce a la mitad el daño recibido por ataques de tipo Fuego y Hielo, cubriendo dos de sus principales debilidades.",
    "stats": {
      "hp": 80,
      "attack": 100,
      "defense": 123,
      "sp_attack": 122,
      "sp_defense": 120,
      "speed": 80,
      "total": 625
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "La flor de su lomo florece a proporciones colosales gracias a la megaenergía, convirtiéndolo en un tanque defensivo formidable."
  },
  {
    "pokemonId": 6,
    "baseSpecies": "Charizard",
    "megaName": "Mega Charizard X",
    "megaNameEs": "Mega Charizard X",
    "types": [
      "Fuego",
      "Dragón"
    ],
    "itemRequired": "Charizardita X",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charizardite-x.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/charizard-megax.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/charizard-megax.gif",
    "ability": "Garra Dura (Tough Claws)",
    "abilityEffectEs": "Aumenta la potencia de todos los ataques físicos de contacto directo en un 30%.",
    "stats": {
      "hp": 78,
      "attack": 130,
      "defense": 111,
      "sp_attack": 130,
      "sp_defense": 85,
      "speed": 100,
      "total": 634
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su cuerpo se torna negro carbón y sus llamas azules alcanzan temperaturas capaces de fundir el diamante. Se convierte en Dragón auténtico."
  },
  {
    "pokemonId": 6,
    "baseSpecies": "Charizard",
    "megaName": "Mega Charizard Y",
    "megaNameEs": "Mega Charizard Y",
    "types": [
      "Fuego",
      "Volador"
    ],
    "itemRequired": "Charizardita Y",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/charizardite-y.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/charizard-megay.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/charizard-megay.gif",
    "ability": "Sequía (Drought)",
    "abilityEffectEs": "Invoca sol abrasador al entrar al combate, potenciando movimientos de Fuego un 50% y cargando Rayo Solar en un solo turno.",
    "stats": {
      "hp": 78,
      "attack": 104,
      "defense": 78,
      "sp_attack": 159,
      "sp_defense": 115,
      "speed": 100,
      "total": 634
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus alas se expanden enormemente y desata un calor apabullante que calcina el campo de batalla con llamaradas devastadoras."
  },
  {
    "pokemonId": 9,
    "baseSpecies": "Blastoise",
    "megaName": "Mega Blastoise",
    "megaNameEs": "Mega Blastoise",
    "types": [
      "Agua"
    ],
    "itemRequired": "Blastoisita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blastoisinite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/blastoise-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/blastoise-mega.gif",
    "ability": "Megadisparador (Mega Launcher)",
    "abilityEffectEs": "Aumenta la potencia de los ataques de pulsos y auras (Hidropulso, Pulso Umbrío, Pulso Dragón, Esfera Aural) en un 50%.",
    "stats": {
      "hp": 79,
      "attack": 103,
      "defense": 120,
      "sp_attack": 135,
      "sp_defense": 115,
      "speed": 78,
      "total": 630
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Un colosal cañón central se ubica sobre su caparazón junto a dos cañones secundarios en sus brazos con alcance de más de 10 kilómetros."
  },
  {
    "pokemonId": 15,
    "baseSpecies": "Beedrill",
    "megaName": "Mega Beedrill",
    "megaNameEs": "Mega Beedrill",
    "types": [
      "Bicho",
      "Veneno"
    ],
    "itemRequired": "Beedrillita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/beedrillite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/beedrill-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/beedrill-mega.gif",
    "ability": "Adaptable (Adaptability)",
    "abilityEffectEs": "El bonus de ataque por mismo tipo (STAB) se incrementa de 1.5x a 2.0x, convirtiendo Tijera X y Puya Nociva en golpes letales.",
    "stats": {
      "hp": 65,
      "attack": 150,
      "defense": 40,
      "sp_attack": 15,
      "sp_defense": 80,
      "speed": 145,
      "total": 495
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Posee tres enormes aguijones cónicos con venenos de acción instantánea y una de las velocidades físicas más altas de todo el juego."
  },
  {
    "pokemonId": 18,
    "baseSpecies": "Pidgeot",
    "megaName": "Mega Pidgeot",
    "megaNameEs": "Mega Pidgeot",
    "types": [
      "Normal",
      "Volador"
    ],
    "itemRequired": "Pidgeotita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pidgeotite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/pidgeot-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/pidgeot-mega.gif",
    "ability": "Indefenso (No Guard)",
    "abilityEffectEs": "Garantiza que todos los movimientos usados por y contra este Pokémon nunca fallen, permitiendo spamear Vendaval (Hurricane) al 100% de precisión.",
    "stats": {
      "hp": 83,
      "attack": 80,
      "defense": 80,
      "sp_attack": 135,
      "sp_defense": 80,
      "speed": 121,
      "total": 579
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su cresta adquiere tintes dorados y rojos carmesí. Sus ráfagas de viento pueden arrancar árboles de cuajo."
  },
  {
    "pokemonId": 65,
    "baseSpecies": "Alakazam",
    "megaName": "Mega Alakazam",
    "megaNameEs": "Mega Alakazam",
    "types": [
      "Psíquico"
    ],
    "itemRequired": "Alakazamita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/alakazite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/alakazam-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/alakazam-mega.gif",
    "ability": "Rastro (Trace)",
    "abilityEffectEs": "Copia la habilidad del oponente al entrar en combate, pudiendo absorber habilidades clave del rival.",
    "stats": {
      "hp": 55,
      "attack": 50,
      "defense": 65,
      "sp_attack": 175,
      "sp_defense": 105,
      "speed": 150,
      "total": 600
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Levita con cinco cucharas de energía mental purificada. Su intelecto colosal le permite procesar millones de escenarios en milésimas de segundo."
  },
  {
    "pokemonId": 80,
    "baseSpecies": "Slowbro",
    "megaName": "Mega Slowbro",
    "megaNameEs": "Mega Slowbro",
    "types": [
      "Agua",
      "Psíquico"
    ],
    "itemRequired": "Slowbronita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/slowbronite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/slowbro-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/slowbro-mega.gif",
    "ability": "Caparazón (Shell Armor)",
    "abilityEffectEs": "Inmune a los golpes críticos, permitiéndole acumular Paz Mental (Calm Mind) de manera completamente segura.",
    "stats": {
      "hp": 95,
      "attack": 75,
      "defense": 180,
      "sp_attack": 130,
      "sp_defense": 80,
      "speed": 30,
      "total": 590
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "El Shellder de su cola lo devora casi por completo convirtiéndose en una armadura espiral impenetrable."
  },
  {
    "pokemonId": 94,
    "baseSpecies": "Gengar",
    "megaName": "Mega Gengar",
    "megaNameEs": "Mega Gengar",
    "types": [
      "Fantasma",
      "Veneno"
    ],
    "itemRequired": "Gengarita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gengarite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/gengar-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/gengar-mega.gif",
    "ability": "Sombra Trampa (Shadow Tag)",
    "abilityEffectEs": "Impide que los Pokémon rivales sean cambiados o huyan del combate (salvo Pokémon de tipo Fantasma).",
    "stats": {
      "hp": 60,
      "attack": 65,
      "defense": 80,
      "sp_attack": 170,
      "sp_defense": 95,
      "speed": 130,
      "total": 600
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Abre un tercer ojo en su frente que mira a otras dimensiones. Hunde parte de su cuerpo espectral en el suelo para emboscar."
  },
  {
    "pokemonId": 115,
    "baseSpecies": "Kangaskhan",
    "megaName": "Mega Kangaskhan",
    "megaNameEs": "Mega Kangaskhan",
    "types": [
      "Normal"
    ],
    "itemRequired": "Kangaskhanita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/kangaskhanite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/kangaskhan-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/kangaskhan-mega.gif",
    "ability": "Amor Filial (Parental Bond)",
    "abilityEffectEs": "La cría sale de la bolsa y golpea inmediatamente después de la madre con un 25% de potencia adicional, activando efectos secundarios dos veces.",
    "stats": {
      "hp": 105,
      "attack": 125,
      "defense": 100,
      "sp_attack": 60,
      "sp_defense": 100,
      "speed": 100,
      "total": 590
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "La cría crece y salta valientemente al combate para luchar codo con codo junto a su madre."
  },
  {
    "pokemonId": 127,
    "baseSpecies": "Pinsir",
    "megaName": "Mega Pinsir",
    "megaNameEs": "Mega Pinsir",
    "types": [
      "Bicho",
      "Volador"
    ],
    "itemRequired": "Pinsirita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/pinsirite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/pinsir-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/pinsir-mega.gif",
    "ability": "Piel Celeste (Aerilate)",
    "abilityEffectEs": "Convierte los ataques de tipo Normal en tipo Volador y les otorga un bonus del 20% de daño más el STAB.",
    "stats": {
      "hp": 65,
      "attack": 155,
      "defense": 120,
      "sp_attack": 65,
      "sp_defense": 90,
      "speed": 105,
      "total": 600
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Desarrolla alas elytra enormes que le permiten volar a gran velocidad atrapando presas entre sus colosales cuernos."
  },
  {
    "pokemonId": 130,
    "baseSpecies": "Gyarados",
    "megaName": "Mega Gyarados",
    "megaNameEs": "Mega Gyarados",
    "types": [
      "Agua",
      "Siniestro"
    ],
    "itemRequired": "Gyaradosita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gyaradosite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/gyarados-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/gyarados-mega.gif",
    "ability": "Rompemoldes (Mold Breaker)",
    "abilityEffectEs": "Ignora las habilidades defensivas del rival (como Levitación, Robustez, Disfraz) al atacar.",
    "stats": {
      "hp": 95,
      "attack": 155,
      "defense": 109,
      "sp_attack": 70,
      "sp_defense": 130,
      "speed": 81,
      "total": 640
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su cuerpo se vuelve más compacto y robusto. Adopta el tipo Siniestro y propulsa chorros de agua a presión por los costados."
  },
  {
    "pokemonId": 142,
    "baseSpecies": "Aerodactyl",
    "megaName": "Mega Aerodactyl",
    "megaNameEs": "Mega Aerodactyl",
    "types": [
      "Roca",
      "Volador"
    ],
    "itemRequired": "Aerodactylita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aerodactylite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/aerodactyl-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/aerodactyl-mega.gif",
    "ability": "Garra Dura (Tough Claws)",
    "abilityEffectEs": "Aumenta un 30% la potencia de movimientos de contacto como Golpe Aéreo, Triturar y Colmillo Ígneo.",
    "stats": {
      "hp": 80,
      "attack": 135,
      "defense": 85,
      "sp_attack": 70,
      "sp_defense": 95,
      "speed": 150,
      "total": 615
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "La energía mega despierta los genes dormidos de su forma primitiva prehistórica, cubriendo su cuerpo de afiladas protuberancias de roca negra."
  },
  {
    "pokemonId": 150,
    "baseSpecies": "Mewtwo",
    "megaName": "Mega Mewtwo X",
    "megaNameEs": "Mega Mewtwo X",
    "types": [
      "Psíquico",
      "Lucha"
    ],
    "itemRequired": "Mewtwoita X",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mewtwonite-x.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/mewtwo-megax.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/mewtwo-megax.gif",
    "ability": "Impasible (Steadfast)",
    "abilityEffectEs": "Aumenta la velocidad un nivel cada vez que retrocede por el efecto de un ataque rival.",
    "stats": {
      "hp": 106,
      "attack": 190,
      "defense": 100,
      "sp_attack": 154,
      "sp_defense": 100,
      "speed": 130,
      "total": 780
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Concentra su energía psíquica para hipertrofiar sus músculos, alcanzando el ataque físico más devastador de la historia (190 Base)."
  },
  {
    "pokemonId": 150,
    "baseSpecies": "Mewtwo",
    "megaName": "Mega Mewtwo Y",
    "megaNameEs": "Mega Mewtwo Y",
    "types": [
      "Psíquico"
    ],
    "itemRequired": "Mewtwoita Y",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mewtwonite-y.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/mewtwo-megay.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/mewtwo-megay.gif",
    "ability": "Insomnio (Insomnia)",
    "abilityEffectEs": "Evita quedar dormido por Espora, Somnífero, Bostezo o Brecha Negra.",
    "stats": {
      "hp": 106,
      "attack": 150,
      "defense": 70,
      "sp_attack": 194,
      "sp_defense": 120,
      "speed": 140,
      "total": 780
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su cuerpo se vuelve etéreo y ligero, canalizando todo su poder psíquico en un lóbulo craneal que emite ondas de choque imparables (194 SpA)."
  },
  {
    "pokemonId": 181,
    "baseSpecies": "Ampharos",
    "megaName": "Mega Ampharos",
    "megaNameEs": "Mega Ampharos",
    "types": [
      "Eléctrico",
      "Dragón"
    ],
    "itemRequired": "Ampharosite",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ampharosite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/ampharos-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/ampharos-mega.gif",
    "ability": "Rompemoldes (Mold Breaker)",
    "abilityEffectEs": "Ignora Absorbe Elec, Pararrayos o Motor Eléctrico al usar ataques eléctricos.",
    "stats": {
      "hp": 90,
      "attack": 95,
      "defense": 105,
      "sp_attack": 165,
      "sp_defense": 110,
      "speed": 45,
      "total": 610
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Le crece una abundante melena de lana blanca con rubíes brillantes y despierta la sangre de dragón latente en sus antepasados."
  },
  {
    "pokemonId": 208,
    "baseSpecies": "Steelix",
    "megaName": "Mega Steelix",
    "megaNameEs": "Mega Steelix",
    "types": [
      "Acero",
      "Tierra"
    ],
    "itemRequired": "Steelixita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/steelixite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/steelix-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/steelix-mega.gif",
    "ability": "Poder Arena (Sand Force)",
    "abilityEffectEs": "Aumenta un 33% la potencia de movimientos de Roca, Tierra y Acero durante una Tormenta de Arena.",
    "stats": {
      "hp": 75,
      "attack": 125,
      "defense": 230,
      "sp_attack": 55,
      "sp_defense": 95,
      "speed": 30,
      "total": 610
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Células de cristal de diamante orbitan alrededor de su cuerpo blindado, dándole 230 puntos de Defensa física astronómica."
  },
  {
    "pokemonId": 212,
    "baseSpecies": "Scizor",
    "megaName": "Mega Scizor",
    "megaNameEs": "Mega Scizor",
    "types": [
      "Bicho",
      "Acero"
    ],
    "itemRequired": "Scizorita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scizorite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/scizor-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/scizor-mega.gif",
    "ability": "Experto (Technician)",
    "abilityEffectEs": "Potencia en un 50% los movimientos con potencia base de 60 o inferior (Puño Bala alcanza una potencia brutal con prioridad).",
    "stats": {
      "hp": 70,
      "attack": 150,
      "defense": 140,
      "sp_attack": 65,
      "sp_defense": 100,
      "speed": 75,
      "total": 600
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus tenazas se convierten en cizallas mecánicas pesadas con púas dentadas capaces de cortar vigas de acero como papel."
  },
  {
    "pokemonId": 214,
    "baseSpecies": "Heracross",
    "megaName": "Mega Heracross",
    "megaNameEs": "Mega Heracross",
    "types": [
      "Bicho",
      "Lucha"
    ],
    "itemRequired": "Heracrossita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heracronite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/heracross-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/heracross-mega.gif",
    "ability": "Encadenado (Skill Link)",
    "abilityEffectEs": "Garantiza que movimientos de golpes múltiples (como Pin Misil, Pedrada, Recurrente) acierten siempre las 5 veces seguidas.",
    "stats": {
      "hp": 80,
      "attack": 185,
      "defense": 115,
      "sp_attack": 40,
      "sp_defense": 105,
      "speed": 75,
      "total": 600
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su cuerpo se asemeja al de un escarabajo hércules colosal y su ataque físico se eleva a 185 base, levantando 100 veces su propio peso."
  },
  {
    "pokemonId": 229,
    "baseSpecies": "Houndoom",
    "megaName": "Mega Houndoom",
    "megaNameEs": "Mega Houndoom",
    "types": [
      "Siniestro",
      "Fuego"
    ],
    "itemRequired": "Houndoomita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/houndoominite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/houndoom-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/houndoom-mega.gif",
    "ability": "Poder Solar (Solar Power)",
    "abilityEffectEs": "Aumenta un 50% su ataque especial bajo sol intenso a cambio de perder 1/8 de salud por turno.",
    "stats": {
      "hp": 75,
      "attack": 90,
      "defense": 90,
      "sp_attack": 140,
      "sp_defense": 90,
      "speed": 115,
      "total": 600
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus cuernos y espinas óseas crecen de forma infernal, expulsando un fuego sulfúrico cuyas quemaduras causan dolor eterno."
  },
  {
    "pokemonId": 248,
    "baseSpecies": "Tyranitar",
    "megaName": "Mega Tyranitar",
    "megaNameEs": "Mega Tyranitar",
    "types": [
      "Roca",
      "Siniestro"
    ],
    "itemRequired": "Tyranitarita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tyranitarite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/tyranitar-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/tyranitar-mega.gif",
    "ability": "Chorro Arena (Sand Stream)",
    "abilityEffectEs": "Invoca una tormenta de arena permanente que inflige daño residual y aumenta su defensa especial en un 50%.",
    "stats": {
      "hp": 100,
      "attack": 164,
      "defense": 150,
      "sp_attack": 95,
      "sp_defense": 120,
      "speed": 71,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "El exoesqueleto de su torso se rasga por la energía descomunal desprendiendo púas gigantes con instinto demoledor."
  },
  {
    "pokemonId": 254,
    "baseSpecies": "Sceptile",
    "megaName": "Mega Sceptile",
    "megaNameEs": "Mega Sceptile",
    "types": [
      "Planta",
      "Dragón"
    ],
    "itemRequired": "Sceptilita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sceptilite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/sceptile-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/sceptile-mega.gif",
    "ability": "Pararrayos (Lightning Rod)",
    "abilityEffectEs": "Inmune a movimientos eléctricos; absorbe ataques eléctricos de todo el campo y sube su Ataque Especial un nivel.",
    "stats": {
      "hp": 70,
      "attack": 110,
      "defense": 75,
      "sp_attack": 145,
      "sp_defense": 85,
      "speed": 145,
      "total": 630
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Desprende su cola como un misil teledirigido conífero y adopta el tipo Dragón con una tremenda velocidad de 145."
  },
  {
    "pokemonId": 257,
    "baseSpecies": "Blaziken",
    "megaName": "Mega Blaziken",
    "megaNameEs": "Mega Blaziken",
    "types": [
      "Fuego",
      "Lucha"
    ],
    "itemRequired": "Blazikenita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blazikenite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/blaziken-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/blaziken-mega.gif",
    "ability": "Impulso (Speed Boost)",
    "abilityEffectEs": "Aumenta la Velocidad un nivel al final de cada turno sin fallar jamás.",
    "stats": {
      "hp": 80,
      "attack": 160,
      "defense": 80,
      "sp_attack": 130,
      "sp_defense": 80,
      "speed": 100,
      "total": 630
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Llamas ardientes brotan de sus muñecas envolviendo sus patadas en una danza marcial destructiva que incrementa su ritmo segundo a segundo."
  },
  {
    "pokemonId": 260,
    "baseSpecies": "Swampert",
    "megaName": "Mega Swampert",
    "megaNameEs": "Mega Swampert",
    "types": [
      "Agua",
      "Tierra"
    ],
    "itemRequired": "Swampertita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/swampertite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/swampert-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/swampert-mega.gif",
    "ability": "Nado Rápido (Swift Swim)",
    "abilityEffectEs": "Duplica su Velocidad automáticamente bajo la Lluvia.",
    "stats": {
      "hp": 100,
      "attack": 150,
      "defense": 110,
      "sp_attack": 95,
      "sp_defense": 110,
      "speed": 70,
      "total": 635
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus brazos se ensanchan con musculatura descomunal para propulsarse en el agua y golpear con la fuerza de un maremoto."
  },
  {
    "pokemonId": 282,
    "baseSpecies": "Gardevoir",
    "megaName": "Mega Gardevoir",
    "megaNameEs": "Mega Gardevoir",
    "types": [
      "Psíquico",
      "Hada"
    ],
    "itemRequired": "Gardevoirita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/gardevoirite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/gardevoir-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/gardevoir-mega.gif",
    "ability": "Piel Feérica (Pixilate)",
    "abilityEffectEs": "Convierte movimientos de tipo Normal (como Vozarrón / Hyper Voice) en tipo Hada con un 20% más de daño adicional al STAB.",
    "stats": {
      "hp": 68,
      "attack": 85,
      "defense": 65,
      "sp_attack": 165,
      "sp_defense": 135,
      "speed": 100,
      "total": 618
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Luce un elegante vestido de gala blanco ensanchado y su pecho proyecta el corazón de un agujero negro protector."
  },
  {
    "pokemonId": 302,
    "baseSpecies": "Sableye",
    "megaName": "Mega Sableye",
    "megaNameEs": "Mega Sableye",
    "types": [
      "Siniestro",
      "Fantasma"
    ],
    "itemRequired": "Sableyita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sablenite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/sableye-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/sableye-mega.gif",
    "ability": "Espejo Mágico (Magic Bounce)",
    "abilityEffectEs": "Refleja automáticamente de vuelta al rival trampas como Trampa Rocas, Púas, Fuego Fatuo, Mofa y Tóxico.",
    "stats": {
      "hp": 50,
      "attack": 85,
      "defense": 125,
      "sp_attack": 85,
      "sp_defense": 115,
      "speed": 20,
      "total": 480
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Arranca una gigantesca gema rubí de su pecho que usa como escudo irrompible reflejando cualquier ataque de estado."
  },
  {
    "pokemonId": 303,
    "baseSpecies": "Mawile",
    "megaName": "Mega Mawile",
    "megaNameEs": "Mega Mawile",
    "types": [
      "Acero",
      "Hada"
    ],
    "itemRequired": "Mawilita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mawilite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/mawile-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/mawile-mega.gif",
    "ability": "Potencia (Huge Power)",
    "abilityEffectEs": "Duplica su estadística real de Ataque Físico en combate, convirtiéndose en el atacante más letal de todo Pokémon.",
    "stats": {
      "hp": 50,
      "attack": 105,
      "defense": 125,
      "sp_attack": 55,
      "sp_defense": 95,
      "speed": 50,
      "total": 480
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Desarrolla dos fauces gigantescas de acero que mastican con una fuerza de trituración capaz de romper camiones."
  },
  {
    "pokemonId": 306,
    "baseSpecies": "Aggron",
    "megaName": "Mega Aggron",
    "megaNameEs": "Mega Aggron",
    "types": [
      "Acero"
    ],
    "itemRequired": "Aggronita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aggronite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/aggron-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/aggron-mega.gif",
    "ability": "Filtro (Filter)",
    "abilityEffectEs": "Reduce un 25% el daño sufrido por ataques supereficaces.",
    "stats": {
      "hp": 70,
      "attack": 140,
      "defense": 230,
      "sp_attack": 60,
      "sp_defense": 80,
      "speed": 50,
      "total": 630
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Pierde su tipo Roca secundario quedando como Acero Puro con 230 de Defensa, resistiendo casi cualquier impacto conocido."
  },
  {
    "pokemonId": 308,
    "baseSpecies": "Medicham",
    "megaName": "Mega Medicham",
    "megaNameEs": "Mega Medicham",
    "types": [
      "Lucha",
      "Psíquico"
    ],
    "itemRequired": "Medichamita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/medichamite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/medicham-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/medicham-mega.gif",
    "ability": "Energía Pura (Pure Power)",
    "abilityEffectEs": "Duplica su estadística de Ataque real en el combate.",
    "stats": {
      "hp": 60,
      "attack": 100,
      "defense": 85,
      "sp_attack": 80,
      "sp_defense": 85,
      "speed": 100,
      "total": 510
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Materializa un turbante astral de aura psíquica con cuatro brazos espirituales que asestan golpes de kárate demoledores."
  },
  {
    "pokemonId": 310,
    "baseSpecies": "Manectric",
    "megaName": "Mega Manectric",
    "megaNameEs": "Mega Manectric",
    "types": [
      "Eléctrico"
    ],
    "itemRequired": "Manectricita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/manectite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/manectric-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/manectric-mega.gif",
    "ability": "Intimidación (Intimidate)",
    "abilityEffectEs": "Baja el ataque físico del oponente un nivel nada más saltar al campo de combate.",
    "stats": {
      "hp": 70,
      "attack": 75,
      "defense": 80,
      "sp_attack": 135,
      "sp_defense": 80,
      "speed": 135,
      "total": 575
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Una inmensa cresta en forma de rayo amarillo se alza en su cabeza cargando millones de voltios de electricidad estática."
  },
  {
    "pokemonId": 319,
    "baseSpecies": "Sharpedo",
    "megaName": "Mega Sharpedo",
    "megaNameEs": "Mega Sharpedo",
    "types": [
      "Agua",
      "Siniestro"
    ],
    "itemRequired": "Sharpedonita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sharpedonite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/sharpedo-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/sharpedo-mega.gif",
    "ability": "Mandíbula Fuerte (Strong Jaw)",
    "abilityEffectEs": "Aumenta en un 50% la potencia de movimientos de mordisco (Triturar, Colmillo Hielo, Psicocolmillo).",
    "stats": {
      "hp": 70,
      "attack": 140,
      "defense": 70,
      "sp_attack": 110,
      "sp_defense": 65,
      "speed": 105,
      "total": 560
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus colmillos se regeneran infinitamente y marcas amarillas en su piel cortan el agua a más de 200 km/h."
  },
  {
    "pokemonId": 323,
    "baseSpecies": "Camerupt",
    "megaName": "Mega Camerupt",
    "megaNameEs": "Mega Camerupt",
    "types": [
      "Fuego",
      "Tierra"
    ],
    "itemRequired": "Cameruptita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cameruptite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/camerupt-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/camerupt-mega.gif",
    "ability": "Potencia Bruta (Sheer Force)",
    "abilityEffectEs": "Aumenta un 30% la potencia de movimientos que tienen efectos secundarios (eliminando dichos efectos secundarios).",
    "stats": {
      "hp": 70,
      "attack": 120,
      "defense": 100,
      "sp_attack": 145,
      "sp_defense": 105,
      "speed": 20,
      "total": 560
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Los dos volcanes de su lomo se fusionan en un cráter ardiente colosal que escupe magma constantemente."
  },
  {
    "pokemonId": 334,
    "baseSpecies": "Altaria",
    "megaName": "Mega Altaria",
    "megaNameEs": "Mega Altaria",
    "types": [
      "Dragón",
      "Hada"
    ],
    "itemRequired": "Altarianita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/altarianite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/altaria-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/altaria-mega.gif",
    "ability": "Piel Feérica (Pixilate)",
    "abilityEffectEs": "Transforma movimientos de tipo Normal en Hada con un 20% de incremento de potencia base.",
    "stats": {
      "hp": 75,
      "attack": 110,
      "defense": 110,
      "sp_attack": 110,
      "sp_defense": 105,
      "speed": 80,
      "total": 590
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su plumaje algodonoso se esponja rodeando su cuerpo como una nube divina; es la única criatura Dragón/Hada del juego."
  },
  {
    "pokemonId": 354,
    "baseSpecies": "Banette",
    "megaName": "Mega Banette",
    "megaNameEs": "Mega Banette",
    "types": [
      "Fantasma"
    ],
    "itemRequired": "Banettita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/banettite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/banette-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/banette-mega.gif",
    "ability": "Bromista (Prankster)",
    "abilityEffectEs": "Concede prioridad +1 a todos los movimientos de estado (Fuego Fatuo, Mismo Destino, Onda Trueno, Mofa).",
    "stats": {
      "hp": 64,
      "attack": 165,
      "defense": 75,
      "sp_attack": 93,
      "sp_defense": 83,
      "speed": 75,
      "total": 555
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Las cremalleras de su cuerpo se abren dejando escapar el rencor maldito puro acumulado en su interior."
  },
  {
    "pokemonId": 359,
    "baseSpecies": "Absol",
    "megaName": "Mega Absol",
    "megaNameEs": "Mega Absol",
    "types": [
      "Siniestro"
    ],
    "itemRequired": "Absolita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/absolite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/absol-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/absol-mega.gif",
    "ability": "Espejo Mágico (Magic Bounce)",
    "abilityEffectEs": "Rebota automáticamente cualquier movimiento de estado, veneno o trampa de regreso al rival.",
    "stats": {
      "hp": 65,
      "attack": 150,
      "defense": 60,
      "sp_attack": 115,
      "sp_defense": 60,
      "speed": 115,
      "total": 565
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Despliega unas alas angelicales de pelaje blanco y su cuerno se afila alertando de catástrofes inminentes."
  },
  {
    "pokemonId": 362,
    "baseSpecies": "Glalie",
    "megaName": "Mega Glalie",
    "megaNameEs": "Mega Glalie",
    "types": [
      "Hielo"
    ],
    "itemRequired": "Glalitita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/glalitite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/glalie-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/glalie-mega.gif",
    "ability": "Piel Helada (Refrigerate)",
    "abilityEffectEs": "Convierte movimientos Normales (como Explosión / Doble Filo) en tipo Hielo con 20% más de daño.",
    "stats": {
      "hp": 80,
      "attack": 120,
      "defense": 80,
      "sp_attack": 120,
      "sp_defense": 80,
      "speed": 100,
      "total": 580
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su mandíbula se desencaja permanentemente por el frío absoluto congelando todo lo que engulle."
  },
  {
    "pokemonId": 373,
    "baseSpecies": "Salamence",
    "megaName": "Mega Salamence",
    "megaNameEs": "Mega Salamence",
    "types": [
      "Dragón",
      "Volador"
    ],
    "itemRequired": "Salamencita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/salamencite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/salamence-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/salamence-mega.gif",
    "ability": "Piel Celeste (Aerilate)",
    "abilityEffectEs": "Transforma movimientos tipo Normal en tipo Volador con 20% más de daño base.",
    "stats": {
      "hp": 95,
      "attack": 145,
      "defense": 130,
      "sp_attack": 120,
      "sp_defense": 90,
      "speed": 120,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus alas se unen en una sola cuchilla aerodinámica en media luna con la que corta el aire a velocidades supersónicas."
  },
  {
    "pokemonId": 376,
    "baseSpecies": "Metagross",
    "megaName": "Mega Metagross",
    "megaNameEs": "Mega Metagross",
    "types": [
      "Acero",
      "Psíquico"
    ],
    "itemRequired": "Metagrossita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/metagrossite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/metagross-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/metagross-mega.gif",
    "ability": "Garra Dura (Tough Claws)",
    "abilityEffectEs": "Aumenta en un 30% la potencia de movimientos de contacto directo (Puño Meteoro, Cabezazo Zen, Puño Trueno).",
    "stats": {
      "hp": 80,
      "attack": 145,
      "defense": 150,
      "sp_attack": 105,
      "sp_defense": 110,
      "speed": 110,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Resultado de la fusión mental y física de 8 Beldum a través de la megaevolución con una fuerza psíquica y metálica aplastante."
  },
  {
    "pokemonId": 380,
    "baseSpecies": "Latias",
    "megaName": "Mega Latias",
    "megaNameEs": "Mega Latias",
    "types": [
      "Dragón",
      "Psíquico"
    ],
    "itemRequired": "Latiasita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/latiasite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/latias-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/latias-mega.gif",
    "ability": "Levitación (Levitate)",
    "abilityEffectEs": "Inmune a movimientos de tipo Tierra, Púas y Trampas en el suelo.",
    "stats": {
      "hp": 80,
      "attack": 100,
      "defense": 120,
      "sp_attack": 140,
      "sp_defense": 150,
      "speed": 110,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Alcanza velocidades Mach 4 planeando suavemente con defensas de 120/150 impenetrables."
  },
  {
    "pokemonId": 381,
    "baseSpecies": "Latios",
    "megaName": "Mega Latios",
    "megaNameEs": "Mega Latios",
    "types": [
      "Dragón",
      "Psíquico"
    ],
    "itemRequired": "Latiosita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/latiosite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/latios-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/latios-mega.gif",
    "ability": "Levitación (Levitate)",
    "abilityEffectEs": "Inmune a movimientos de tipo Tierra y trampas del suelo.",
    "stats": {
      "hp": 80,
      "attack": 130,
      "defense": 100,
      "sp_attack": 160,
      "sp_defense": 120,
      "speed": 110,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Alcanza la velocidad de un jet militar de combate y canaliza ataques psíquicos y dracónicos con 160 de Ataque Especial."
  },
  {
    "pokemonId": 382,
    "baseSpecies": "Kyogre",
    "megaName": "Kyogre Primigenio",
    "megaNameEs": "Kyogre Primigenio",
    "types": [
      "Agua"
    ],
    "itemRequired": "Esfera Azul (Blue Orb)",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-orb.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/kyogre-primal.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/kyogre-primal.gif",
    "ability": "Mar del Albor (Primordial Sea)",
    "abilityEffectEs": "Desata un diluvio torrencial que evapora por completo cualquier movimiento de tipo Fuego.",
    "stats": {
      "hp": 100,
      "attack": 150,
      "defense": 90,
      "sp_attack": 180,
      "sp_defense": 160,
      "speed": 90,
      "total": 770
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Recupera su forma legendaria arcaica, inundando continentes enteros con aguas oceánicas infinitas."
  },
  {
    "pokemonId": 383,
    "baseSpecies": "Groudon",
    "megaName": "Groudon Primigenio",
    "megaNameEs": "Groudon Primigenio",
    "types": [
      "Tierra",
      "Fuego"
    ],
    "itemRequired": "Esfera Roja (Red Orb)",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/red-orb.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/groudon-primal.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/groudon-primal.gif",
    "ability": "Tierra del Ocaso (Desolate Land)",
    "abilityEffectEs": "Desata un calor solar extremo que evapora instantáneamente cualquier ataque de tipo Agua recibido.",
    "stats": {
      "hp": 100,
      "attack": 180,
      "defense": 160,
      "sp_attack": 150,
      "sp_defense": 90,
      "speed": 90,
      "total": 770
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Magma líquido fluye por sus grietas corporales incandescentes expandiendo la tierra y los volcanes del mundo."
  },
  {
    "pokemonId": 384,
    "baseSpecies": "Rayquaza",
    "megaName": "Mega Rayquaza",
    "megaNameEs": "Mega Rayquaza",
    "types": [
      "Dragón",
      "Volador"
    ],
    "itemRequired": "Movimiento Ascenso Draco (Dragon Ascent)",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/meteorite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/rayquaza-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/rayquaza-mega.gif",
    "ability": "Ráfaga Delta (Delta Stream)",
    "abilityEffectEs": "Anula el clima y reduce a la mitad el daño que reciben los Pokémon de tipo Volador por ataques supereficaces.",
    "stats": {
      "hp": 105,
      "attack": 180,
      "defense": 100,
      "sp_attack": 180,
      "sp_defense": 100,
      "speed": 115,
      "total": 780
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "El dios soberano de los cielos; megaevoluciona mediante la energía de meteoritos devorados sin ocupar el hueco de objeto."
  },
  {
    "pokemonId": 428,
    "baseSpecies": "Lopunny",
    "megaName": "Mega Lopunny",
    "megaNameEs": "Mega Lopunny",
    "types": [
      "Normal",
      "Lucha"
    ],
    "itemRequired": "Lopunnita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lopunnite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/lopunny-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/lopunny-mega.gif",
    "ability": "Intrépido (Scrappy)",
    "abilityEffectEs": "Permite golpear a Pokémon de tipo Fantasma con movimientos de tipo Normal y Lucha (como Retribución o Patada Salto Alta).",
    "stats": {
      "hp": 65,
      "attack": 136,
      "defense": 94,
      "sp_attack": 54,
      "sp_defense": 96,
      "speed": 135,
      "total": 580
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Se desprende del pelaje pesado para alcanzar una flexibilidad y velocidad combativa de atleta olímpica de artes marciales."
  },
  {
    "pokemonId": 445,
    "baseSpecies": "Garchomp",
    "megaName": "Mega Garchomp",
    "megaNameEs": "Mega Garchomp",
    "types": [
      "Dragón",
      "Tierra"
    ],
    "itemRequired": "Garchompita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/garchompite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/garchomp-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/garchomp-mega.gif",
    "ability": "Poder Arena (Sand Force)",
    "abilityEffectEs": "Aumenta un 33% el daño de movimientos Tierra, Roca y Acero durante una Tormenta de Arena.",
    "stats": {
      "hp": 108,
      "attack": 170,
      "defense": 115,
      "sp_attack": 120,
      "sp_defense": 95,
      "speed": 92,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Sus brazos se convierten en enormes guadañas rojas con una fuerza de corte que abre fallas en el terreno."
  },
  {
    "pokemonId": 448,
    "baseSpecies": "Lucario",
    "megaName": "Mega Lucario",
    "megaNameEs": "Mega Lucario",
    "types": [
      "Lucha",
      "Acero"
    ],
    "itemRequired": "Lucarionita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucarionite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/lucario-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/lucario-mega.gif",
    "ability": "Adaptable (Adaptability)",
    "abilityEffectEs": "El bonus STAB se eleva de 1.5x a 2.0x en ataques Lucha y Acero (A Bocajarro y Puño Meteoro se vuelven descomunales).",
    "stats": {
      "hp": 70,
      "attack": 145,
      "defense": 88,
      "sp_attack": 140,
      "sp_defense": 70,
      "speed": 112,
      "total": 625
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "El aura fluye por sus marcas negras en sus patas y brazos como vapores de energía concentrada imbatible."
  },
  {
    "pokemonId": 460,
    "baseSpecies": "Abomasnow",
    "megaName": "Mega Abomasnow",
    "megaNameEs": "Mega Abomasnow",
    "types": [
      "Planta",
      "Hielo"
    ],
    "itemRequired": "Abomasnowita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/abomasite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/abomasnow-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/abomasnow-mega.gif",
    "ability": "Nevada (Snow Warning)",
    "abilityEffectEs": "Desata una intensa tormenta de nieve / granizo que incrementa su defensa y activa Ventisca con 100% de acierto.",
    "stats": {
      "hp": 90,
      "attack": 132,
      "defense": 105,
      "sp_attack": 132,
      "sp_defense": 105,
      "speed": 30,
      "total": 594
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Cuatro enormes estalagmitas de hielo glacial crecen en su lomo haciéndolo el rey de las ventiscas."
  },
  {
    "pokemonId": 475,
    "baseSpecies": "Gallade",
    "megaName": "Mega Gallade",
    "megaNameEs": "Mega Gallade",
    "types": [
      "Psíquico",
      "Lucha"
    ],
    "itemRequired": "Galladita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/galladite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/gallade-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/gallade-mega.gif",
    "ability": "Foco Interno (Inner Focus)",
    "abilityEffectEs": "Evita el retroceso (Flinch) y es inmune a la bajada de ataque por Intimidación.",
    "stats": {
      "hp": 68,
      "attack": 165,
      "defense": 95,
      "sp_attack": 65,
      "sp_defense": 115,
      "speed": 110,
      "total": 618
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Despliega una capa blanca de caballero andante y sus brazos forman dos espadas de energía purísima."
  },
  {
    "pokemonId": 531,
    "baseSpecies": "Audino",
    "megaName": "Mega Audino",
    "megaNameEs": "Mega Audino",
    "types": [
      "Normal",
      "Hada"
    ],
    "itemRequired": "Audinita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/audinite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/audino-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/audino-mega.gif",
    "ability": "Alma Cura (Healer)",
    "abilityEffectEs": "Tiene un 30% de probabilidad de curar los problemas de estado de sus aliados en cada turno.",
    "stats": {
      "hp": 103,
      "attack": 60,
      "defense": 126,
      "sp_attack": 80,
      "sp_defense": 126,
      "speed": 50,
      "total": 545
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Su cuerpo se envuelve en un manto sedoso que emite ondas acústicas apaciguadoras que calman cualquier hostilidad."
  },
  {
    "pokemonId": 719,
    "baseSpecies": "Diancie",
    "megaName": "Mega Diancie",
    "megaNameEs": "Mega Diancie",
    "types": [
      "Roca",
      "Hada"
    ],
    "itemRequired": "Diancita",
    "itemSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/diancite.png",
    "sprite": "https://play.pokemonshowdown.com/sprites/gen5/diancie-mega.png",
    "animatedSprite": "https://play.pokemonshowdown.com/sprites/ani/diancie-mega.gif",
    "ability": "Espejo Mágico (Magic Bounce)",
    "abilityEffectEs": "Refleja trampas, venenos y ataques de estado de vuelta al rival.",
    "stats": {
      "hp": 50,
      "attack": 160,
      "defense": 110,
      "sp_attack": 160,
      "sp_defense": 110,
      "speed": 110,
      "total": 700
    },
    "addonMod": "Mega Showdown / Ascension Megamons",
    "descriptionEs": "Conocida como la Princesa Real Rosada; un diamante de más de 2000 quilates resplandece en su corona."
  }
];

export const MEGA_POKEMON_IDS = new Set<number>(MEGA_EVOLUTIONS_DATA.map(m => m.pokemonId));

export function getMegasForPokemon(pokemonId: number): MegaEvolution[] {
  return MEGA_EVOLUTIONS_DATA.filter(m => m.pokemonId === pokemonId);
}
