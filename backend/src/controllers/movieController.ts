import { Request, Response } from "express";
import {
    getGenres,
    getMovies,
    getMoviesById,
    searchMoviesByName,
} from "../services/movieService";

export const findMovies = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const movieName = req.query.name as string;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const genreId = req.query.with_genres
        ? parseInt(req.query.with_genres as string, 10)
        : undefined;

    try {
        let results;

        if (movieName && movieName.trim().length > 0) {
            results = await searchMoviesByName(movieName, page);
        } else {
            results = await getMovies(page, genreId);
        }

        return res.status(200).json(results);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || "Erro interno ao buscar filmes.",
        });
    }
};

export const findMoviesById = async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id, 10);

    try {
        const results = await getMoviesById(movieId);
        return res.status(200).json(results);
    } catch (error: any) {
        return res.status(500).json({
            message: error.message || "Erro interno ao buscar filmes por ID.",
        });
    }
};

export const findGenres = async (_req: Request, res: Response) => {
    try {
        const genres = await getGenres();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
