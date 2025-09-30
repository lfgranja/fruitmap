import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import db from '../models';
import { Op } from 'sequelize'; // Import Op for Sequelize operators

let JWT_SECRET: string;

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET environment variable is not set in production.');
  } else {
    JWT_SECRET = process.env.JWT_SECRET;
  }
} else {
  // Development or test environment
  if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET is not set. Using a default secret for development. Do not use in production.');
    JWT_SECRET = 'supersecretjwtkey_for_dev_only';
  } else {
    JWT_SECRET = process.env.JWT_SECRET;
  }
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  fullName?: string;
}

interface TokenPayload {
  id: string;
  email: string;
}

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
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }

  verifyToken(token: string): { id: string; email: string } {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
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

  async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: userData.email },
          { username: userData.username }
        ]
      }
    });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    // Create the user
    const user = await db.User.create({
      email: userData.email,
      password: hashedPassword,
      username: userData.username,
      fullName: userData.fullName,
    });

    // Generate JWT
    const token = this.generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const { email, password } = credentials;

    // Find the user
    const user = await db.User.findOne({
      where: { email }
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Check if account is active
    // if (!user.isActive) {
    //   throw new Error('Account is deactivated');
    // }

    // Generate JWT
    const token = this.generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  async getUserById(id: string): Promise<User | null> {
    return await db.User.findByPk(id);
  }
}

export { InvalidTokenError, ExpiredTokenError };
export default new AuthService();