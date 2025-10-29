import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { findMovies, findMoviesById } from "./controllers/movieController";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.get("/api/movies", findMovies);
app.get("/api/movies/:id", findMoviesById);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
