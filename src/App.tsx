import React, { useState, useEffect } from 'react';
import { Pokemon, POKEMON_DATA } from './data/pokemonData';
import { Navbar } from './components/Navbar';
import { PokedexView } from './components/PokedexView';
import { BiomeExplorerView } from './components/BiomeExplorerView';
import { MountsView } from './components/MountsView';
import { TeamBuilderView } from './components/TeamBuilderView';
import { GuideView } from './components/GuideView';
import { PokemonModal } from './components/PokemonModal';
import { LegalModal } from './components/LegalModal';
import { Scale, ShieldAlert, FileText, ShieldCheck, Box, ExternalLink, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pokedex' | 'biomes' | 'mounts' | 'teambuilder' | 'guide'>('pokedex');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'disclaimer' | 'terms' | 'privacy'>('disclaimer');
  const [team, setTeam] = useState<Pokemon[]>(() => {
    try {
      const saved = localStorage.getItem('cobblemon_team');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cobblemon_team', JSON.stringify(team));
  }, [team]);

  const handleOpenLegal = (tab: 'disclaimer' | 'terms' | 'privacy' = 'disclaimer') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleAddToTeam = (pokemon: Pokemon) => {
    if (team.length >= 6) {
      alert("¡Tu equipo ya tiene 6 Pokémon! Elimina uno en la pestaña de Equipo para hacer espacio.");
      return;
    }
    if (team.some(p => p.id === pokemon.id)) {
      alert(`${pokemon.name_es} ya está en tu equipo.`);
      return;
    }
    setTeam(prev => [...prev, pokemon]);
  };

  const handleRemoveFromTeam = (pokemonId: number) => {
    setTeam(prev => prev.filter(p => p.id !== pokemonId));
  };

  const handleClearTeam = () => {
    if (confirm("¿Estás seguro de que quieres vaciar tu equipo?")) {
      setTeam([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-[#e6edf3] flex flex-col font-sans">
      {/* Barra de Navegación CobbleES */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        teamCount={team.length} 
        onOpenLegal={() => handleOpenLegal('disclaimer')}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {activeTab === 'pokedex' && (
          <PokedexView 
            onSelectPokemon={setSelectedPokemon}
            onAddToTeam={handleAddToTeam}
            team={team}
          />
        )}

        {activeTab === 'biomes' && (
          <BiomeExplorerView 
            onSelectPokemon={setSelectedPokemon}
            onAddToTeam={handleAddToTeam}
            team={team}
          />
        )}

        {activeTab === 'mounts' && (
          <MountsView 
            onSelectPokemon={setSelectedPokemon}
            onAddToTeam={handleAddToTeam}
          />
        )}

        {activeTab === 'teambuilder' && (
          <TeamBuilderView 
            team={team}
            onRemoveFromTeam={handleRemoveFromTeam}
            onAddToTeam={handleAddToTeam}
            onClearTeam={handleClearTeam}
            onOpenPokemon={setSelectedPokemon}
          />
        )}

        {activeTab === 'guide' && (
          <GuideView />
        )}
      </main>

      {/* Modal de Ficha Completa del Pokémon */}
      <PokemonModal 
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        onAddToTeam={handleAddToTeam}
        isInTeam={team.some(p => p.id === selectedPokemon?.id)}
      />

      {/* Modal de Aspectos Legales & Términos */}
      <LegalModal 
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Footer CobbleES */}
      <footer className="border-t border-[#1a2333] bg-[#0c1018]/90 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white shadow-md">
              <Box className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-white font-mono">
                Cobble<span className="text-emerald-400">ES</span>
              </span>
              <p className="text-[11px] text-zinc-500">
                Base de datos comunitaria en español para el mod Cobblemon en Minecraft.
              </p>
            </div>
          </div>

          {/* Enlaces Legales */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => handleOpenLegal('disclaimer')}
              className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Aviso Legal & Marcas</span>
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => handleOpenLegal('terms')}
              className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Términos de Servicio</span>
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => handleOpenLegal('privacy')}
              className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Política de Privacidad</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Legal visible */}
        <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-[#161f2e] text-[11px] text-zinc-500 text-center leading-relaxed">
          <p>
            Pokémon y los nombres de personajes de Pokémon son marcas comerciales y derechos de autor de Nintendo, Game Freak y Creatures Inc. Minecraft es una marca comercial de Mojang AB y Microsoft Corporation. Cobblemon es un mod de código abierto creado por el Cobblemon Team. CobbleES es un proyecto comunitario independiente de fans, sin fines de lucro, desarrollado con fines educativos y de consulta bajo el principio de Uso Legítimo (Fair Use).
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
