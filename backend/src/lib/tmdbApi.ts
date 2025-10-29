import axios from 'axios';

const TMDB_API_URL = process.env.TMDB_API_URL;
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

if (!TMDB_API_URL || !TMDB_BEARER_TOKEN) {
  throw new Error('As variáveis de ambiente TMDB_API_URL e TMDB_BEARER_TOKEN devem ser definidas.');
}

const tmdbApi = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
});

export default tmdbApi;