//services/TMDBService.js
import axios from 'axios';

const API_KEY = 'da88cd8c747f0c0132b5875c29e15194';
const BASE_URL = 'https://api.themoviedb.org/3';

const TMDBService = {
  fetchMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          page: page,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default TMDBService;