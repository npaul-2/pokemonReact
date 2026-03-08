import { Pokemon } from "@/models/Pokemon";
import { PokemonBuilder } from "@/models/PokemonBuilder";
import { favoritesStorage } from "@/services/favoritesStorage";
import { useEffect, useState } from "react";

// main hook
export const usePokemonController = () => {
  // useState hooks for app status
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const initFavorites = async () => {
      const saved = await favoritesStorage.load();
      setFavorites(saved);
    };
    initFavorites();
  }, []); // happens once at startup

  useEffect(() => {
    favoritesStorage.save(favorites);
  }, [favorites]); //triggers if favorites changes
  
  // calculates if pokemon is favorite
  const isFavorite = pokemon ? favorites.includes(pokemon.name) : false;
  
  // search function
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
      // fetches pokemon json responce
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      
      if (!res.ok) throw new Error("Pokemon not found");

      // puts responce in data after it resolves 
      const data = await res.json();

      // calls builder with data
      const formattedPokemon = new PokemonBuilder()
        .setName(data.name)
        .setId(data.id)
        .setImageFromSprites(data.sprites)
        .setTypes(data.types)
        .setAbilities(data.abilities)
        .setMoves(data.moves)
        .build();

      // sets states
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
      // removes
      setFavorites(favorites.filter((fav) => fav !== pokemon.name));
    } else {
      // adds
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