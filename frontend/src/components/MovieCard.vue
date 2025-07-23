<template>
  <div class="movie-card">
    <img 
      :src="movie.poster_path 
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : '/placeholder-movie.gif'"
      :alt="movie.title"
      class="poster"
      @error="handleImageError"
      loading="lazy"
    />
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <div class="metadata">
        <span class="rating">
          <font-awesome-icon :icon="['fas', 'star']" />
          {{ movie.vote_average?.toFixed(1) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const handleImageError = (event) => {
  event.target.src = '/placeholder-movie.gif';
};
</script>

<style scoped>
.movie-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-5px);
}

.poster {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 2/3;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.movie-info h3 {
  font-size: 1rem;
  margin: 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.metadata {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.rating {
  color: var(--rating-color);
  font-weight: 500;
}
</style>