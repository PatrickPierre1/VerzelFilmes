import tmdbApi from "../lib/tmdbApi";
import { Movie } from "../types/movieType";

export const getMovies = async (page: number = 1): Promise<Movie[]> => {
    try {
        const response = await tmdbApi.get(
            `/movie/popular?language=pt-BR&page=${page}`
        );
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filmes do TMDB:", error);
        throw new Error("Falha ao buscar filmes do TMDB");
    }
};
