import { usePokemonController } from "@/controllers/usePokemonController";
//import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import PokemonView from "@/components/PokemonView";

export default function HomeScreen() {
  const { 
    pokemonName, 
    setPokemonName, 
    pokemon, 
    loading, 
    error, 
    handleSearch 
  } = usePokemonController();   

  return (
    <PokemonView 
      pokemonName={pokemonName}
      setPokemonName={setPokemonName}
      pokemon={pokemon}
      loading={loading}
      error={error}
      onSearch={handleSearch}
    />
  );
}

