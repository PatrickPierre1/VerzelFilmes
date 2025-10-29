import axios from "axios";
import type { Movie, MovieDetailsType } from "../types/movies";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const getMovies = async (page: number = 1): Promise<Movie[]> => {
    const response = await axios.get(`${API_URL}/movies`, {
        params: { page },
    });
    return response.data;
};

export const searchMovies = async (
    query: string,
    page: number = 1
): Promise<Movie[]> => {
    if (!query) {
        return getMovies(page);
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
