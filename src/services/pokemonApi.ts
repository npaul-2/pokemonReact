export interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string[];
  weight: number;
  abilities: { name: string; is_hidden: boolean }[];
  moves: string[];
}

export async function fetchPokemon(name: string): Promise<PokemonData> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t: any) => t.type.name),
    weight: data.weight,
    // Extract name and status for abilities
    abilities: data.abilities.map((a: any) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden,
    })),
    // Extract names for moves
    moves: data.moves.map((m: any) => m.move.name),
  };
}