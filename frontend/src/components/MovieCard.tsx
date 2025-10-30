import type { Movie } from "../types/movies";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    onToggleFavorite: (movie: Movie) => void;
}
const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
    return (
        <Card className="group relative overflow-hidden border-border bg-gradient-card shadow-card transition-all hover:scale-105 hover:shadow-xl">
            <Link to={`/movie/${movie.id}`}>
                <div className="aspect-[2/3] overflow-hidden">
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                            <span>Sem Imagem</span>
                        </div>
                    )}
                </div>
            </Link>

            <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <Link to={`/movie/${movie.id}`} className="flex-1">
                        <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                            {movie.title}
                        </h3>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleFavorite(movie);
                        }}
                        className="shrink-0 transition-all hover:scale-110"
                    >
                        <Heart
                            className={`h-5 w-5 transition-colors ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                        />
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                        {movie.release_date.split("-")[0]}
                    </Badge>

                    <div className="flex items-center gap-1 rounded-md bg-rating/10 px-2 py-1 shadow-rating">
                        <Star className="h-4 w-4 fill-rating text-rating" />
                        <span className="font-bold text-rating">
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default MovieCard;