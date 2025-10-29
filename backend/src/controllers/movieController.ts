import { Router, Request, Response } from "express";
import { getMovies } from "../services/movieService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    try {
        const movies = await getMovies(page);
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar filmes." });
    }
});

export default router;
