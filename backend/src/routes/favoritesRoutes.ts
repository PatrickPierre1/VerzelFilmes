import { Router } from "express";
import favoriteController from "../controllers/favoriteController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
router.get("/share/:shareToken", favoriteController.getSharedFavorites);
router.use(authMiddleware);

router.post("/", favoriteController.addFavorite);
router.get("/", favoriteController.getFavorites);
router.delete("/:id", favoriteController.removeFavorite);

export default router;
