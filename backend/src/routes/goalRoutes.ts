import express from 'express';
import { 
    handleCreateGoal, 
    handleGetAllGoals, 
    handleGetGoalById, 
    handleUpdateGoal, 
    handleDeleteGoal 
} from '../controller/goalController';
import { authenticatToken } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas para metas (todas protegidas por autenticação)
router.post('/goals', authenticatToken, handleCreateGoal);
router.get('/goals', authenticatToken, handleGetAllGoals);
router.get('/goals/:id', authenticatToken, handleGetGoalById);
router.put('/goals/:id', authenticatToken, handleUpdateGoal);
router.delete('/goals/:id', authenticatToken, handleDeleteGoal);

export default router;
