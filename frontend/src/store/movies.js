import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
    searchResults: [],
    isLoading: false,
    error: null
  }),
  actions: {
    addFavorite(movie) {
      if (!this.favorites.some(fav => fav.id === movie.id)) {
        this.favorites.push(movie);
        this.persistFavorites();
      }
    },
    removeFavorite(movieId) {
      this.favorites = this.favorites.filter(movie => movie.id !== movieId);
      this.persistFavorites();
    },
    persistFavorites() {
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favorites));
    }
  },
  getters: {
    favoriteGenres: (state) => {
      const allGenres = state.favorites.flatMap(movie => movie.genre_ids);
      return [...new Set(allGenres)];
    },
    favoritesByGenre: (state) => (name) => {
      if(state.favorites.length === 0) {
        return [...state.favorites];
      }
      return name 
        ? state.favorites.filter(movie => movie.genres?.some(genre => genre.name === name))
        : state.favorites;
    }
  }
});