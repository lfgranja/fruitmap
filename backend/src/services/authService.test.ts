import AuthService, { InvalidTokenError, ExpiredTokenError } from './authService';
import jwt from 'jsonwebtoken';

describe('AuthService', () => {
  const mockUser = { id: '123', email: 'test@example.com' };
  let originalJwtSecret: string | undefined;

  beforeAll(() => {
    originalJwtSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'supersecretjwtkey_for_dev_only'; // Set a secret for tests
    jest.resetModules(); // Reset modules to re-import AuthService with the new secret
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalJwtSecret; // Restore original secret
    jest.useRealTimers(); // Restore real timers
  });

  it('should generate a valid token', () => {
    const token = AuthService.generateToken(mockUser);
    expect(token).toBeDefined();
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as typeof mockUser & { iat: number; exp: number };
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
  });

  it('should verify a valid token', () => {
    const token = AuthService.generateToken(mockUser);
    const decoded = AuthService.verifyToken(token);
    expect(decoded.id).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
  });

  it('should throw an InvalidTokenError for an invalid token', () => {
    const invalidToken = 'invalid.token.string';
    expect(() => AuthService.verifyToken(invalidToken)).toThrow(InvalidTokenError);
  });

  it('should throw an ExpiredTokenError for an expired token', () => {
    jest.useFakeTimers();
    const token = jwt.sign(mockUser, process.env.JWT_SECRET!, { expiresIn: '1s' });

    // Advance time by more than 1 second
    jest.advanceTimersByTime(1001);

    expect(() => AuthService.verifyToken(token)).toThrow(ExpiredTokenError);
  });
});