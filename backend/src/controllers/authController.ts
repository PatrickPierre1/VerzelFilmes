import { Request, Response } from "express";
import { validationResult } from "express-validator";
import authService from "../services/authService";
import { prisma } from "../lib/prisma";
declare global {
    namespace Express {
        interface Request {
            user?: { id: number };
        }
    }
}

const authController = {
    async register(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            const token = await authService.registerUser(name, email, password);
            return res.json({ token });
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
                if (err.message === "Usuário já existe") {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: err.message }] });
                }
            }
            return res.status(500).send("Erro no Servidor");
        }
    },

    async login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const token = await authService.loginUser(email, password);
            return res.json({ token });
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
                if (err.message === "Credenciais inválidas") {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: err.message }] });
                }
            }
            return res.status(500).send("Erro no Servidor");
        }
    },

    async getMe(req: Request, res: Response) {
        try {
            if (!req.user?.id) {
                return res.status(400).send("ID de usuário não encontrado no token.");
            }
            const user = await prisma.user.findUnique({
                where: { id: req.user.id },
                select: { id: true, name: true, email: true, createdAt: true },
            });
            return res.json(user);
        } catch (err: unknown) {
            if (err instanceof Error) console.error(err.message);
            return res.status(500).send("Erro no Servidor");
        }
    },
};

export default authController;
