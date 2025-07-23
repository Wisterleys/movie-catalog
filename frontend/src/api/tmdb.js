import axios from 'axios';

const TMDB_API_KEY = process.env.VUE_APP_TMDB_API_KEY;
const BASE_URL = process.env.VUE_APP_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'pt-BR'
  }
});

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: { query }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

export const getMovieTrailer = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    const trailers = response.data.results;

    return trailers.length > 0 ? trailers : [];
  } catch (error) {
    console.error('Error fetching movie trailers:', error);
    throw error;
  }
};