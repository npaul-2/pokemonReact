import { Pokemon } from "@/models/Pokemon";
import { PokemonBuilder } from "@/models/PokemonBuilder";
import { useState } from "react";

export const usePokemonController = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = pokemon ? favorites.includes(pokemon.name) : false;
  async function handleSearch(nameOverride?: string) {
    const query = (nameOverride || pokemonName).trim().toLowerCase();
    if (!query) {
      setError("Please enter a Pokemon name");
      return;
    }

    setLoading(true);
    setError(null);
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      
      if (!res.ok) throw new Error("Pokemon not found");

      const data = await res.json();

      const formattedPokemon = new PokemonBuilder()
        .setName(data.name)
        .setId(data.id)
        .setImageFromSprites(data.sprites)
        .setTypes(data.types)
        .setAbilities(data.abilities)
        .setMoves(data.moves)
        .build();

      setPokemon(formattedPokemon);
      setPokemonName(data.name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleFavorite = () => {
    if (!pokemon) return;

    if (favorites.includes(pokemon.name)) {
      setFavorites(favorites.filter((fav) => fav !== pokemon.name));
    } else {
      setFavorites([...favorites, pokemon.name]);
    }
  };

  return {
    pokemonName,
    setPokemonName,
    pokemon,
    loading,
    error,
    handleSearch,
    favorites,
    isFavorite,
    toggleFavorite,
  };
};