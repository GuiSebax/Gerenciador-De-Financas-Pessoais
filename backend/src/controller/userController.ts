import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    updateUser, 
    deleteUser 
} from "../model/userModel";

// Criar um Usuário
export const handleCreateUser = async (req: Request, res: Response) => {
    const { name, email, password, role} = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha os campos 'name', 'email' e 'password'."
        });
        return; 
    }

    if(role !== 'admin' && role !== 'user') {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. O campo 'role' deve ser 'admin' ou 'user'."
        });
        return; 
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "E-mail já cadastrado."
            });
            return; 
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(name, email, hashedPassword, role);
        res.status(201).json({
            success: true,
            data: { userId },
            message: "Usuário criado com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

// Buscar Todos os usuários
export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            success: true,
            data: users
        });
        return; 
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

// Buscar usuário pelo ID
export const handleGetUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });
        return; 
    }

    try {
        const user = await getUserById(Number(id));
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Usuário não encontrado."
            });
            return; 
        }

        res.status(200).json({
            success: true,
            data: user
        });
        return; 
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

// Atualizar um usuário
export const handleUpdateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, role} = req.body;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });
        return; 
    }

    if (!name && !email && !password) {
        res.status(400).json({
            success: false,
            message: "Informe ao menos um campo para atualização."
        });
        return; 
    }

    if(role !== 'admin' && role !== 'user') {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. O campo 'role' deve ser 'admin' ou 'user'."
        });
        return; 
    }

    try {
        const fieldsToUpdate: { name?: string; email?: string; password?: string; role?: string} = {};
        if (name) fieldsToUpdate.name = name;
        if (email) {
            const existingUser = await getUserByEmail(email);
            if (existingUser) {
                res.status(409).json({
                    success: false,
                    message: "E-mail já cadastrado."
                });
                return; 
            }
            fieldsToUpdate.email = email;
        }
        if (password) fieldsToUpdate.password = await bcrypt.hash(password, 10);
        if (role) fieldsToUpdate.role = role;
        await updateUser(
            Number(id),
            fieldsToUpdate.name || '',
            fieldsToUpdate.email || '',
            fieldsToUpdate.password || '',
            fieldsToUpdate.role || ''
        );
        res.status(200).json({
            success: true,
            message: "Usuário atualizado com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

// Deletar um usuário
export const handleDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });
        return; 
    }

    try {
        await deleteUser(Number(id));
        res.status(200).json({
            success: true,
            message: "Usuário deletado com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};
