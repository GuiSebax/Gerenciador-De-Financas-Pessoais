import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../model/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'default';

export const handleLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Email e senha são obrigatórios."
        });

        return;
    }

    try {
        const user = await getUserByEmail(email);

        if (!user || !( await bcrypt.compare(password, user.password))) {
            res.status(401).json({
                success: false,
                message: "Email ou senha incorretos."
            });

            return;
        }

        const token = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error("Erro ao fazer login: ", error);
        res.status(500).json({
            success: false,
            message: "Erro ao fazer login. Por favor, tente novamente."
        });
    }
}