import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

class AuthService {
  generateToken(user: { id: string; email: string }): string {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): { id: string; email: string } {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  }
}

export default new AuthService();