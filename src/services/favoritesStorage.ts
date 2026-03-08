// long term storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@pokemon_favorites';

export const favoritesStorage = {
  // stores json as string
  async save(favorites: string[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem(FAVORITES_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving favorites", e);
    }
  },

  // loads string back as json
  async load(): Promise<string[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error loading favorites", e);
      return [];
    }
  }
};