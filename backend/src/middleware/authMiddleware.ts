import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    user: {
        id: number;
    };
    iat: number;
    exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ message: "Nenhum token, autorização negada." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};

export default authMiddleware;