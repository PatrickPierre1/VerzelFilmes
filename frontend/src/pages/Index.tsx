import Header from "../components/Header";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getMovies, searchMovies } from "../services/movieService";
import { useFavorites } from "../hooks/useFavorites";
import { useSearchParams } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../components/ui/pagination";
import type { Movie } from "../types/movies";

const Index = () => {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const initialGenre = searchParams.get("genre") || "";
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(initialQuery);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const { favoriteTmdbIds, addFavorite, removeFavorite } = useFavorites();
    const [selectedGenre, setSelectedGenre] = useState(initialGenre);
    const [page, setPage] = useState(1);

    const [pendingFavoriteMovie, setPendingFavoriteMovie] = useState<Movie | null>(null);

    const isAuthenticated = () => {
        return localStorage.getItem("authToken") !== null && localStorage.getItem("user") !== null;
    };

    const handleToggleFavorite = (movie: Movie) => {
        if (isAuthenticated()) {
            const isCurrentlyFavorite = favoriteTmdbIds.has(movie.id);
            if (isCurrentlyFavorite) {
                removeFavorite(movie.id);
                toast.success("Filme removido dos favoritos!");
            } else {
                addFavorite({ tmdbId: movie.id, titulo: movie.title });
                toast.success("Filme adicionado aos favoritos!");
            }
        } else {
            setPendingFavoriteMovie(movie);
            setAuthModalOpen(true);
        }
    };

    const handleAuthSuccess = () => {
        if (pendingFavoriteMovie !== null) {
            addFavorite({ tmdbId: pendingFavoriteMovie.id, titulo: pendingFavoriteMovie.title });
            toast.success("Filme adicionado aos favoritos!");
            setPendingFavoriteMovie(null);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            setSearchQuery(inputValue);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [inputValue]);

    useEffect(() => {
        setPage(1);
        setSelectedGenre(searchParams.get("genre") || "");
    }, [searchParams]);

    const { data: movies, isLoading, isError, error } = useQuery({
        queryKey: ['movies', searchQuery, selectedGenre, page],
        queryFn: () => {
            const genreId = selectedGenre ? parseInt(selectedGenre, 10) : undefined;
            if (searchQuery) {
                return searchMovies(searchQuery, page);
            }
            return getMovies({ page, genreId });
        },
        enabled: true
    });

    return (
        <div className="min-h-screen">
            <Header
                searchQuery={inputValue}
                onSearchChange={setInputValue}
                favoritesCount={favoriteTmdbIds.size}
                selectedGenre={selectedGenre}
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
                                isFavorite={favoriteTmdbIds.has(movie.id)}
                                onToggleFavorite={() => handleToggleFavorite(movie)}
                            />
                        ))}
                    </div>
                )}

                {!isLoading && !isError && movies && movies.length > 0 && (
                    <Pagination className="mt-8">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious size={"sm"} onClick={() => setPage(p => Math.max(p - 1, 1))} className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}>
                                    Anterior
                                </PaginationPrevious>
                            </PaginationItem>
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationLink size={"sm"} onClick={() => setPage(page - 1)}>{page - 1}</PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationLink size={"sm"} isActive>{page}</PaginationLink>
                            </PaginationItem>
                            {movies.length === 20 && (
                                <PaginationItem>
                                    <PaginationLink size={"sm"} onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationNext size={"sm"} onClick={() => setPage(p => p + 1)} className={movies.length < 20 ? "pointer-events-none opacity-50" : "cursor-pointer"}>
                                    Próxima
                                </PaginationNext>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </main>
        </div>
    )
};

export default Index;