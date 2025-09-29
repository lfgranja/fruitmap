"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class ReviewService {
    async createReview(data) {
        if (data.rating < 1 || data.rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        const existingReview = await models_1.default.sequelize.query('SELECT id FROM reviews WHERE tree_id = :treeId AND user_id = :userId', {
            replacements: { treeId: data.treeId, userId: data.userId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        if (existingReview.length > 0) {
            throw new Error('User has already reviewed this tree');
        }
        const review = await models_1.default.sequelize.query('INSERT INTO reviews (id, tree_id, user_id, rating, comment, created_at, updated_at) VALUES (gen_random_uuid(), :treeId, :userId, :rating, :comment, NOW(), NOW()) RETURNING *', {
            replacements: {
                treeId: data.treeId,
                userId: data.userId,
                rating: data.rating,
                comment: data.comment || null
            },
            type: models_1.default.sequelize.QueryTypes.INSERT
        });
        return review;
    }
    async getReviewsForTree(treeId, limit = 10, offset = 0) {
        const reviews = await models_1.default.sequelize.query(`SELECT r.id, r.rating, r.comment, r.created_at, u.username, u.full_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.tree_id = :treeId
       ORDER BY r.created_at DESC
       LIMIT :limit OFFSET :offset`, {
            replacements: { treeId, limit, offset },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        const countResult = await models_1.default.sequelize.query('SELECT COUNT(*) as count FROM reviews WHERE tree_id = :treeId', {
            replacements: { treeId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        const count = parseInt(countResult[0].count, 10);
        return { reviews, count };
    }
    async updateReview(reviewId, userId, data) {
        const [existingReview] = await models_1.default.sequelize.query('SELECT id, user_id FROM reviews WHERE id = :reviewId', {
            replacements: { reviewId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        if (!existingReview) {
            throw new Error('Review not found');
        }
        if (existingReview.userId !== userId) {
            throw new Error('Not authorized to update this review');
        }
        await models_1.default.sequelize.query(`UPDATE reviews 
       SET rating = COALESCE(:rating, rating), 
           comment = COALESCE(:comment, comment), 
           updated_at = NOW()
       WHERE id = :reviewId`, {
            replacements: {
                reviewId,
                rating: data.rating,
                comment: data.comment
            },
            type: models_1.default.sequelize.QueryTypes.UPDATE
        });
        const [updatedReview] = await models_1.default.sequelize.query(`SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at, u.username, u.full_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = :reviewId`, {
            replacements: { reviewId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        return updatedReview;
    }
    async deleteReview(reviewId, userId) {
        const [review] = await models_1.default.sequelize.query('SELECT id, user_id FROM reviews WHERE id = :reviewId', {
            replacements: { reviewId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        if (!review) {
            throw new Error('Review not found');
        }
        const user = await models_1.default.User.findByPk(userId);
        if (review.userId !== userId && user?.role !== 'admin') {
            throw new Error('Not authorized to delete this review');
        }
        await models_1.default.sequelize.query('DELETE FROM reviews WHERE id = :reviewId', {
            replacements: { reviewId },
            type: models_1.default.sequelize.QueryTypes.DELETE
        });
    }
    async getAverageRating(treeId) {
        const result = await models_1.default.sequelize.query('SELECT AVG(rating) as avg_rating FROM reviews WHERE tree_id = :treeId', {
            replacements: { treeId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        const avgRating = parseFloat(result[0].avg_rating);
        return isNaN(avgRating) ? 0 : Math.round(avgRating * 10) / 10;
    }
    async getReviewCount(treeId) {
        const result = await models_1.default.sequelize.query('SELECT COUNT(*) as count FROM reviews WHERE tree_id = :treeId', {
            replacements: { treeId },
            type: models_1.default.sequelize.QueryTypes.SELECT
        });
        return parseInt(result[0].count, 10);
    }
}
exports.default = new ReviewService();
//# sourceMappingURL=reviewService.js.map