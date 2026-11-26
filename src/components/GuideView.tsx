import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Wheat, 
  Egg, 
  Compass, 
  Coffee, 
  Flame, 
  Search,
  Shield,
  Layers,
  Heart,
  Info,
  ChevronRight,
  ExternalLink,
  Zap
} from 'lucide-react';

export const GuideView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'commands' | 'pasture' | 'breeding' | 'mounts' | 'aprijuice' | 'megas'>('commands');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [commandSearch, setCommandSearch] = useState('');

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Base de datos de comandos oficiales de Cobblemon
  const COBBLEMON_COMMANDS = [
    {
      command: "/pokespawn <pokemon> [propiedades...]",
      category: "Aparición & Eventos",
      description: "Genera un Pokémon salvaje en las coordenadas actuales con propiedades personalizadas (nivel, shiny, naturaleza, etc.).",
      example: "/pokespawn charizard shiny=yes level=50 nature=timid",
      permission: "Nivel 2 (OP / Admin)"
    },
    {
      command: "/pokegive <jugador> <pokemon> [propiedades...]",
      category: "Recompensas & Gimnasios",
      description: "Entrega un Pokémon directamente a la party o caja de un jugador específico con IVs, EVs, objeto y movimientos deseados.",
      example: "/pokegive @p garchomp level=50 nature=jolly ability=roughskin item=rocky_helmet",
      permission: "Nivel 2 (OP / Admin)"
    },
    {
      command: "/pokeheal [jugador]",
      category: "Soporte & Curación",
      description: "Cura completamente la salud (PS), restablece todos los PP de los movimientos y elimina cualquier estado alterado del equipo.",
      example: "/pokeheal @p",
      permission: "Nivel 2 (OP o permitido a usuarios según el server)"
    },
    {
      command: "/pokereload",
      category: "Administración",
      description: "Recarga todos los datapacks, tablas de spawn y archivos de configuración de Cobblemon sin reiniciar el servidor.",
      example: "/pokereload",
      permission: "Nivel 3 (Admin / Consola)"
    },
    {
      command: "/pokebattle <jugador1> <jugador2>",
      category: "Combates & Torneos",
      description: "Fuerza el inicio de un combate reglamentario entre dos jugadores en el servidor.",
      example: "/pokebattle Steve Alex",
      permission: "Nivel 2 (Moderador / Admin)"
    },
    {
      command: "/pokesave",
      category: "Administración",
      description: "Guarda manualmente los datos de todas las parties y PC de los jugadores en el disco.",
      example: "/pokesave",
      permission: "Nivel 3 (Admin)"
    },
    {
      command: "/pokedit <ranura 1-6> [propiedades...]",
      category: "Modificación de Stats",
      description: "Permite modificar propiedades específicas de un Pokémon que ya tienes en tu equipo (cambiar shiny, habilidad, naturaleza, pokeball).",
      example: "/pokedit 1 ivs=31,31,31,31,31,31 nature=adamant",
      permission: "Nivel 2 (Admin)"
    },
    {
      command: "/pc",
      category: "Utilidad",
      description: "Abre el menú del PC de almacenamiento Pokémon desde cualquier lugar sin necesidad de tener un bloque físico cerca.",
      example: "/pc",
      permission: "Depende de la configuración del servidor"
    },
    {
      command: "/teach <ranura 1-6> <movimiento>",
      category: "Entrenamiento",
      description: "Enseña de forma instantánea cualquier movimiento válido al Pokémon situado en esa ranura de tu equipo.",
      example: "/teach 1 earthquake",
      permission: "Nivel 2 (Admin)"
    }
  ];

  // Datos de Drops por Pastoreo (Pasturing Drops)
  const PASTURING_DROPS = [
    {
      family: "Línea Mareep / Flaaffy / Ampharos",
      type: "Eléctrico",
      block: "Hierba, Césped o Bloque de Heno",
      drops: "Lana Blanca, Lana Amarilla, Bola de Lana, Esquirla Luminosa",
      tip: "Mareep pasta en el césped y al pasar el tiempo se le puede trasquilar con tijeras o soltará lana automáticamente en el pastizal."
    },
    {
      family: "Línea Wooloo / Dubwool",
      type: "Normal",
      block: "Césped común o Alpacas de Heno",
      drops: "Lana Blanca densa (hasta 3 bloques) e hilo",
      tip: "Dubwool pasta activamente y regenera su lana en minutos al alimentarse de hierba verde."
    },
    {
      family: "Miltank & Tauros",
      type: "Normal",
      block: "Bloques de Hierba o Flores",
      drops: "Cubo de Leche (clic derecho con cubo vacío), Cuero y Carne tierna",
      tip: "Tener a Miltank en un Pasture Block genera Leche Mu-mu automáticamente en cofres adyacentes o con clic derecho."
    },
    {
      family: "Línea Combee / Vespiquen",
      type: "Bicho / Volador",
      block: "Flores, Cerezos, Colmenas",
      drops: "Frascos de Miel, Panales de abeja y Miel Dulce",
      tip: "Al pastar cerca de flores polinizan los cultivos de Minecraft acelerando su crecimiento como abejas reales."
    },
    {
      family: "Línea Applin / Flapple / Appletun",
      type: "Planta / Dragón",
      block: "Hojas de Roble o Manzanos",
      drops: "Manzanas rojas, Manzana Dulce y Manzana Ácida",
      tip: "Si pastan bajo árboles de roble dejan caer manzanas periódicamente en el suelo."
    },
    {
      family: "Línea Chansey / Blissey",
      type: "Normal",
      block: "Praderas Floreadas o Bloques de Lana Rosa",
      drops: "Huevos de la Suerte (Lucky Eggs) y Huevos normales",
      tip: "Su presencia cura periódicamente a otros Pokémon que estén pastando en el mismo recinto."
    },
    {
      family: "Línea Shuckle",
      type: "Bicho / Roca",
      block: "Roca, Guijarro o Bayas",
      drops: "Zumo de Bayas (Berry Juice) y Bayas raras fermentadas",
      tip: "Coloca bayas en su inventario mientras pasta y las convertirá con el tiempo en Zumo de Bayas curativo."
    },
    {
      family: "Línea Grimer / Muk / Garbodor",
      type: "Veneno",
      block: "Tierra lodosa, Ciénaga",
      drops: "Bola de Slime (Baba), Lodo Negro (Black Sludge)",
      tip: "Excelente granja pasiva de Slime sin necesidad de buscar chunks de slimes en el subsuelo."
    }
  ];

  // Datos explicativos de Crianza (Pasture Block Breeding)
  const BREEDING_STEPS = [
    {
      step: 1,
      title: "El Bloque de Pastura (Pasture Block)",
      desc: "Craftea un Bloque de Pastura con 4 maderas, 1 valla de heno y 1 Pokéball. Colócalo en el centro de un recinto cercado de al menos 10x10 bloques."
    },
    {
      step: 2,
      title: "Compatibilidad de Género & Grupos Huevo (Egg Groups)",
      desc: "Debes liberar en el mismo pastizal a un macho (♂) y una hembra (♀) que compartan al menos un Grupo Huevo (ej: Campo, Monstruo, Dragón), o cualquier Pokémon compatible con Ditto."
    },
    {
      step: 3,
      title: "La Especie del Huevo Siempre Sigue a la Madre",
      desc: "La cría que nazca del huevo siempre será de la especie básica de la madre (o del Pokémon que no sea Ditto si usas a Ditto)."
    },
    {
      step: 4,
      title: "Herencia de IVs (Lazo Destino) y Naturaleza (Piedraeterna)",
      desc: "Si uno de los padres lleva equipada una Piedraeterna (Everstone), la cría hereda el 100% de su naturaleza. Si lleva Lazo Destino (Destiny Knot), hereda 5 IVs de los padres en lugar de 3 aleatorios."
    },
    {
      step: 5,
      title: "Nacimiento e Incubación",
      desc: "Una vez que los padres muestran corazones sobre sus cabezas, aparecerá un Huevo en el Bloque de Pastura o en tu inventario. Llévalo en tu equipo y camina bloques para que eclosione."
    }
  ];

  const filteredCommands = COBBLEMON_COMMANDS.filter(c => 
    c.command.toLowerCase().includes(commandSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(commandSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(commandSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-xs">
      {/* Encabezado Principal */}
      <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#101b17] via-[#0d141e] to-[#070b12] border border-[#1f2d42] shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                📚 Academia CobbleES
              </span>
              <span className="text-[11px] text-zinc-400">
                Manual Maestro de Supervivencia, Servidores y Crianza
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              Comandos, Crianza, Pastoreo & Monturas
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
              Toda la documentación técnica y práctica de Cobblemon explicada paso a paso en español sin tecnicismos confusos.
            </p>
          </div>
        </div>
      </div>

      {/* Navegación por sub-pestañas */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#101623] border border-[#1f2d42] rounded-2xl text-xs">
        {[
          { id: 'commands' as const, label: 'Comandos In-Game', icon: Terminal, color: 'text-emerald-400' },
          { id: 'pasture' as const, label: 'Drops por Pastoreo', icon: Wheat, color: 'text-amber-400' },
          { id: 'breeding' as const, label: 'Guía de Crianza & Huevos', icon: Egg, color: 'text-purple-400' },
          { id: 'mounts' as const, label: 'Mecánica de Monturas', icon: Compass, color: 'text-sky-400' },
          { id: 'megas' as const, label: 'Megas & Addons', icon: Sparkles, color: 'text-purple-400' },
          { id: 'aprijuice' as const, label: 'Jugos de Bonguri (Aprijuice)', icon: Coffee, color: 'text-rose-400' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SUB-TAB 1: LISTA COMPLETA DE COMANDOS Y USOS
         ========================================================================= */}
      {activeSubTab === 'commands' && (
        <div className="space-y-4">
          <div className="bg-[#101623] p-4 rounded-2xl border border-[#1f2d42] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Comandos Oficiales de Cobblemon
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Útiles para administradores, creadores de torneos, gimnasios o partidas en modo creativo/LAN.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="Buscar comando o función..."
                className="w-full bg-[#070b12] border border-[#1f2d42] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredCommands.map((cmd, idx) => (
              <div 
                key={idx}
                className="bg-[#121722] border border-[#1f2d42] hover:border-emerald-500/50 rounded-2xl p-4 transition-all shadow-md space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                      {cmd.command.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {cmd.category}
                    </span>
                  </div>

                  <span className="text-[10px] text-zinc-500 font-mono">
                    Permiso: <strong className="text-zinc-400">{cmd.permission}</strong>
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {cmd.description}
                </p>

                {/* Caja de Código con Copiar */}
                <div className="p-2.5 rounded-xl bg-[#070b12] border border-[#1f2d42] flex items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-emerald-300 truncate select-all">{cmd.example}</span>
                  <button
                    onClick={() => copyToClipboard(cmd.example, idx)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                    title="Copiar comando al portapapeles"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span className="text-emerald-300 font-bold">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 2: DROPS POR PASTOREO (PASTURING DROPS)
         ========================================================================= */}
      {activeSubTab === 'pasture' && (
        <div className="space-y-4">
          <div className="bg-[#101623] p-5 rounded-2xl border border-[#1f2d42] space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wheat className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-base font-bold text-white">
                  Mecánica de Pastoreo & Granjas Automáticas
                </h2>
                <p className="text-xs text-zinc-400">
                  En Cobblemon, cuando dejas a tus Pokémon en un Bloque de Pastura (Pasture Block), interactúan con el terreno y generan recursos renovables de Minecraft.
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs text-amber-200">
              💡 <strong>Consejo Pro:</strong> Puedes colocar tolvas (Hoppers) y cofres debajo del bloque donde pastan tus Pokémon para recolectar automáticamente lana, miel, leche y bayas sin tener que recogerlas tú mismo.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {PASTURING_DROPS.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#121722] border border-[#1f2d42] rounded-2xl p-4 space-y-3 shadow-md hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-[#1f2d42] pb-2.5">
                  <span className="font-bold text-sm text-white">{item.family}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                    Tipo {item.type}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">Bloque o Terreno Necesario:</span>
                    <strong className="text-zinc-200 font-mono text-[11px]">{item.block}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">Recursos que produce (Drops):</span>
                    <strong className="text-emerald-400 font-medium">{item.drops}</strong>
                  </div>

                  <p className="text-[11px] text-zinc-400 bg-[#070b12] p-2.5 rounded-xl border border-[#1f2d42] leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 3: GUÍA SENCILLA DE CRIANZA Y HUEVOS
         ========================================================================= */}
      {activeSubTab === 'breeding' && (
        <div className="space-y-5">
          <div className="bg-[#101623] p-5 rounded-2xl border border-[#1f2d42] space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Egg className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-base font-bold text-white">
                  ¿Cómo funciona la Crianza en Cobblemon? (Explicación Sencilla)
                </h2>
                <p className="text-xs text-zinc-400">
                  La crianza te permite obtener crías con la naturaleza ideal, movimientos huevo exclusivos y estadísticas (IVs) perfectas.
                </p>
              </div>
            </div>
          </div>

          {/* Pasos en Formato Cards Visuales */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {BREEDING_STEPS.map((step) => (
              <div 
                key={step.step}
                className="bg-[#121722] border border-[#1f2d42] rounded-2xl p-4 flex flex-col justify-between space-y-2 shadow-md relative"
              >
                <div>
                  <span className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold font-mono text-xs mb-2">
                    {step.step}
                  </span>
                  <h4 className="font-bold text-white text-xs mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Reglas de Oro de la Crianza */}
          <div className="bg-[#121722] border border-[#1f2d42] rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Los 3 Objetos Clave para la Crianza Competitiva
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-[#070b12] rounded-xl border border-[#1f2d42] space-y-1">
                <strong className="text-amber-400 block font-semibold">1. Piedraeterna (Everstone)</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Equípasela al padre o madre que tenga la <strong>naturaleza deseada</strong> (ej: Firme, Alegre, Miedosa). La cría siempre heredará esa misma naturaleza con un 100% de certeza.
                </p>
              </div>

              <div className="p-3.5 bg-[#070b12] rounded-xl border border-[#1f2d42] space-y-1">
                <strong className="text-rose-400 block font-semibold">2. Lazo Destino (Destiny Knot)</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Equípaselo a cualquiera de los dos padres. Hace que la cría herede <strong>5 de los 6 IVs</strong> combinados de los padres, asegurando crías con estadísticas competitivas superiores.
                </p>
              </div>

              <div className="p-3.5 bg-[#070b12] rounded-xl border border-[#1f2d42] space-y-1">
                <strong className="text-indigo-400 block font-semibold">3. El comodín: Ditto</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Ditto es asexual y puede criar con <strong>cualquier especie</strong> que no sea legendaria o de grupo huevo 'Desconocido'. Facilita criar machos solitarios o Pokémon de género único.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 4: MECÁNICA DE MONTURAS
         ========================================================================= */}
      {activeSubTab === 'mounts' && (
        <div className="bg-[#121722] border border-[#1f2d42] rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            Cómo Montar a tus Pokémon en Minecraft
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#070b12] p-4 rounded-xl border border-[#1f2d42] space-y-1.5">
              <span className="font-bold text-white block text-xs">1. Compatibilidad & Nivel</span>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Verifica en la pestaña de Monturas de CobbleES si la especie es montable. Ciertas criaturas requieren un nivel mínimo o suficiente amistad para dejarse montar.
              </p>
            </div>
            <div className="bg-[#070b12] p-4 rounded-xl border border-[#1f2d42] space-y-1.5">
              <span className="font-bold text-white block text-xs">2. Liberar en el Terreno</span>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Presiona la tecla asignada (por defecto <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono">R</kbd>) apuntando a un espacio libre para sacar al Pokémon al mundo.
              </p>
            </div>
            <div className="bg-[#070b12] p-4 rounded-xl border border-[#1f2d42] space-y-1.5">
              <span className="font-bold text-white block text-xs">3. Clic Secundario & Vuelo</span>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Con la mano vacía, haz clic derecho sobre el lomo del Pokémon. Para volar, mantén pulsada la <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono">Barra Espaciadora</kbd>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 5: ELABORACIÓN DE APRIJUICE
         ========================================================================= */}
      {activeSubTab === 'aprijuice' && (
        <div className="bg-[#121722] border border-[#1f2d42] rounded-2xl p-5 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Coffee className="w-4 h-4 text-rose-400" />
            Elaboración de Jugos de Bonguri (Aprijuice)
          </h2>
          <p className="text-zinc-300 text-xs leading-relaxed">
            Los jugos de bonguri te permiten mejorar permanentemente la velocidad punta, aceleración, estamina y altura de salto de tus monturas en Minecraft.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42]">
              <span className="font-bold text-sky-400 block mb-1">Bonguri Azul / Verde</span>
              <p className="text-zinc-400 text-[11px]">Aumenta la velocidad máxima en bloques por segundo.</p>
            </div>

            <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42]">
              <span className="font-bold text-rose-400 block mb-1">Bonguri Rojo</span>
              <p className="text-zinc-400 text-[11px]">Aumenta la aceleración para alcanzar velocidad punta al instante.</p>
            </div>

            <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42]">
              <span className="font-bold text-amber-400 block mb-1">Bonguri Amarillo</span>
              <p className="text-zinc-400 text-[11px]">Aumenta la reserva de estamina para vuelos largos sin cansarse.</p>
            </div>

            <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42]">
              <span className="font-bold text-purple-400 block mb-1">Bonguri Negro / Blanco</span>
              <p className="text-zinc-400 text-[11px]">Mejora la maniobrabilidad de giro y la altura máxima de salto.</p>
            </div>
          </div>

          <div className="bg-[#070b12] p-4 rounded-xl border border-[#1f2d42] text-zinc-300 flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-white">Procedimiento de Cocina en Minecraft:</strong> Coloca un caldero con agua sobre una fogata encendida. Lanza hasta 3 bonguris del color deseado dentro del agua caliente y, tras unos segundos de ebullición, haz clic derecho con una botella de cristal para recoger tu Aprijuice listo para consumir con tu montura.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-TAB 6: MEGA EVOLUCIONES & ADDONS (Cobblemon: Mega Showdown / Ascension)
         ========================================================================= */}
      {activeSubTab === 'megas' && (
        <div className="space-y-5 bg-[#101623] p-5 rounded-2xl border border-[#1f2d42]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1f2d42] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md border border-purple-500/20">
                  ⚡ Guía Oficial de Expansión
                </span>
                <span className="text-[10px] text-zinc-400">
                  Minecraft 1.21.1 / 1.20.1 (Fabric & NeoForge)
                </span>
              </div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Mega Evoluciones en Cobblemon: ¿Vienen de Base o con Mods?
              </h2>
            </div>
          </div>

          {/* Respuesta directa y clara */}
          <div className="bg-[#0b0f18] p-4 rounded-xl border border-purple-900/40 text-xs text-zinc-300 space-y-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm mb-1">
                  Respuesta Oficial: Cobblemon Base NO incluye Mega Evoluciones
                </h3>
                <p className="text-zinc-300 text-xs leading-relaxed">
                  El equipo de desarrollo oficial de Cobblemon (actualmente en la versión <strong>v1.8.4</strong>) ha priorizado implementar todas las especies base con animaciones Blockbench exclusivas, mecánicas de supervivencia Minecraft (monturas, crianza, pastoreo de drops) y el motor de batalla hasta 9ª Generación. <strong>Mecánicas "gimmick" como Mega Evolución, Dinamax y Teracristalización no forman parte del mod base</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Cómo tener Mega Evoluciones con Mods Addon */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Los 2 Mods Addon Principales para Activar Megas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mod 1: Mega Showdown */}
              <div className="bg-[#0b0f18] p-4 rounded-xl border border-[#20293b] space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm text-purple-300">
                    1. Cobblemon: Mega Showdown (Recomendado)
                  </h4>
                  <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800/60 px-2 py-0.5 rounded-md font-semibold">
                    El más popular
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Es la expansión más completa y descargada en <strong>Modrinth y CurseForge</strong>. Añade Mega Evoluciones, Dinamax / Gigamax, Movimientos Z y Teracristalización, todo perfectamente integrado con los modelos de Cobblemon.
                </p>
                <div className="text-[11px] text-zinc-400 pt-1 space-y-1">
                  <div>• <strong>Añade:</strong> Mega Aro (Mega Ring), Piedra Activadora (Key Stone) y todas las Megapiedras.</div>
                  <div>• <strong>Estructuras:</strong> Genera meteoritos caídos y menas de Raw Mega Ore en capas profundas.</div>
                </div>
              </div>

              {/* Mod 2: Ascension Megamons */}
              <div className="bg-[#0b0f18] p-4 rounded-xl border border-[#20293b] space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm text-sky-300">
                    2. Ascension Megamons
                  </h4>
                  <span className="text-[10px] bg-sky-950 text-sky-300 border border-sky-800/60 px-2 py-0.5 rounded-md font-semibold">
                    Equilibrado
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Addon enfocado de manera pura y exclusiva en las <strong>Mega Evoluciones canónicas</strong>, cuidando al máximo el balance competitivo para servidores que no quieren Dinamax ni Teracristalización.
                </p>
                <div className="text-[11px] text-zinc-400 pt-1 space-y-1">
                  <div>• <strong>Añade:</strong> Megapiedras específicas y Mega Pulsera crafteable.</div>
                  <div>• <strong>Modelos:</strong> Modelos y texturas 3D Blockbench adaptadas a la estética Cobblemon.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Paso a paso para megaevolucionar en Minecraft */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Guía Paso a Paso para Megaevolucionar en Partida
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42] space-y-1">
                <span className="font-mono text-purple-400 font-bold block text-sm">Paso 1</span>
                <span className="font-bold text-white block">Instalar el Mod</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Descarga <em>Cobblemon: Mega Showdown</em> desde Modrinth/CurseForge y colócalo en la carpeta <code>mods</code> de tu cliente y servidor (Fabric o NeoForge).
                </p>
              </div>

              <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42] space-y-1">
                <span className="font-mono text-purple-400 font-bold block text-sm">Paso 2</span>
                <span className="font-bold text-white block">Conseguir el Mega Aro</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Equipa el Mega Ring o Mega Bracelet en la ranura de curios/accesorios de tu personaje. Se encuentra en templos del desierto, fortalezas o crafteando con lingotes y meteoritos.
                </p>
              </div>

              <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42] space-y-1">
                <span className="font-mono text-purple-400 font-bold block text-sm">Paso 3</span>
                <span className="font-bold text-white block">Equipar la Megapiedra</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Dale la Megapiedra correspondiente a tu Pokémon (ej: <em>Charizardita X</em> a Charizard, <em>Lucarionita</em> a Lucario). Mina menas de Mega Ore en minas profundas o vence a Megas salvajes.
                </p>
              </div>

              <div className="bg-[#070b12] p-3.5 rounded-xl border border-[#1f2d42] space-y-1">
                <span className="font-mono text-purple-400 font-bold block text-sm">Paso 4</span>
                <span className="font-bold text-white block">¡Activar en Combate!</span>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Inicia un combate y pulsa el botón de <strong>Mega Evolución</strong> (o la tecla asignada en Controles) antes de elegir tu ataque. ¡Tu Pokémon ganará +100 BST y su nueva habilidad al instante!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
