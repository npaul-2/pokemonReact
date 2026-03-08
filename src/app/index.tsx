import { usePokemonController } from "@/controllers/usePokemonController";
//import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PokemonView from "@/components/PokemonView";

export default function HomeScreen() {
  // calls controller hook
  const { 
    pokemonName, 
    setPokemonName, 
    pokemon, 
    loading, 
    error, 
    handleSearch,
    favorites,
    isFavorite,
    toggleFavorite  
  } = usePokemonController();   

  return (
    // renders view
    <PokemonView 
      pokemonName={pokemonName}
      setPokemonName={setPokemonName}
      pokemon={pokemon}
      loading={loading}
      error={error}
      onSearch={handleSearch}
      favorites={favorites}
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
    />
  );
}

