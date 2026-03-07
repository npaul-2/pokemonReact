import { Pokemon } from "./Pokemon";

export class PokemonBuilder {
  private pokemon: Partial<Pokemon> = {};

  setName(name: string): PokemonBuilder {
    this.pokemon.name = name;
    return this;
  }

  setId(id: number): PokemonBuilder {
    this.pokemon.id = id;
    return this;
  }

  setImageFromSprites(sprites: any): PokemonBuilder {
    //this.pokemon.image = sprites.other?.['official-artwork']?.front_default || sprites.front_default;
    this.pokemon.image = sprites.front_default;
    //this.pokemon.image = this.pokemon.image;
    //source={{ uri: pokemon.image }} 
    //        style={styles.sprite} 
    return this;
  }

  setTypes(typesArray: any[]): PokemonBuilder {
    this.pokemon.types = typesArray.map((t) => t.type.name);
    return this;
  }

  setAbilities(abilitiesArray: any[]): PokemonBuilder {
    this.pokemon.abilities = abilitiesArray.map((a) => a.ability.name);
    return this;
  }

  setMoves(movesArray: any[]): PokemonBuilder {
    this.pokemon.moves = movesArray.slice(0, 5).map((m) => m.move.name);
    return this;
  }

  build(): Pokemon {
    return this.pokemon as Pokemon;
  }
}