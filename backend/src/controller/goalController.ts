import { Request, Response } from "express";
import { createGoal, getAllGoals, getGoalById, updateGoal, deleteGoal } from "../model/goalModel";

export const handleCreateGoal = async (req: Request, res: Response) => {
    const { userId, amount, period } = req.body;

    if (!userId || !amount || !period) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha todos os campos."
        });

        return; 
    }

    try {
        const goal = await createGoal(userId, amount, period);
        res.status(201).json({
            success: true,
            data: goal,
            message: "Meta criada com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao criar meta:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
}

export const handleGetAllGoals = async (req: Request, res: Response) => {
    try {
        const goals = await getAllGoals();
        res.status(200).json({
            success: true,
            data: goals
        });
        return; 
    } catch (error) {
        console.error("Erro ao buscar metas:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
}

export const handleGetGoalById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });

        return;
    }

    try {
        const goal = await getGoalById(Number(id));
        res.status(200).json({
            success: true,
            data: goal
        });
        return; 
    } catch (error) {
        console.error("Erro ao buscar meta:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
}

export const handleUpdateGoal = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, amount, period } = req.body;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });

        return;
    }

    const fieldsToUpdate: { userId?: number; amount?: number; period?: string } = {};

    if (userId) fieldsToUpdate.userId = userId;
    if (amount) fieldsToUpdate.amount = amount;
    if (period) fieldsToUpdate.period = period;

    if (Object.keys(fieldsToUpdate).length === 0) {
        res.status(400).json({
            success: false,
            message: "Nenhum campo para atualizar."
        });

        return;
    }

    try {
        await updateGoal(
            Number(id),
            fieldsToUpdate.userId ?? 0,
            fieldsToUpdate.amount ?? 0,
            fieldsToUpdate.period ?? ''
        );
        res.status(200).json({
            success: true,
            message: "Meta atualizada com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao atualizar meta:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
}

export const handleDeleteGoal = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });

        return;
    }

    try {
        await deleteGoal(Number(id));
        res.status(200).json({
            success: true,
            message: "Meta deletada com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao deletar meta:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
}
