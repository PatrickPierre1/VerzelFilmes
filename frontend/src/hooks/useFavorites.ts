import { useState, useEffect, useCallback } from "react";
import {
    favoriteService,
    type FavoriteMovie,
} from "../services/favoriteService";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
    const [favoriteTmdbIds, setFavoriteTmdbIds] = useState<Set<number>>(
        new Set()
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                if (localStorage.getItem("authToken")) {
                    const userFavorites = await favoriteService.getFavorites();
                    setFavorites(userFavorites);
                    setFavoriteTmdbIds(
                        new Set(userFavorites.map((fav) => fav.tmdbId))
                    );
                } else {
                    setFavorites([]);
                    setFavoriteTmdbIds(new Set());
                }
            } catch (error) {
                console.error("Erro ao buscar favoritos:", error);
                setFavorites([]);
                setFavoriteTmdbIds(new Set());
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
        window.addEventListener("authChange", fetchFavorites);
        return () => window.removeEventListener("authChange", fetchFavorites);
    }, []);

    const addFavorite = useCallback(
        async (movie: { tmdbId: number; titulo: string }) => {
            const newFavorite = await favoriteService.addFavorite(movie);
            setFavorites((prev) => [...prev, newFavorite]);
            setFavoriteTmdbIds((prev) => new Set(prev).add(movie.tmdbId));
        },
        []
    );

    const removeFavorite = useCallback(
        async (tmdbId: number) => {
            const favoriteToRemove = favorites.find(
                (fav) => fav.tmdbId === tmdbId
            );
            if (favoriteToRemove) {
                await favoriteService.removeFavorite(favoriteToRemove.id);
                setFavorites((prev) =>
                    prev.filter((fav) => fav.tmdbId !== tmdbId)
                );
                setFavoriteTmdbIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(tmdbId);
                    return newSet;
                });
            }
        },
        [favorites]
    );

    return {
        favorites,
        favoriteTmdbIds,
        addFavorite,
        removeFavorite,
        isLoading,
    };
};
