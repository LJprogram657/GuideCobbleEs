import React, { useState } from 'react';
import { X, ShieldAlert, FileText, Scale, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'disclaimer' | 'terms' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialTab = 'disclaimer' }) => {
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'terms' | 'privacy'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0f141d] border border-[#212b3d] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#212b3d] bg-[#131a26]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Scale className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Cobble<span className="text-emerald-400">ES</span> • Marco Legal & Privacidad
              </h3>
              <p className="text-[11px] text-zinc-400">
                Aviso legal de marcas, términos de servicio y protección de datos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0b0f17] text-zinc-400 hover:text-white border border-[#212b3d] transition-colors"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pestañas de navegación legal */}
        <div className="flex border-b border-[#212b3d] bg-[#0c1017] px-4 pt-2 gap-2 text-xs">
          {[
            { id: 'disclaimer' as const, label: 'Aviso Legal & Marcas', icon: ShieldAlert },
            { id: 'terms' as const, label: 'Términos de Servicio', icon: FileText },
            { id: 'privacy' as const, label: 'Política de Privacidad', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 font-semibold border-b-2 transition-all ${
                  isActive
                    ? 'border-emerald-500 text-white bg-[#131a26]/60 rounded-t-lg'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-[#131a26]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-4">
          {/* TAB 1: AVISO LEGAL Y MARCAS */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs">
                <strong>Declaración de Afiliación:</strong> CobbleES es un proyecto comunitario independiente sin fines de lucro creado por y para fans. Este sitio web no está afiliado, respaldado, patrocinado ni vinculado de ninguna forma a Nintendo, Game Freak, Creatures Inc., The Pokémon Company ni Mojang AB / Microsoft Corporation.
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">1. Derechos de Autor de Pokémon</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Pokémon y los nombres de los personajes de Pokémon, estadísticas, sprites, mecánicas de batalla, tipos y marcas registradas son propiedad intelectual de <strong>Nintendo</strong>, <strong>Creatures Inc.</strong> y <strong>Game Freak Inc.</strong> Todos los derechos están reservados a sus respectivos propietarios. El contenido presentado en esta plataforma se utiliza bajo el principio de <em>Uso Legítimo (Fair Use)</em> con fines meramente informativos, educativos y de consulta comunitaria.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">2. Derechos de Autor de Minecraft</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Minecraft es una marca registrada de <strong>Mojang AB</strong> y <strong>Microsoft Corporation</strong>. CobbleES no es un producto oficial de Minecraft ni está asociado con Mojang ni Microsoft.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">3. Atribución del Mod Cobblemon</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Cobblemon es un mod de código abierto para Minecraft desarrollado por el <strong>Cobblemon Team</strong>. Los modelos 3D basados en voxel/bloques, texturas y datos de generación en Minecraft pertenecen a sus respectivos autores de la comunidad de código abierto de Cobblemon. CobbleES actúa como una base de datos de consulta en idioma español para facilitar la experiencia a los jugadores hispanohablantes.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TÉRMINOS DE SERVICIO */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white text-base mb-1">1. Aceptación de los Términos</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Al acceder y utilizar <strong>CobbleES</strong>, usted acepta estar sujeto a estos Términos y Condiciones de Uso. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice la plataforma.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">2. Propósito y Uso Permitido</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  CobbleES se proporciona de manera gratuita como herramienta de referencia táctica, consulta de Pokédex, cálculo de sinergias y guía de exploración para jugadores de habla hispana del mod Cobblemon en Minecraft. Queda expresamente prohibido el uso comercial de los datos o herramientas aquí alojadas.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">3. Exactitud de la Información</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Los datos de spawn, botines, estadísticas y compatibilidades competitivas se actualizan periódicamente de acuerdo con las versiones oficiales de Cobblemon (Cobblemon 1.5+). No obstante, los desarrolladores de mods pueden introducir cambios entre versiones, por lo que CobbleES no garantiza la infalibilidad absoluta de cada parámetro en servidores modificados por terceros.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">4. Limitación de Responsabilidad</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  En ningún caso CobbleES ni sus colaboradores serán responsables por ningún daño resultante del uso o de la imposibilidad de usar los materiales o servicios disponibles en esta plataforma web.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: POLÍTICA DE PRIVACIDAD */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-emerald-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>
                  <strong>Compromiso de Privacidad:</strong> CobbleES no recopila datos personales, no requiere registro ni cuentas de usuario, y no vende información a terceros.
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">1. Almacenamiento Local (Local Storage)</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Para permitirle crear y conservar su equipo en el <strong>Constructor de Equipos</strong> sin necesidad de iniciar sesión, CobbleES utiliza la función estándar <code className="text-emerald-400 bg-[#0b0f17] px-1.5 py-0.5 rounded">localStorage</code> de su navegador web. Esta información reside exclusivamente en su propio dispositivo y nunca se transmite a servidores externos.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">2. Cookies y Rastreadores</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  CobbleES no utiliza cookies invasivas de seguimiento publicitario ni redes de rastreo entre sitios web. La navegación es 100% anónima.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-base mb-1">3. Enlaces a Sitios de Terceros</h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Nuestra plataforma puede contener enlaces hacia herramientas oficiales externas como Cobblemon Tools, PokeAPI o GitHub. CobbleES no ejerce control sobre las políticas de privacidad de sitios externos enlazados.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div className="p-4 bg-[#131a26] border-t border-[#212b3d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Creado con pasión para la comunidad hispanohablante de Cobblemon.</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
