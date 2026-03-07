import { Pokemon } from "@/models/Pokemon";
import React from "react";
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

interface PokemonViewProps {
  pokemonName: string;
  setPokemonName: (name: string) => void;
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  onSearch: () => void;
}

export default function PokemonView({
  pokemonName,
  setPokemonName,
  pokemon,
  loading,
  error,
  onSearch,
}: PokemonViewProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={onSearch} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {pokemon && !loading && (
        <View style={styles.resultCard}>
          <Text style={styles.pokemonName}>
            #{pokemon.id} {pokemon.name?.toUpperCase()}
          </Text>

          <Image source={{ uri: pokemon.image }} style={styles.sprite} />

          <View style={styles.typesContainer}>
            <Text style={styles.label}>Types: </Text>
            {pokemon.types.map((typeName, index) => (
              <Text key={index} style={styles.typeBadge}>{typeName.toUpperCase()}</Text>
            ))}
          </View>

          <View style={styles.movesContainer}>
            <Text style={styles.label}>First 5 Moves:</Text>
            {pokemon.moves.map((moveName, index) => (
              <Text key={index} style={styles.moveText}>• {moveName.replace("-", " ")}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Abilities:</Text>
            <View style={styles.abilityRow}>
              {pokemon.abilities.map((abilityName, index) => (
                <Text key={index} style={styles.abilityBadge}>{abilityName.replace("-", " ")}</Text>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontWeight: "bold",
  },
  resultCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  movesContainer: {
    marginTop: 15,
    alignItems: "flex-start",
    width: "100%",
  },
  moveText: {
    fontSize: 14,
    color: "#555",
    textTransform: "capitalize",
    marginLeft: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  typesContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    alignItems: "center",
  },
  typeBadge: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    fontSize: 12,
    overflow: "hidden",
  },
  sprite: {
    width: 150,
    height: 150,
  },
  section: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  abilityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  abilityBadge: {
    fontSize: 14,
    color: "#444",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    textTransform: "capitalize",
  },
});