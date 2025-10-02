import type { Request, Response } from 'express';
import { createReview, getReviewsForTree, updateReview, deleteReview, getAverageRating, getReviewCount } from '../services/reviewService';
import type { AuthRequest } from '../middleware/auth';
import db from '../models';
import { createReviewSchema, updateReviewSchema } from '../validations/reviewValidation';
 
const createReviewHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
 
    const { error, value } = createReviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
 
    const { treeId, rating, comment } = value;

    const reviewData = {
      treeId,
      userId: req.user.id,
      rating,
      comment,
    };
 
    const review = await createReview(reviewData);
 
    return res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error: unknown) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
 
const getReviewsForTreeHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { treeId } = req.params;
    const { limit = '10', page = '1' } = req.query as { limit?: string; page?: string };
 
    const limitNum = parseInt(limit, 10);
    const offset = (parseInt(page, 10) - 1) * limitNum;
 
    const { reviews, count } = await getReviewsForTree(treeId, limitNum, offset);
 
    const averageRating = await getAverageRating(treeId);
 
    return res.status(200).json({
      reviews,
      pagination: {
        total: count,
        limit: limitNum,
        page: parseInt(page, 10),
        pages: Math.ceil(count / limitNum),
        averageRating,
      },
    });
  } catch (error: unknown) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
 
const updateReviewHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
 
    const { error, value } = updateReviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { reviewId } = req.params;
    const { rating, comment } = value;
 
    if (rating === undefined && comment === undefined) {
      return res.status(400).json({ error: 'At least one field (rating or comment) must be provided' });
    }
 
    const updateData: { rating?: number; comment?: string } = {};
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;
 
    const updatedReview = await updateReview(reviewId, req.user.id, updateData);
 
    return res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview,
    });
  } catch (error: unknown) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
 
const deleteReviewHandler = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
 
    const { reviewId } = req.params;
 
    await deleteReview(reviewId, req.user.id);
 
    return res.status(200).json({
      message: 'Review deleted successfully',
    });
  } catch (error: unknown) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
 
const getReviewStatsHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { treeId } = req.params;
 
    const averageRating = await getAverageRating(treeId);
    const reviewCount = await getReviewCount(treeId);

    const ratingDistribution = await db.Review.findAll({
      where: { treeId },
      attributes: ['rating', [db.sequelize.fn('COUNT', db.sequelize.col('rating')), 'count']],
      group: ['rating'],
      order: ['rating'],
    });

    const completeDistribution = [1, 2, 3, 4, 5].map(rating => {
      const found = ratingDistribution.find(r => r.rating === rating);
      return {
        rating,
        count: found ? parseInt(found.get('count') as string, 10) : 0,
      };
    });
 
    return res.status(200).json({
      averageRating,
      reviewCount,
      ratingDistribution: completeDistribution,
    });
  } catch (error: unknown) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
 
export default {
  createReview: createReviewHandler,
  getReviewsForTree: getReviewsForTreeHandler,
  updateReview: updateReviewHandler,
  deleteReview: deleteReviewHandler,
  getReviewStats: getReviewStatsHandler,
};
