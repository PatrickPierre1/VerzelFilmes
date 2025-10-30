import axios from "axios";
import type { Movie, MovieDetailsType } from "../types/movies";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const getMovies = async (
    { page = 1, genreId }: { page?: number; genreId?: number } = {}
): Promise<Movie[]> => {
    const params: any = { page };
    if (genreId) {
        params.with_genres = genreId;
    }
    const response = await axios.get(`${API_URL}/movies`, {
        params,
    });
    return response.data;
};

export const searchMovies = async (
    query: string,
    page: number = 1
): Promise<Movie[]> => {
    if (!query) {
        return getMovies({ page });
    }
    const response = await axios.get(`${API_URL}/movies`, {
        params: { name: query, page },
    });
    return response.data;
};

export const getMovieById = async (id: number): Promise<MovieDetailsType> => {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return response.data;
};
export const getGenres = async (): Promise<any[]> => {
    const response = await axios.get(`${API_URL}/genres`);
    return response.data;
};
