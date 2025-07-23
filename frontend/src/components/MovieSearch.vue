<template>
  <div class="search-container">
    <form @submit.prevent="handleSearch">
      <div class="search-input-group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar filmes..."
          class="search-input"
          @input="resetError"
        />
        <button type="submit" class="search-button" :disabled="isLoading">
          <span v-if="!isLoading">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </span>
          <span v-else class="loading-dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMoviesStore } from '@/store/movies';
import { searchMovies } from '@/api/tmdb';

const moviesStore = useMoviesStore();
const searchQuery = ref('');
const error = ref(null);

const isLoading = ref(false);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    error.value = 'Por favor, digite um termo para buscar';
    return;
  }

  try {
    isLoading.value = true;
    const results = await searchMovies(searchQuery.value);
    moviesStore.searchResults = results;
    error.value = null;
  } catch (err) {
    error.value = 'Ocorreu um erro ao buscar filmes. Tente novamente.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const resetError = () => {
  if (error.value) error.value = null;
};
</script>

<style scoped>
/* Estilos otimizados para UX */
.search-container {
  max-width: 600px;
  margin: 2rem auto;
}

.search-input-group {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-button {
  background: transparent;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.search-button span{
  background: transparent;
}

.search-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.search-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.loading-dots span {
  animation: blink 1.4s infinite both;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style>