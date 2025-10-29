import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request { user?: { id: number } }
    }
}

interface DecodedToken {
    user: {
        id: number;
    };
    iat: number;
    exp: number;
}

export default function (req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "Sem token, autorização negada" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as DecodedToken;
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token não é válido" });
    }
}
