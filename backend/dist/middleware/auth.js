"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = __importDefault(require("../services/authService"));
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        const decoded = await authService_1.default.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map