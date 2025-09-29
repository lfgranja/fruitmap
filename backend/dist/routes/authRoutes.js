"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authValidation_1 = __importDefault(require("../validations/authValidation"));
const router = (0, express_1.Router)();
router.post('/register', authValidation_1.default.registerValidation, authController_1.default.register);
router.post('/login', authValidation_1.default.loginValidation, authController_1.default.login);
router.get('/profile', authController_1.default.getProfile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map