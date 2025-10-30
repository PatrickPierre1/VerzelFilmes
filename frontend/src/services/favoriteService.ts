import axios from "axios";
import api from "../lib/api";

const API_URL = import.meta.env.VITE_API_URL + "/favorites" || "http://localhost:3001/api/favorites";

interface SharedFavoritesResponse {
    userName: string | null;
    favorites: FavoriteMovie[];
}
export interface FavoriteMovie {
    id: number;
    tmdbId: number;
    titulo: string;
    userId: number;
    createdAt: string;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("Nenhum token de autenticação encontrado.");
    }
    return { "x-auth-token": token };
};

export const favoriteService = {
    async getFavorites(): Promise<FavoriteMovie[]> {
        const response = await axios.get(API_URL, {
            headers: getAuthHeaders(),
        });
        return response.data;
    },

    async addFavorite(movieData: {
        tmdbId: number;
        titulo: string;
    }): Promise<FavoriteMovie> {
        const response = await axios.post(API_URL, movieData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    },

    async removeFavorite(favoriteMovieId: number): Promise<void> {
        await axios.delete(`${API_URL}/${favoriteMovieId}`, {
            headers: getAuthHeaders(),
        });
    },

    async getSharedFavorites(
        shareToken: string
    ): Promise<SharedFavoritesResponse> {
        const response = await api.get<SharedFavoritesResponse>(
            `/favorites/share/${shareToken}`
        );
        return response.data;
    },
};
