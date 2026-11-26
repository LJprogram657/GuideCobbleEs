import React, { useState, useEffect } from 'react';
import { Pokemon } from '../data/pokemonData';
import { getCobblemon3DRender } from '../utils/modelRenderer';

interface PokemonImageProps {
  pokemon: Pokemon;
  className?: string;
  alt?: string;
}

export const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon, className, alt }) => {
  const cleanSlug = pokemon.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const artworkUrl = pokemon.artwork_fallback || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const pixelUrl = `https://play.pokemonshowdown.com/sprites/gen5/${cleanSlug}.png`;

  const [src, setSrc] = useState(pokemon.sprite);

  useEffect(() => {
    let isCancelled = false;

    // Si el Pokémon no tenía sprite.png en el servidor de Cobblemon,
    // renderizamos automáticamente su modelo 3D oficial de Blockbench en tiempo real
    if (!pokemon.has_cobblemon_model) {
      getCobblemon3DRender(pokemon.name).then((dataUrl) => {
        if (!isCancelled && dataUrl) {
          setSrc(dataUrl);
        }
      });
    } else {
      setSrc(pokemon.sprite);
    }

    return () => {
      isCancelled = true;
    };
  }, [pokemon.id, pokemon.name, pokemon.sprite, pokemon.has_cobblemon_model]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Si cobblemon devolvió el "?" de 96x96
    if (img.naturalWidth <= 96 && img.naturalHeight <= 96 && src.includes('cobblemon.tools')) {
      getCobblemon3DRender(pokemon.name).then((dataUrl) => {
        if (dataUrl) {
          setSrc(dataUrl);
        } else {
          setSrc(artworkUrl);
        }
      });
    }
  };

  const handleError = () => {
    if (src.includes('cobblemon.tools')) {
      getCobblemon3DRender(pokemon.name).then((dataUrl) => {
        if (dataUrl) {
          setSrc(dataUrl);
        } else {
          setSrc(artworkUrl);
        }
      });
    } else if (src !== artworkUrl) {
      setSrc(artworkUrl);
    } else {
      setSrc(pixelUrl);
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
