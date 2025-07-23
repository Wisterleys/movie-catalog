<template>
  <main class="home-view">
    <div class="header">
      <h1 class="title">Catálogo de Filmes</h1>
      <router-link 
        to="/favorites" 
        class="favorites-badge"
        aria-label="Ver favoritos"
      >
        <font-awesome-icon :icon="['fas', 'heart']" class="icon" />
        <span class="count" v-if="moviesStore.favorites.length > 0">
          {{ moviesStore.favorites.length }}
        </span>
      </router-link>
    </div>
    
    <MovieSearch />
    <MovieList :movies="moviesStore.searchResults" />
  </main>
</template>

<script setup>
import { useMoviesStore } from '@/store/movies';
import MovieSearch from '@/components/MovieSearch.vue';
import MovieList from '@/components/MovieList.vue';

const moviesStore = useMoviesStore();
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.favorites-badge {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ff4444;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
}

.favorites-badge:hover {
  transform: scale(1.1);
}

.icon {
  margin-right: 0.3rem;
}

.count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Acessibilidade - foco visível */
.favorites-badge:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>