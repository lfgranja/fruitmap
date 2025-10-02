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
    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Unexpected error during authentication:', error);
    return res.status(500).json({ error: 'An internal server error occurred during authentication.' });
  }
};

export default auth;

export { AuthRequest };
