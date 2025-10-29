import { Request, Response } from "express";
import favoriteService from "../services/favoriteService";

declare global {
    namespace Express {
        interface Request {
            user?: { id: number };
        }
    }
}

const favoriteController = {
    async addFavorite(req: Request, res: Response) {
        const userId = req.user?.id;
        const { tmdbId, titulo } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        try {
            const favoriteMovie = await favoriteService.addFavoriteMovie(userId, tmdbId, titulo);
            return res.status(201).json(favoriteMovie);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getFavorites(req: Request, res: Response) {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        try {
            const favorites = await favoriteService.getFavoriteMovies(userId);
            return res.status(200).json(favorites);
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao buscar favoritos." });
        }
    },

    async removeFavorite(req: Request, res: Response) {
        const userId = req.user?.id;
        const favoriteMovieId = parseInt(req.params.id, 10);

        if (!userId) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        try {
            await favoriteService.removeFavoriteMovie(userId, favoriteMovieId);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getSharedFavorites(req: Request, res: Response) {
        try {
            const { shareToken } = req.params;
            const result = await favoriteService.getFavoritesByShareToken(shareToken);
            if (!result) {
                return res.status(404).json({ message: "Lista de favoritos não encontrada." });
            }
            res.json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    }
};

export default favoriteController;