import express from 'express';
import { 
    handleCreateUser, 
    handleDeleteUser, 
    handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUser 
} from '../controller/userController';
import { authenticatToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Rotas para usuários
router.post('/register', handleCreateUser); // Cadastro de usuários (aberto)
router.get('/users', authenticatToken, handleGetAllUsers); // Somente admins podem listar todos os usuários
router.get('/users/:id', authenticatToken, handleGetUserById); // Protegido, qualquer usuário autenticado pode ver os dados
router.put('/users/:id', authenticatToken, handleUpdateUser); // Protegido, usuários autenticados podem atualizar
router.delete('/users/:id', authenticatToken, authorizeAdmin, handleDeleteUser); // Somente admins podem deletar usuários

export default router;
