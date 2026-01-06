import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes (require authentication)
router.get('/me', verifyToken, getCurrentUser);

export default router;
