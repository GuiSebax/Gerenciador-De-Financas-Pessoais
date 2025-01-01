import express from 'express';
import { handleLogin } from '../controller/authController';

const authRoutes = express.Router();

authRoutes.post('/login', handleLogin);

export default authRoutes;