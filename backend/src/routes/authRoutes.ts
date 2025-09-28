// src/routes/authRoutes.ts
import { Router } from 'express';
import authController from '../controllers/authController';
import validation from '../validations/authValidation';

const router = Router();

// Register route
router.post('/register', validation.registerValidation, authController.register);

// Login route
router.post('/login', validation.loginValidation, authController.login);

// Profile route (requires authentication)
router.get('/profile', authController.getProfile);

export default router;