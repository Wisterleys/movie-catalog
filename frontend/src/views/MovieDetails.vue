<template>
  <div class="movie-details-container">
    <!-- Cabeçalho com botão de voltar -->
    <button @click="$router.go(-1)" class="back-button">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      Voltar
    </button>

    <!-- Seção principal do filme -->
    <div class="movie-header">
      <div class="poster-container">
        <img 
          :src="movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.gif'"
          :alt="`Poster de ${movie.title}`"
          class="detail-poster"
          @error="handleImageError"
          loading="lazy"
        />
        <button 
          v-if="!isFavorite"
          @click="toggleFavorite"
          class="favorite-button"
          :class="{ 'is-favorite': isFavorite }"
          aria-label="Adicionar aos favoritos"
        >
          <font-awesome-icon :icon="['fas', isFavorite ? 'heart' : 'heart-circle-plus']" />
          {{ isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
        </button>
      </div>

      <div class="header-info">
        <h1>{{ movie.title }}</h1>
        <div class="metadata">
          <span class="rating">
            <font-awesome-icon :icon="['fas', 'star']" />
            {{ movie.vote_average?.toFixed(1) }}/10
          </span>
          <span v-if="movie.runtime">
            <font-awesome-icon :icon="['fas', 'clock']" />
            {{ formatRuntime(movie.runtime) }}
          </span>
          <span>
            <font-awesome-icon :icon="['fas', 'calendar-day']" />
            {{ formatDate(movie.release_date) }}
          </span>
          
        </div>

        <div class="genres" v-if="movie.genres?.length">
          <span v-for="genre in movie.genres" :key="genre.id" class="genre-tag">
            {{ genre.name }}
          </span>
        </div>

        <section class="overview-section" v-if="movie.overview">
          <h2><font-awesome-icon :icon="['fas', 'file-lines']" /> Sinopse</h2>
          <p>{{ movie.overview }}</p>
        </section>

        <div class="action-buttons">
          <a 
            v-if="movie.homepage"
            :href="movie.homepage" 
            target="_blank"
            class="official-button"
          >
            <font-awesome-icon :icon="['fas', 'arrow-up-right-from-square']" />
            Site Oficial
          </a>
        </div>
      </div>
    </div>

    <div class="movie-content">

      <section class="trailer-section">
        <h2><font-awesome-icon :icon="['fas', 'film']" /> Trailer</h2>

        <div class="video-container" v-if="trailer?.key">
          <iframe
            width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${trailer?.key}?rel=0&autoplay=0&modestbranding=1&nocache=${trailer?.key}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
            :title="'Trailer de ' + trailer.name"
          ></iframe>
        </div>

        <div class="no-trailer" v-else>
          Nenhum trailer disponível
        </div>
      </section>

      <section v-if="movie.credits?.cast?.length" class="cast-section">
        <h2><font-awesome-icon :icon="['fas', 'users']" /> Elenco Principal</h2>
        <div class="cast-grid">
            <div 
              v-for="person in movie.credits.cast.slice(0, 6)" 
              :key="person.id" 
              class="cast-card"
              :aria-label="`Ator: ${person.name}, papel: ${person.character}`"
            >

            <img 
              :src="person.profile_path 
                ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                : '/placeholder-person.png'"
              :alt="person.name"
              loading="lazy"
            />
            <p class="actor-name">{{ person.name }}</p>
            <p class="character">{{ person.character }}</p>
          </div>
        </div>
      </section>

      <section v-if="similarMovies?.length" class="similar-section">
        <h2><font-awesome-icon :icon="['fas', 'clapperboard']" /> Filmes Similares</h2>
        <div class="similar-grid">
          <MovieCard 
            v-for="similar in similarMovies.slice(0, 4)"
            :key="similar.id"
            :movie="similar"
            compact
            @click="handleClick(similar.id)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMoviesStore } from '@/store/movies';
import { getMovieDetails, getSimilarMovies, getMovieTrailer } from '@/api/tmdb';
import { formatDate, formatRuntime } from '@/utils/helpers';
import MovieCard from '@/components/MovieCard.vue';

const siteType = 'YouTube';
const videoType = 'Trailer';
const route = useRoute();
const router = useRouter();
const moviesStore = useMoviesStore();
const movie = ref({});
const videos = ref([]);
const similarMovies = ref([]);
const trailer = ref(null);
const loading = ref(false);
const error = ref(null);

const isFavorite = computed(() => {
  return moviesStore.favorites.some(fav => fav.id === movie.value.id);
});

const fetchMovieDetails = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    movie.value = await getMovieDetails(route.params.id);
    similarMovies.value = await getSimilarMovies(route.params.id);
    

    await fetchMovieTrailer();
  } catch (err) {
    console.error('Error fetching movie details:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const fetchMovieTrailer = async () => {
  try {
    const response = await getMovieTrailer(route.params.id);
    if(response.length < 1) {
      return;
    }

    videos.value = response;
    trailer.value = getTrailer(videos.value);
  } catch (err) {
    console.error('Error fetching movie trailer:', err);
    error.value = 'Failed to load trailer';
    videos.value = [];
    trailer.value = null;
  }
};

const getTrailer = (videoList) => {
  if (!videoList || !videoList.length) return null;
  
  const officialTrailer = videoList.find(video => 
    video.type === videoType && video.official && video.site === siteType
  );

  const youtubeVideo = videoList.find(video => 
    video.site === siteType
  );

  return officialTrailer || youtubeVideo || null;
};

const toggleFavorite = () => {
  if (isFavorite.value) {
    moviesStore.removeFavorite(movie.value.id);
  } else {
    moviesStore.addFavorite(movie.value);
  }
};

const handleClick = (movieId) => {
  router.push({ 
    name: 'MovieDetails', 
    params: { id: movieId }
  });
};

onMounted(fetchMovieDetails);
watch(() => route.params.id, fetchMovieDetails);
</script>

<style scoped>
.movie-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text-primary);
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.no-trailer {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-style: italic;
}

.overview-section p {
  line-height: 1.6;
  max-width: 800px;
  margin: auto;
  white-space: pre-line;
}


.back-button {
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(var(--primary-rgb), 0.1);
  transform: translateX(-4px);
}

.movie-header {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.poster-container {
  position: relative;
  min-width: 300px;
}

.detail-poster {
  width: 100%;
  max-width: 350px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.detail-poster:hover {
  transform: scale(1.02);
}

.favorite-button {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 2;
}

.favorite-button:hover {
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.favorite-button.is-favorite {
  background: var(--accent-color);
}

.header-info {
  flex: 1;
}

h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem;
  color: var(--text-primary);
  line-height: 1.2;
}

.metadata {
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  align-items: center;
}

.metadata svg {
  margin-right: 0.3rem;
  opacity: 0.8;
}

.metadata span {
  color: var(--text-primary);
  font-weight: 500;
}

.rating {
  color: var(--rating-color);
  font-weight: bold;
}

.genres {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;
}

.genre-tag {
  background: var(--tag-bg);
  color: var(--tag-text);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.official-button {
  background: var(--secondary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.official-button:hover {
  background: var(--secondary-dark);
  transform: translateY(-2px);
}

.movie-content {
  margin-top: 3rem;
}

section {
  margin-bottom: 4rem;
  transition: all 0.3s ease;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

h2 svg {
  color: var(--primary-color);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  margin-top: 1.5rem;
  background: var(--bg-secondary);
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.cast-grid, .similar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.cast-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  text-align: center;
}

.cast-card:hover {
  transform: translateY(-5px);
}

.cast-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.actor-name {
  font-weight: 600;
  margin: 0.5rem 0 0.25rem;
  padding: 0 0.5rem;
}

.character {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0 0 1rem;
  padding: 0 0.5rem;
}

@media (max-width: 768px) {
  .movie-header {
    flex-direction: column;
  }
  
  .poster-container {
    margin: 0 auto;
  }
  
  .favorite-button {
    position: relative;
    bottom: auto;
    left: auto;
    transform: none;
    margin-top: 1.5rem;
    justify-content: center;
  }
  
  .metadata {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .cast-grid, .similar-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>