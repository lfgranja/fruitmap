// src/services/reviewService.ts
import db from '../models';

interface ReviewData {
  treeId: string;
  userId: string;
  rating: number;
  comment?: string;
}

interface ReviewFilter {
  treeId?: string;
  userId?: string;
  minRating?: number;
  maxRating?: number;
}

class ReviewService {
  /**
   * Create a new review for a tree
   */
  async createReview(data: ReviewData): Promise<any> {
    // Validate rating
    if (data.rating < 1 || data.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    // Check if user already reviewed this tree
    const existingReview = await db.sequelize.query(
      'SELECT id FROM reviews WHERE tree_id = :treeId AND user_id = :userId',
      {
        replacements: { treeId: data.treeId, userId: data.userId },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    if (existingReview.length > 0) {
      throw new Error('User has already reviewed this tree');
    }

    // Create the review
    const review = await db.sequelize.query(
      'INSERT INTO reviews (id, tree_id, user_id, rating, comment, created_at, updated_at) VALUES (gen_random_uuid(), :treeId, :userId, :rating, :comment, NOW(), NOW()) RETURNING *',
      {
        replacements: {
          treeId: data.treeId,
          userId: data.userId,
          rating: data.rating,
          comment: data.comment || null
        },
        type: db.sequelize.QueryTypes.INSERT
      }
    );

    return review;
  }

  /**
   * Get reviews for a specific tree
   */
  async getReviewsForTree(treeId: string, limit: number = 10, offset: number = 0): Promise<{ reviews: any[]; count: number }> {
    // Get reviews
    const reviews = await db.sequelize.query(
      `SELECT r.id, r.rating, r.comment, r.created_at, u.username, u.full_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.tree_id = :treeId
       ORDER BY r.created_at DESC
       LIMIT :limit OFFSET :offset`,
      {
        replacements: { treeId, limit, offset },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    // Get total count
    const countResult: any = await db.sequelize.query(
      'SELECT COUNT(*) as count FROM reviews WHERE tree_id = :treeId',
      {
        replacements: { treeId },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    const count = parseInt(countResult[0].count, 10);

    return { reviews, count };
  }

  /**
   * Update an existing review
   */
  async updateReview(reviewId: string, userId: string, data: Partial<ReviewData>): Promise<any> {
    // Verify this user owns the review
    const [existingReview] = await db.sequelize.query(
      'SELECT id, user_id FROM reviews WHERE id = :reviewId',
      {
        replacements: { reviewId },
        type: db.sequelize.QueryTypes.SELECT
      }
    ) as any[];

    if (!existingReview) {
      throw new Error('Review not found');
    }

    if (existingReview.userId !== userId) {
      throw new Error('Not authorized to update this review');
    }

    // Update the review
    await db.sequelize.query(
      `UPDATE reviews 
       SET rating = COALESCE(:rating, rating), 
           comment = COALESCE(:comment, comment), 
           updated_at = NOW()
       WHERE id = :reviewId`,
      {
        replacements: {
          reviewId,
          rating: data.rating,
          comment: data.comment
        },
        type: db.sequelize.QueryTypes.UPDATE
      }
    );

    // Return updated review
    const [updatedReview] = await db.sequelize.query(
      `SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at, u.username, u.full_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.id = :reviewId`,
      {
        replacements: { reviewId },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    return updatedReview;
  }

  /**
   * Delete a review
   */
  async deleteReview(reviewId: string, userId: string): Promise<void> {
    // Verify this user owns the review or is admin
    const [review] = await db.sequelize.query(
      'SELECT id, user_id FROM reviews WHERE id = :reviewId',
      {
        replacements: { reviewId },
        type: db.sequelize.QueryTypes.SELECT
      }
    ) as any[];

    if (!review) {
      throw new Error('Review not found');
    }

    // Get user to check if admin
    const user = await db.User.findByPk(userId);

    if (review.userId !== userId && user?.role !== 'admin') {
      throw new Error('Not authorized to delete this review');
    }

    await db.sequelize.query(
      'DELETE FROM reviews WHERE id = :reviewId',
      {
        replacements: { reviewId },
        type: db.sequelize.QueryTypes.DELETE
      }
    );
  }

  /**
   * Get average rating for a tree
   */
  async getAverageRating(treeId: string): Promise<number> {
    const result: any = await db.sequelize.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE tree_id = :treeId',
      {
        replacements: { treeId },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    const avgRating = parseFloat(result[0].avg_rating);
    return isNaN(avgRating) ? 0 : Math.round(avgRating * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Get total number of reviews for a tree
   */
  async getReviewCount(treeId: string): Promise<number> {
    const result: any = await db.sequelize.query(
      'SELECT COUNT(*) as count FROM reviews WHERE tree_id = :treeId',
      {
        replacements: { treeId },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    return parseInt(result[0].count, 10);
  }
}

export default new ReviewService();