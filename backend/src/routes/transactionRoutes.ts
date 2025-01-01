import express from 'express';
import { 
    handleCreateTransaction, 
    handleGetAllTransactions, 
    handleGetTransactionById, 
    handleUpdateTransaction, 
    handleDeleteTransaction 
} from '../controller/transactionController';
import { authenticatToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas para transações (todas protegidas por autenticação)
router.post('/transactions', authenticatToken, handleCreateTransaction);
router.get('/transactions', authenticatToken, handleGetAllTransactions);
router.get('/transactions/:id', authenticatToken, handleGetTransactionById);
router.put('/transactions/:id', authenticatToken, handleUpdateTransaction);
router.delete('/transactions/:id', authenticatToken, handleDeleteTransaction);

export default router;
