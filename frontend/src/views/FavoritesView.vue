<template>
  <div class="favorites-view">
    <h1>Meus Filmes Favoritos</h1>
    
    <div v-if="moviesStore.favorites.length > 0" class="filters">
      <label for="genre-filter">Filtrar por gênero:</label>
      <select 
        id="genre-filter" 
        v-model="selectedGenre" 
        class="genre-select"
      >
        <option :value="null">Todos</option>
        <option 
          v-for="genre in genres" 
          :key="genre.id" 
          :value="genre.id"
        >
          {{ genre.name }}
        </option>
      </select>
    </div>
    
    <MovieList 
      :movies="filteredFavorites" 
      class="favorites-list"
    />
    
    <div v-if="moviesStore.favorites.length === 0" class="empty-favorites">
      <p>Você ainda não adicionou nenhum filme aos favoritos.</p>
      <router-link to="/" class="browse-link">
        Buscar filmes
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMoviesStore } from '@/store/movies';
import { getGenres } from '@/api/tmdb';
import MovieList from '@/components/MovieList.vue';

const moviesStore = useMoviesStore();
const selectedGenre = ref(null);
const genres = ref([]);

onMounted(async () => {
  try {
    genres.value = await getGenres();
  } catch (error) {
    console.error('Error loading genres:', error);
  }
});

const filteredFavorites = computed(() => {
  return moviesStore.favoritesByGenre(selectedGenre.value);
});
</script>

<style scoped>
.favorites-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.filters {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.genre-select {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
}

.empty-favorites {
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.empty-favorites p {
  color: #666;
  margin-bottom: 1rem;
}

.browse-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.browse-link:hover {
  background-color: #3aa876;
}
</style>