import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { getGenres } from "../services/movieService";
import { useNavigate } from "react-router-dom";

interface Genre {
    id: number;
    name: string;
}

interface GenreFilterProps {
    selectedGenre?: string;
}

const GenreFilter = ({ selectedGenre }: GenreFilterProps) => {
    const navigate = useNavigate();
    const { data: genres, isLoading } = useQuery<Genre[]>({
        queryKey: ["genres"],
        queryFn: getGenres,
    });

    const handleGenreChange = (genreId: string) => {
        const params = new URLSearchParams(window.location.search);
        if (genreId && genreId !== "all") {
            params.set("genre", genreId);
        } else {
            params.delete("genre");
        }
        navigate(`/?${params.toString()}`);
    };

    return (
        <Select value={selectedGenre} onValueChange={handleGenreChange} disabled={isLoading}>
            <SelectTrigger className="w-full md:w-[180px] bg-secondary border-border focus:ring-primary">
                <SelectValue placeholder="Filtrar por gênero" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todos os Gêneros</SelectItem>
                {genres?.map((genre) => (
                    <SelectItem key={genre.id} value={String(genre.id)}>
                        {genre.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default GenreFilter;
