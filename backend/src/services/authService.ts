import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}

class ExpiredTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ExpiredTokenError';
  }
}

class AuthService {
  generateToken(user: { id: string; email: string }): string {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): { id: string; email: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ExpiredTokenError('Token has expired.');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new InvalidTokenError('Invalid token.');
      }
      throw error;
    }
  }
}

export { InvalidTokenError, ExpiredTokenError };
export default new AuthService();