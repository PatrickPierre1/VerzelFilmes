import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {
    findMovies,
    findMoviesById,
    findGenres,
} from "./controllers/movieController";
import favoritesRoutes from "./routes/favoritesRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/api/movies", findMovies);
app.get("/api/movies/:id", findMoviesById);
app.get("/api/genres", findGenres);

app.use("/api/favorites", favoritesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", require("./routes/auth").default);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
