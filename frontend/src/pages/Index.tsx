import Header from "../components/Header";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/movieService";
import { useFavorites } from "../hooks/useFavorites";
import { useSearchParams } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const Index = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(initialQuery);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const { favorites, toggleFavorite } = useFavorites();

    const [pendingFavoriteMovieId, setPendingFavoriteMovieId] = useState<number | null>(null);

    const isAuthenticated = () => {
        return localStorage.getItem("authToken") !== null && localStorage.getItem("user") !== null;
    };

    const handleToggleFavorite = (movieId: number) => {
        if (isAuthenticated()) {
            toggleFavorite(movieId);
        } else {
            setPendingFavoriteMovieId(movieId);
            setAuthModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        if (pendingFavoriteMovieId !== null) {
            toggleFavorite(pendingFavoriteMovieId);
            setPendingFavoriteMovieId(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(inputValue);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [inputValue]);

    const { data: movies, isLoading, isError, error } = useQuery({
        queryKey: ['movies', searchQuery],
        queryFn: () => searchMovies(searchQuery),
        enabled: true
    });

    return (
        <div className="min-h-screen">
            <Header
                searchQuery={inputValue}
                onSearchChange={setInputValue}
                favoritesCount={favorites.length}
            />
            <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                onAuthSuccess={handleAuthSuccess}
            />
            <main className="container px-4 py-8">
                {searchQuery && !isLoading && (
                    <div className="mb-6">
                        <p className="text-lg text-muted-foreground">
                            {movies?.length ?? 0} resultado(s) para "{searchQuery}"
                        </p>
                    </div>
                )}

                {isLoading && (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <p className="text-lg text-muted-foreground">Carregando filmes...</p>
                    </div>
                )}

                {isError && (
                    <div className="flex min-h-[400px] items-center justify-center text-center">
                        <div>
                            <h2 className="mb-2 text-2xl font-semibold text-destructive">Erro ao buscar filmes</h2>
                            <p className="text-muted-foreground">{error.message}</p>
                        </div>
                    </div>
                )}

                {!isLoading && !isError && movies?.length === 0 ? (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="text-center">
                            <h2 className="mb-2 text-2xl font-semibold">Nenhum filme encontrado</h2>
                            <p className="text-muted-foreground">Tente buscar com outros termos</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {movies?.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                isFavorite={favorites.includes(movie.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
};

export default Index;