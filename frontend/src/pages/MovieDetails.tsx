import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Calendar, Heart, ArrowLeft } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/movieService";
import type { MovieDetailsType } from "../types/movies";
import Header from "../components/Header";
import { useState } from "react";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const { favorites, toggleFavorite } = useFavorites();

    const { data: movie, isLoading, isError, error } = useQuery<MovieDetailsType, Error>({
        queryKey: ['movie', id],
        queryFn: () => getMovieById(Number(id)),
        enabled: !!id,
    });

    const handleSearch = (query: string) => {
        if (query.trim()) {
            navigate(`/?q=${encodeURIComponent(query)}`);
        }
    };

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center"><p className="text-lg text-muted-foreground">Carregando detalhes do filme...</p></div>;
    }

    if (isError || !movie) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{isError ? "Erro ao buscar filme" : "Filme não encontrado"}</h2>
                    {isError && <p className="text-muted-foreground">{(error as Error).message}</p>}
                    <Button onClick={() => navigate("/")} className="mt-4">
                        Voltar para início
                    </Button>
                </div>
            </div>
        );
    }

    const isFavorite = favorites.includes(movie.id);

    return (
        <div className="min-h-screen">
            <Header
                searchQuery={inputValue}
                onSearchChange={setInputValue}
                favoritesCount={favorites.length}
                onSearch={handleSearch}
            />
            <div className="relative">
                <div className="absolute inset-0 overflow-hidden">
                    <img src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
                        alt={movie.title}
                        className="h-full w-full object-cover opacity-20 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                </div>

                <div className="container relative px-4 py-12">
                    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
                        <div className="mx-auto w-full max-w-sm lg:mx-0">
                            <img
                                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                                alt={movie.title}
                                className="w-full rounded-2xl shadow-2xl"
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h1 className="mb-3 text-4xl font-bold lg:text-5xl">{movie.title}</h1>

                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-2 rounded-lg bg-rating/10 px-4 py-2 shadow-rating">
                                        <Star className="h-6 w-6 fill-rating text-rating" />
                                        <span className="text-2xl font-bold text-rating">
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            ({movie.vote_count.toLocaleString()} votos)
                                        </span>
                                    </div>

                                    <Button
                                        onClick={() => toggleFavorite(movie.id)}
                                        variant={isFavorite ? "default" : "outline"}
                                        size="lg"
                                        className="transition-all hover:scale-105"
                                    >
                                        <Heart
                                            className={`mr-2 h-5 w-5 ${isFavorite ? "fill-primary-foreground" : ""
                                                }`}
                                        />
                                        {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <span>
                                        {new Date(movie.release_date).toLocaleDateString("pt-BR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    <span>{movie.runtime} minutos</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre: { id: number; name: string }) => (
                                    <Badge key={genre.id} variant="secondary" className="text-sm">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>

                            <div>
                                <h2 className="mb-3 text-2xl font-semibold">Sinopse</h2>
                                <p className="text-lg leading-relaxed text-muted-foreground">
                                    {movie.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
