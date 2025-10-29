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

export const searchMoviesByName = async (
    query: string,
    page: number = 1
): Promise<Movie[]> => {
    if (!query || query.trim() === "") {
        throw new Error("O termo de busca não pode ser vazio.");
    }

    try {
        const response = await tmdbApi.get(
            `/search/movie?language=pt-BR&query=${encodeURIComponent(
                query
            )}&page=${page}`
        );
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filmes por nome no TMDB:", error);
        throw new Error("Falha ao buscar filmes por nome no TMDB");
    }
};
