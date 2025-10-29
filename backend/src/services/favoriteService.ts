import { prisma } from "../lib/prisma";
import type { FavoriteMovie } from "../generated/prisma";

const favoriteService = {
    /**
     * @param userId - O ID do usuário.
     * @param tmdbId - O ID do filme no TMDB.
     * @param titulo - O título do filme.
     * @returns O filme favorito criado.
     * @throws Lança um erro se o filme já estiver nos favoritos.
     */
    async addFavoriteMovie(
        userId: number,
        tmdbId: number,
        titulo: string
    ): Promise<FavoriteMovie> {
        const existingFavorite = await prisma.favoriteMovie.findUnique({
            where: {
                userId_tmdbId: { userId, tmdbId },
            },
        });

        if (existingFavorite) {
            throw new Error("Este filme já está na sua lista de favoritos.");
        }

        return prisma.favoriteMovie.create({
            data: {
                userId,
                tmdbId,
                titulo,
            },
        });
    },

    /**
     * Retorna a lista de filmes favoritos de um usuário.
     * @param userId - O ID do usuário.
     * @returns Uma lista de filmes favoritos.
     */
    async getFavoriteMovies(userId: number): Promise<FavoriteMovie[]> {
        return prisma.favoriteMovie.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },

    /**
     * Remove um filme da lista de favoritos de um usuário.
     * @param userId - O ID do usuário.
     * @param favoriteMovieId - O ID do registro do filme favorito.
     * @throws Lança um erro se o filme favorito não for encontrado ou não pertencer ao usuário.
     */
    async removeFavoriteMovie(
        userId: number,
        favoriteMovieId: number
    ): Promise<void> {
        const favorite = await prisma.favoriteMovie.findUnique({
            where: { id: favoriteMovieId },
        });

        if (!favorite || favorite.userId !== userId) {
            throw new Error(
                "Filme favorito não encontrado ou permissão negada."
            );
        }

        await prisma.favoriteMovie.delete({ where: { id: favoriteMovieId } });
    },
};

export default favoriteService;
