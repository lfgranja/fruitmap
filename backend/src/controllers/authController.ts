// src/controllers/authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';
import { validationResult } from 'express-validator';

const register = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, fullName } = req.body;

    const result = await authService.register({
      email,
      password,
      username,
      fullName
    });

    return res.status(201).json({
      message: 'User registered successfully',
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        username: result.user.username,
        fullName: result.user.fullName
      }
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const result = await authService.login({
      email,
      password
    });

    return res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        username: result.user.username,
        fullName: result.user.fullName
      }
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  register,
  login,
  getProfile
};