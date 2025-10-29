import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const authService = {
    async registerUser(
        name: string,
        email: string,
        password: string
    ): Promise<string> {
        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            throw new Error("Usuário já existe");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        return token;
    },

    async loginUser(email: string, password: string): Promise<string> {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error("Credenciais inválidas");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Credenciais inválidas");
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
        return token;
    },
};

export default authService;
