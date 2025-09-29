"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const express_validator_1 = require("express-validator");
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, username, fullName } = req.body;
        const result = await authService_1.default.register({
            email,
            password,
            username,
            fullName
        });
        res.status(201).json({
            message: 'User registered successfully',
            token: result.token,
            user: {
                id: result.user.id,
                email: result.user.email,
                username: result.user.username,
                fullName: result.user.fullName
            }
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const result = await authService_1.default.login({
            email,
            password
        });
        res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: {
                id: result.user.id,
                email: result.user.email,
                username: result.user.username,
                fullName: result.user.fullName
            }
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await authService_1.default.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                fullName: user.fullName,
                createdAt: user.createdAt
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.default = {
    register,
    login,
    getProfile
};
//# sourceMappingURL=authController.js.map