"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./src/config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const treeRoutes_1 = __importDefault(require("./src/routes/treeRoutes"));
const reviewRoutes_1 = __importDefault(require("./src/routes/reviewRoutes"));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/trees', treeRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        console.log('Database connection established successfully.');
        if (process.env.NODE_ENV !== 'production') {
            await database_1.default.sync({ alter: true });
            console.log('Database synchronized.');
        }
        app.listen(PORT, () => {
            console.log(`Fruit Map server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map