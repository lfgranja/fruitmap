// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import authService, { InvalidTokenError, ExpiredTokenError } from '../services/authService';

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

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ExpiredTokenError) {
      return res.status(401).json({ error: error.message });
    }
    if (error instanceof InvalidTokenError) {
      return res.status(401).json({ error: error.message });
    }
    res.status(400).json({ error: 'An unexpected error occurred.' });
  }
};

export default auth;

export { AuthRequest };