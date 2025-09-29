"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviewService_1 = __importDefault(require("../services/reviewService"));
const models_1 = __importDefault(require("../models"));
const createReview = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { treeId, rating, comment } = req.body;
        if (!treeId || rating === undefined) {
            return res.status(400).json({ error: 'Tree ID and rating are required' });
        }
        const reviewData = {
            treeId,
            userId: req.user.id,
            rating: parseInt(rating, 10),
            comment: comment || null
        };
        const review = await reviewService_1.default.createReview(reviewData);
        res.status(201).json({
            message: 'Review created successfully',
            review
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getReviewsForTree = async (req, res) => {
    try {
        const { treeId } = req.params;
        const { limit = 10, page = 1 } = req.query;
        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const limitNum = parseInt(limit, 10);
        const { reviews, count } = await reviewService_1.default.getReviewsForTree(treeId, limitNum, offset);
        const averageRating = await reviewService_1.default.getAverageRating(treeId);
        res.status(200).json({
            reviews,
            pagination: {
                total: count,
                limit: limitNum,
                page: parseInt(page, 10),
                pages: Math.ceil(count / limitNum),
                averageRating
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateReview = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        if (rating === undefined && comment === undefined) {
            return res.status(400).json({ error: 'At least one field (rating or comment) must be provided' });
        }
        const updateData = {};
        if (rating !== undefined)
            updateData.rating = parseInt(rating, 10);
        if (comment !== undefined)
            updateData.comment = comment;
        const updatedReview = await reviewService_1.default.updateReview(reviewId, req.user.id, updateData);
        res.status(200).json({
            message: 'Review updated successfully',
            review: updatedReview
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteReview = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const { reviewId } = req.params;
        await reviewService_1.default.deleteReview(reviewId, req.user.id);
        res.status(200).json({
            message: 'Review deleted successfully'
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getReviewStats = async (req, res) => {
    try {
        const { treeId } = req.params;
        const averageRating = await reviewService_1.default.getAverageRating(treeId);
        const reviewCount = await reviewService_1.default.getReviewCount(treeId);
        const ratingDistribution = await models_1.default.sequelize.query(`SELECT rating, COUNT(*) as count
       FROM reviews 
       WHERE tree_id = :treeId
       GROUP BY rating
       ORDER BY rating`, {
            replacements: { treeId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        const completeDistribution = [1, 2, 3, 4, 5].map(rating => {
            const found = ratingDistribution.find((r) => r.rating === rating);
            return {
                rating,
                count: found ? parseInt(found.count, 10) : 0
            };
        });
        res.status(200).json({
            averageRating,
            reviewCount,
            ratingDistribution: completeDistribution
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.default = {
    createReview,
    getReviewsForTree,
    updateReview,
    deleteReview,
    getReviewStats
};
//# sourceMappingURL=reviewController.js.map