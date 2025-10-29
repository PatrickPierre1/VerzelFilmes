import tmdbApi from "../lib/tmdbApi";
import { Movie } from "../types/movieType";

export interface Genre {
    id: number;
    name: string;
}

export const getMovies = async (
    page: number = 1,
    genreId?: number
): Promise<Movie[]> => {
    try {
        const genreQuery = genreId ? `&with_genres=${genreId}` : "";
        const response = await tmdbApi.get(
            `/discover/movie?language=pt-BR&page=${page}${genreQuery}`
        );
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filmes do TMDB:", error);
        throw new Error("Falha ao buscar filmes do TMDB");
    }
};

export const getGenres = async (): Promise<Genre[]> => {
    try {
        const response = await tmdbApi.get(
            "/genre/movie/list?language=pt-BR"
        );
        return response.data.genres;
    } catch (error) {
        console.error("Erro ao buscar gêneros do TMDB:", error);
        throw new Error("Falha ao buscar gêneros do TMDB");
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

export const getMoviesById = async (id: number): Promise<Movie> => {
    try {
        const response = await tmdbApi.get(`/movie/${id}?language=pt-BR`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes do TMDB:", error);
        throw new Error("Falha ao buscar filmes do TMDB");
    }
};
