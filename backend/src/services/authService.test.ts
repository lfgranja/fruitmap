import AuthService from './authService';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  const mockUser = { id: '123', email: 'test@example.com' };
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

  beforeAll(() => {
    process.env.JWT_SECRET = JWT_SECRET; // Ensure secret is set for tests
  });

  it('should generate a valid token', () => {
    const token = AuthService.generateToken(mockUser);
    expect(token).toBeDefined();
    const decoded = jwt.verify(token, JWT_SECRET) as typeof mockUser & { iat: number; exp: number };
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
  });

  it('should verify a valid token', () => {
    const token = AuthService.generateToken(mockUser);
    const decoded = AuthService.verifyToken(token);
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
  });

  it('should throw an error for an invalid token', () => {
    const invalidToken = 'invalid.token.string';
    expect(() => AuthService.verifyToken(invalidToken)).toThrow();
  });

  it('should throw an error for an expired token', () => {
    const expiredToken = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '0s' });
    // Wait for the token to expire
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(() => AuthService.verifyToken(expiredToken)).toThrow();
        resolve(null);
      }, 1000);
    });
  });
});