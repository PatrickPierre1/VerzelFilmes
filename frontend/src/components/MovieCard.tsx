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
        <Card className="group relative flex overflow-hidden border-border bg-gradient-card shadow-card transition-all md:flex-col md:hover:scale-105 md:hover:shadow-xl">
            <div className="relative w-24 shrink-0 md:w-full">
                <Link to={`/movie/${movie.id}`} className="block h-full">
                    <div className="aspect-[2/3] h-full overflow-hidden">
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="h-full w-full object-cover transition-transform md:group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
                                <span className="p-1 text-center text-xs">Sem Imagem</span>
                            </div>
                        )}
                    </div>
                </Link>
            </div>

            <CardContent className="flex flex-1 flex-col justify-between p-3 md:p-4">
                <div className="flex flex-col">
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
                            className="h-8 w-8 shrink-0 transition-all hover:scale-110"
                        >
                            <Heart
                                className={`h-5 w-5 transition-colors ${isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                                    }`}
                            />
                        </Button>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                        {movie.release_date.split("-")[0]}
                    </Badge>

                    <div className="flex items-center gap-1 rounded-md bg-rating/10 px-2 py-1 shadow-rating">
                        <Star className="h-4 w-4 fill-rating text-rating" />
                        <span className="text-sm font-bold text-rating md:text-base">
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default MovieCard;