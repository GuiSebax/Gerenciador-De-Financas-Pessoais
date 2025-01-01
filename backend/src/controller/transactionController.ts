import { Request, Response } from "express";
import { 
    createTransaction, 
    updateTransaction, 
    getAllTransactions, 
    getTransactionById, 
    deleteTransaction 
} from "../model/transactionModel";

export const handleCreateTransaction = async (req: Request, res: Response) => {
    const { userId, amount, type, category, description, date } = req.body;

    if (!userId || !amount || !type || !category || !description || !date) {
        res.status(400).json({
            success: false,
            message: "Entrada inválida. Preencha todos os campos."
        });

        return; 
    }

    try {
        const transaction = await createTransaction(userId, amount, type, category, description, date);
        res.status(201).json({
            success: true,
            data: transaction,
            message: "Transação criada com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao criar transação:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

export const handleGetAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await getAllTransactions();
        res.status(200).json({
            success: true,
            data: transactions
        });
        return; 
    } catch (error) {
        console.error("Erro ao buscar transações:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

export const handleGetTransactionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
         res.status(400).json({
            success: false,
            message: "Id não informado."
        });
        return; 
    }

    try {
        const transaction = await getTransactionById(Number(id));
        if (!transaction) {
            res.status(404).json({
                success: false,
                message: "Transação não encontrada."
            });
            return; 
        }

        res.status(200).json({
            success: true,
            data: transaction
        });
        return; 
    } catch (error) {
        console.error("Erro ao buscar transação:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

export const handleUpdateTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, amount, type, category, description, date } = req.body;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });

        return; 
    }

    const fieldsToUpdate: { userId?: number; amount?: number; type?: string; category?: string; description?: string; date?: string } = {};

    if (userId) fieldsToUpdate.userId = userId;
    if (amount) fieldsToUpdate.amount = amount;
    if (type) fieldsToUpdate.type = type;
    if (category) fieldsToUpdate.category = category;
    if (description) fieldsToUpdate.description = description;
    if (date) fieldsToUpdate.date = date;

    if (Object.keys(fieldsToUpdate).length === 0) {
         res.status(400).json({
            success: false,
            message: "Nenhum campo informado."
        });

        return; 
    }

    try {
        await updateTransaction(
            Number(id), 
            fieldsToUpdate.userId ?? 0, 
            fieldsToUpdate.amount ?? 0, 
            fieldsToUpdate.type ?? '', 
            fieldsToUpdate.category ?? '', 
            fieldsToUpdate.description ?? '', 
            fieldsToUpdate.date ?? ''
        );
        res.status(200).json({
            success: true,
            message: "Transação atualizada com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao atualizar transação:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};

export const handleDeleteTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({
            success: false,
            message: "Id não informado."
        });

        return; 
    }

    try {
        await deleteTransaction(Number(id));
        res.status(200).json({
            success: true,
            message: "Transação deletada com sucesso!"
        });
        return; 
    } catch (error) {
        console.error("Erro ao deletar transação:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor."
        });
        return; 
    }
};
