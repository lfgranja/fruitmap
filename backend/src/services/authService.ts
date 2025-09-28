// src/services/authService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import db from '../models';

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

class AuthService {
  private jwtSecret: string;
  private jwtExpiry: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_for_dev';
    this.jwtExpiry = process.env.JWT_EXPIRY || '24h';
  }

  async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = await db.User.findOne({
      where: {
        $or: [
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
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Generate JWT
    const token = this.generateToken({ id: user.id, email: user.email });

    return { user, token };
  }

  private generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiry });
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    return await db.User.findByPk(id);
  }
}

export default new AuthService();