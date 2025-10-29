import { Router } from "express";
import favoriteController from "../controllers/favoriteController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/", favoriteController.addFavorite);
router.get("/", favoriteController.getFavorites);
router.delete("/:id", favoriteController.removeFavorite);
router.get("/share/:shareToken", favoriteController.getSharedFavorites);

export default router;
