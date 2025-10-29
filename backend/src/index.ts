import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import movieController from './controllers/movieController';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/movies', movieController);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});