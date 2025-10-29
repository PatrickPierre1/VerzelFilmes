import { useNavigate } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import { useState } from "react";
import { toast } from "sonner";
import type { Movie } from "../types/movies";

const Favorites = () => {
    const navigate = useNavigate();
    const { favorites, removeFavorite, isLoading } = useFavorites();
    const [inputValue, setInputValue] = useState("");

    const handleSearch = (query: string) => {
        if (query.trim()) {
            navigate(`/?q=${encodeURIComponent(query)}`);
        }
    };

    if (favorites.length === 0) {
        return (
            <>
                <Header
                    searchQuery={inputValue}
                    onSearchChange={setInputValue}
                    favoritesCount={favorites.length}
                    onSearch={handleSearch}
                />
                <div className="flex h-screen flex-col items-center justify-center text-center">
                    <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
                    <h2 className="mb-2 text-2xl font-semibold">Nenhum favorito ainda</h2>
                    <p className="mb-6 text-muted-foreground">
                        Adicione filmes aos favoritos para vê-los aqui
                    </p>
                    <Button onClick={() => navigate("/")}>Explorar Filmes</Button>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen">
            <Header
                searchQuery={inputValue}
                onSearchChange={setInputValue}
                favoritesCount={favorites.length}
                onSearch={handleSearch}
            />
            <div className="container px-4 py-8">

                <div className="mb-8 flex items-center gap-3 mt-10">
                    <Heart className="h-8 w-8 fill-primary text-primary" />
                    <h1 className="text-4xl font-bold">Meus Favoritos</h1>
                </div>

                {isLoading ? (
                    <div className="flex min-h-[400px] items-center justify-center">
                        <div className="flex items-center gap-2 text-lg text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Carregando seus filmes favoritos...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {favorites.map((fav) => (
                            <MovieCard
                                key={fav.id}
                                movie={{ id: fav.tmdbId, title: fav.titulo } as Movie}
                                isFavorite={true}
                                onToggleFavorite={() => {
                                    removeFavorite(fav.tmdbId);
                                    toast.success("Filme removido dos favoritos!");
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
