import { Pokemon } from "@/models/Pokemon";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Easing,
  Image,
  ScrollView, StyleSheet, Text, TextInput,
  View
} from "react-native";

interface PokemonViewProps {
  pokemonName: string;
  setPokemonName: (name: string) => void;
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
  favorites: string[];
  isFavorite: boolean;
  toggleFavorite: () => void;
  onSearch: (name?: string) => void;  
}

export default function PokemonView({
  pokemonName,
  setPokemonName,
  pokemon,
  loading,
  error,
  onSearch,
  favorites,
  isFavorite,
  toggleFavorite

}: PokemonViewProps) {

  // values for animation
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // waits until pokemon changes 
    if (pokemon) {
      // resets animation values
      fadeAnim.setValue(0);
      spinAnim.setValue(0);
      
      // fades and spins at the same time
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pokemon]); // trigger

  // makes spin value be in degrees 
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'], 
  });

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

      {/* calls onSearch */}
      <Button 
        title="Get Pokemon" 
        onPress={() => onSearch()} 
        disabled={loading} 
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Makes favorite chips to click */}
      <View style={styles.favoritesContainer}>
        <Text style={styles.label}>Favorites:</Text>
        <View style={styles.favoriteRow}>
         {favorites.map((fav) => (
            <Text 
              key={fav} 
             style={styles.favoriteChip} 
            onPress={() => onSearch(fav)}
            >
              {fav}
         </Text>
         ))}
    </View>
  </View>
      {/* doesn't display unless its done loading and it has a valid pokemon */}
      {pokemon && !loading && (
        <Animated.View style={[
          styles.resultCard, 
          { 
            opacity: fadeAnim, 
            transform: [{ rotate: spin }] 
          }
        ]}>

        <View style={styles.favoriteButtonContainer}>
            <Button 
              title={isFavorite ? "★ Unfavorite" : "☆ Add to Favorites"} 
              onPress={toggleFavorite}
              color={isFavorite ? "#f39c12" : "#2980b9"}
             />
          </View>

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
        </Animated.View>
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
  favoritesContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "flex-start",
  },
  favoriteRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 5,
  },
  favoriteChip: {
    backgroundColor: "#ececec",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    overflow: "hidden",
  },
  favoriteButtonContainer: {
    marginBottom: 10,
    width: "100%",
  }
});