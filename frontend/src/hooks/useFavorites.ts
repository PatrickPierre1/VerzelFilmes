import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "verzel-filmes-favorites";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback((movieId: number) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(movieId)
                ? prevFavorites.filter((id) => id !== movieId)
                : [...prevFavorites, movieId]
        );
    }, []);

    return { favorites, toggleFavorite };
};
