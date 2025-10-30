import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();

router.use(authMiddleware);

router.post("/share-token", userController.generateShareToken);

export default router;
