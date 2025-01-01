import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken"

const JWT_SECRET =process.env.JWT_SECRET || "default"

interface CustomRequest extends Request {
    user?: any;
}

export const authenticatToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        res.status(401).json({
            success: false,
            message: "Token não encontrado"
        })

        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({
                success: false,
                message: "Token inválido"
            })

            return;
        }

        req.user = decoded;
        next();
    })
}

export const authorizeAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
        res.status(403).json({
            success: false,
            message: "Acesso negado"
        })

        return;
    }

    next();
}

