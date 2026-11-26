import React, { useState, useEffect } from 'react';
import { Pokemon } from '../data/pokemonData';

interface PokemonImageProps {
  pokemon: Pokemon;
  className?: string;
  alt?: string;
}

export const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon, className, alt }) => {
  const cleanSlug = pokemon.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const home3dUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
  const artworkUrl = pokemon.artwork_fallback || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const showdownAniUrl = `https://play.pokemonshowdown.com/sprites/ani/${cleanSlug}.gif`;

  // Determinar la mejor fuente inicial:
  // Si tiene modelo de Cobblemon oficial, intentamos su sprite de Cobblemon; si no, usamos directamente el modelo 3D oficial de Pokémon HOME.
  const initialSrc = pokemon.has_cobblemon_model && pokemon.sprite && !pokemon.sprite.includes('official-artwork')
    ? pokemon.sprite
    : home3dUrl;

  const [src, setSrc] = useState(initialSrc);
  const [triedHome, setTriedHome] = useState(false);

  useEffect(() => {
    const nextSrc = pokemon.has_cobblemon_model && pokemon.sprite && !pokemon.sprite.includes('official-artwork')
      ? pokemon.sprite
      : home3dUrl;
    setSrc(nextSrc);
    setTriedHome(false);
  }, [pokemon.id, pokemon.sprite, pokemon.has_cobblemon_model, home3dUrl]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Si cobblemon devolvió el sprite "?" de 96x96 píxeles de criatura no implementada
    if (img.naturalWidth <= 96 && img.naturalHeight <= 96 && src.includes('cobblemon.tools')) {
      setSrc(home3dUrl);
      setTriedHome(true);
    }
  };

  const handleError = () => {
    if (src.includes('cobblemon.tools') || !triedHome) {
      setSrc(home3dUrl);
      setTriedHome(true);
    } else if (src === home3dUrl) {
      setSrc(artworkUrl);
    } else if (src === artworkUrl) {
      setSrc(showdownAniUrl);
    }
  };

  return (
    <img
      src={src}
      alt={alt || pokemon.name_es}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      className={className}
    />
  );
};
