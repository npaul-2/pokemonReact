import { useState } from "react";
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

async function handleSearch() {
    const q = pokemonName.trim();
    if (!q) {
      setError("Please enter a name");
      return;
    }

    setError(null);
    setLoading(true);
    setPokemon(null);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${q.toLowerCase()}`);

      if (!res.ok) {
        throw new Error("Pokemon not found. Try playing a game that's fun");
      }

      const data = await res.json(); 
      
      console.log("JSON response:", data);
      setPokemon(data);

    } catch (er) {
      setError(er.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop:20}}/>}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {pokemon && (

        
        <View style={styles.resultCard}>

          <Text style={styles.pokemonName}>
            #{pokemon.id} {pokemon.name?.toUpperCase()}
          </Text>          

          <Image 
            source={{ uri: pokemon.sprites.front_default }} 
            style={styles.sprite} 
          />

          <View style={styles.typesContainer}>
           <Text style={styles.label}>Types: </Text>
            {pokemon.types.map((typeInfo, index) => (
             <Text key={index} style={styles.typeBadge}>
              {typeInfo.type.name.toUpperCase()}
             </Text>
            ))}
          </View>

          <View style={styles.movesContainer}>
            <Text style={styles.label}>First 5 Moves:</Text>
            {pokemon.moves.slice(0, 5).map((moveItem, index) => (
            <Text key={index} style={styles.moveText}>
              • {moveItem.move.name.replace("-", " ")}
            </Text>
            ))}
          </View>

          <View style={styles.section}>
           <Text style={styles.label}>Abilities:</Text>
            <View style={styles.abilityRow}>
              {pokemon.abilities.map((item, index) => (
              <Text key={index} style={styles.abilityBadge}>
                {item.ability.name.replace("-", " ")}
                {item.is_hidden && " (Hidden)"}
              </Text>
              ))}
            </View>
          </View>

          <Text>Weight: {pokemon.weight}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
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
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontWeight: "bold",
  },
  resultCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  movesContainer: {
    marginTop: 15,
    alignItems: "flex-start", // Aligns the list to the left
    width: "100%",
  },
  moveText: {
    fontSize: 14,
    color: "#555",
    textTransform: "capitalize", // Automatically capitals the first letter
    marginLeft: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  typesContainer: {
    flexDirection: "row", // Puts types side-by-side
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
    overflow: "hidden", // Required for borderRadius on some Android components
  },
  sprite: {
    width: 150,
    height: 150,
    marginBottom: -10, // Pulls the name closer to the image
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