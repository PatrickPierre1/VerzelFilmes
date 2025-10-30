import { useParams } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";

import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { getMovieById } from "../services/movieService";
import { useFavorites } from "../hooks/useFavorites";
import { favoriteService } from "../services/favoriteService";
import AuthModal from "../components/AuthModal";
import type { Movie } from "@/types/movies";

const SharedFavorites = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const { shareToken } = useParams<{ shareToken: string }>();
    const { favoriteTmdbIds, handleToggleFavorite: toggleFavoriteHook } = useFavorites();
    const [pendingFavoriteMovie, setPendingFavoriteMovie] = useState<Movie | null>(null);

    const { data: sharedData, isLoading: isLoadingSharedList, isError, error } = useQuery({
        queryKey: ["sharedFavorites", shareToken],
        queryFn: () => favoriteService.getSharedFavorites(shareToken!),
        enabled: !!shareToken,
    });

    const favoriteMovieDetails = useQueries({
        queries: (sharedData?.favorites || []).map((fav) => ({
            queryKey: ["movie", fav.tmdbId],
            queryFn: () => getMovieById(fav.tmdbId),
            enabled: !!fav.tmdbId,
        })),
    });

    const isLoadingMovieDetails = favoriteMovieDetails.some((q) => q.isLoading);
    const isLoading = isLoadingSharedList || isLoadingMovieDetails;
    const movies = favoriteMovieDetails.map((q) => q.data).filter(Boolean);

    const isAuthenticated = () => {
        return localStorage.getItem("authToken") !== null && localStorage.getItem("user") !== null;
    };

    const handleToggleFavorite = (movie: Movie) => {
        if (isAuthenticated()) {
            toggleFavoriteHook(movie);
        } else {
            setPendingFavoriteMovie(movie);
            setAuthModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        if (pendingFavoriteMovie) {
            toggleFavoriteHook(pendingFavoriteMovie);
            setPendingFavoriteMovie(null);
        }
    };

    if (isError) {
        return (
            <div className="flex h-screen flex-col items-center justify-center text-center">
                <h2 className="mb-2 text-2xl font-semibold text-destructive">
                    Erro ao carregar a lista
                </h2>
                <p className="text-muted-foreground">
                    {(error as Error)?.message || "Esta lista de favoritos não foi encontrada ou não está mais disponível."}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Header searchQuery="" onSearchChange={() => { }} favoritesCount={favoriteTmdbIds.size} onSearch={() => { }} onLoginClick={() => setAuthModalOpen(true)} />
            <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                onAuthSuccess={handleAuthSuccess}
            />
            <div className="container px-4 py-8">
                <div className="mb-8 flex items-center gap-3">
                    <Heart className="h-8 w-8 fill-primary text-primary" />
                    <h1 className="text-4xl font-bold">
                        Favoritos de {sharedData?.userName || "um amigo"}
                    </h1>
                </div>

                {isLoading ? (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="flex items-center gap-2 text-lg text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Carregando filmes favoritos...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {movies.map((movie: any) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isFavorite={favoriteTmdbIds.has(movie.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SharedFavorites;