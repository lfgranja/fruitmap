// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = await authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default auth;

export { AuthRequest };