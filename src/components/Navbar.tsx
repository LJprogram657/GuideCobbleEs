import React from 'react';
import { BookOpen, Compass, Swords, Info, Scale, Box, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: 'pokedex' | 'biomes' | 'mounts' | 'teambuilder' | 'guide';
  setActiveTab: (tab: 'pokedex' | 'biomes' | 'mounts' | 'teambuilder' | 'guide') => void;
  teamCount: number;
  onOpenLegal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  teamCount,
  onOpenLegal
}) => {
  const tabs = [
    { id: 'pokedex' as const, label: 'Pokédex', icon: BookOpen },
    { id: 'biomes' as const, label: 'Biomas Minecraft', icon: MapPin },
    { id: 'mounts' as const, label: 'Monturas', icon: Compass },
    { id: 'teambuilder' as const, label: 'Constructor de Equipos', icon: Swords, badge: teamCount > 0 ? `${teamCount}/6` : null },
    { id: 'guide' as const, label: 'Guía, Comandos & Crianza', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d121c]/95 backdrop-blur-md border-b border-[#1f283a] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo CobbleES con estética Minecraft / Cobblemon */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => setActiveTab('pokedex')}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-extrabold text-white text-base shadow-md shadow-emerald-950/40 border border-emerald-400/30 group-hover:scale-105 transition-transform duration-200">
                <Box className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border border-[#0d121c]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black tracking-tight text-white font-mono">
                  Cobble<span className="text-emerald-400">ES</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/90 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                  v1.8.4
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline -mt-0.5">
                Comunidad Hispana de Cobblemon
              </span>
            </div>
          </div>

          {/* Navegación Principal */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="flex items-center gap-1 sm:gap-1.5 bg-[#080b11]/80 p-1 rounded-xl border border-[#1f283a]">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60 font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{tab.label}</span>
                    {tab.id === 'teambuilder' && (
                      <span className="md:hidden">Equipo</span>
                    )}
                    {tab.id !== 'teambuilder' && (
                      <span className="md:hidden">{tab.label}</span>
                    )}
                    {tab.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive 
                          ? 'bg-white text-emerald-800' 
                          : 'bg-emerald-500 text-white'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Botón de Términos / Legal */}
            <button
              onClick={onOpenLegal}
              className="p-2 rounded-xl bg-[#080b11]/60 hover:bg-[#161f2e] text-zinc-400 hover:text-emerald-400 border border-[#1f283a] transition-all hover:scale-105"
              title="Aviso Legal, Términos y Privacidad"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
