"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = __importDefault(require("../controllers/reviewController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', auth_1.default, reviewController_1.default.createReview);
router.patch('/:reviewId', auth_1.default, reviewController_1.default.updateReview);
router.delete('/:reviewId', auth_1.default, reviewController_1.default.deleteReview);
router.get('/tree/:treeId', reviewController_1.default.getReviewsForTree);
router.get('/tree/:treeId/stats', reviewController_1.default.getReviewStats);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map