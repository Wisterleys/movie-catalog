<template>
  <div class="movie-list">
    <div v-if="movies.length < 1" class="empty-state">
      <p>Nenhum filme encontrado</p>
    </div>
    
    <ul v-else class="movie-grid">
      <li v-for="movie in movies" :key="movie.id" class="movie-card">
        <div class="movie-poster">
          <img 
            :src="movie.poster_path 
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : '/placeholder-movie.gif'"
            :alt="movie.title"
            @error="handleImageError"
          />
        </div>
        <div class="movie-details">
          <h3>{{ movie.title }}</h3>
          <p class="release-date">
            {{ formatDate(movie.release_date) }}
          </p>
          <p class="overview">
            {{ truncateText(movie.overview, 100) }}
          </p>
          <div class="movie-actions">
            <button 
              v-if="isFavorite(movie.id)"
              @click="removeFromFavorites(movie.id)"
              class="action-button remove"
            >
              Remover dos Favoritos
            </button>
            <button 
              v-else
              @click="addToFavorites(movie)"
              class="action-button add"
            >
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { useMoviesStore } from '@/store/movies';

defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => []
  }
});

const moviesStore = useMoviesStore();

const isFavorite = (movieId) => {
  return moviesStore.favorites.some(movie => movie.id === movieId);
};

const addToFavorites = (movie) => {
  moviesStore.addFavorite(movie);
};

const removeFromFavorites = (movieId) => {
  moviesStore.removeFavorite(movieId);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Data desconhecida';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const truncateText = (text, maxLength) => {
  if (!text) return 'Sinopse não disponível';
  return text.length > maxLength 
    ? `${text.substring(0, maxLength)}...` 
    : text;
};

const handleImageError = (event) => {
  event.target.src = '/placeholder-movie.gif';
};
</script>

<style scoped>
/* Estilos com foco em UX responsivo */
.movie-list {
  margin: 2rem 0;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.movie-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.movie-poster {
  height: 200px;
  overflow: hidden;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.movie-card:hover .movie-poster img {
  transform: scale(1.05);
}

.movie-details {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.movie-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.release-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.overview {
  color: #444;
  font-size: 0.95rem;
  flex: 1;
  margin-bottom: 1rem;
}

.movie-actions {
  margin-top: auto;
}

.action-button {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.action-button.add {
  background-color: #42b983;
  color: white;
}

.action-button.add:hover {
  background-color: #3aa876;
}

.action-button.remove {
  background-color: #ff4444;
  color: white;
}

.action-button.remove:hover {
  background-color: #cc0000;
}
</style>