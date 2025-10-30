import { Request, Response } from "express";
import authService from "../services/authService";

const userController = {
    async generateShareToken(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const shareToken = await authService.getOrCreateShareToken(userId);
            res.json({ shareToken });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unknown error occurred" });
            }
        }
    },
};

export default userController;