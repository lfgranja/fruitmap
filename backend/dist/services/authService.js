"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_for_dev';
        this.jwtExpiry = process.env.JWT_EXPIRY || '24h';
    }
    async register(userData) {
        const existingUser = await models_1.default.User.findOne({
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
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 12);
        const user = await models_1.default.User.create({
            email: userData.email,
            password: hashedPassword,
            username: userData.username,
            fullName: userData.fullName,
        });
        const token = this.generateToken({ id: user.id, email: user.email });
        return { user, token };
    }
    async login(credentials) {
        const { email, password } = credentials;
        const user = await models_1.default.User.findOne({
            where: { email }
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        if (!user.isActive) {
            throw new Error('Account is deactivated');
        }
        const token = this.generateToken({ id: user.id, email: user.email });
        return { user, token };
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiry });
    }
    async verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    async getUserById(id) {
        return await models_1.default.User.findByPk(id);
    }
}
exports.default = new AuthService();
//# sourceMappingURL=authService.js.map