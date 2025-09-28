// src/controllers/reviewController.ts
import { Request, Response } from 'express';
import reviewService from '../services/reviewService';
import { AuthRequest } from '../middleware/auth';
import db from '../models';

// Create a new review
const createReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { treeId, rating, comment } = req.body;

    // Validate required fields
    if (!treeId || rating === undefined) {
      return res.status(400).json({ error: 'Tree ID and rating are required' });
    }

    const reviewData = {
      treeId,
      userId: req.user.id,
      rating: parseInt(rating, 10),
      comment: comment || null
    };

    const review = await reviewService.createReview(reviewData);

    res.status(201).json({
      message: 'Review created successfully',
      review
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get reviews for a specific tree
const getReviewsForTree = async (req: Request, res: Response) => {
  try {
    const { treeId } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const offset = (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const { reviews, count } = await reviewService.getReviewsForTree(treeId, limitNum, offset);

    // Get average rating for the tree
    const averageRating = await reviewService.getAverageRating(treeId);

    res.status(200).json({
      reviews,
      pagination: {
        total: count,
        limit: limitNum,
        page: parseInt(page as string, 10),
        pages: Math.ceil(count / limitNum),
        averageRating
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing review
const updateReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Validate at least one field is provided
    if (rating === undefined && comment === undefined) {
      return res.status(400).json({ error: 'At least one field (rating or comment) must be provided' });
    }

    const updateData: any = {};
    if (rating !== undefined) updateData.rating = parseInt(rating, 10);
    if (comment !== undefined) updateData.comment = comment;

    const updatedReview = await reviewService.updateReview(reviewId, req.user.id, updateData);

    res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review
const deleteReview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { reviewId } = req.params;

    await reviewService.deleteReview(reviewId, req.user.id);

    res.status(200).json({
      message: 'Review deleted successfully'
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get review stats for a tree (average rating, count, distribution)
const getReviewStats = async (req: Request, res: Response) => {
  try {
    const { treeId } = req.params;

    const averageRating = await reviewService.getAverageRating(treeId);
    const reviewCount = await reviewService.getReviewCount(treeId);

    // Get rating distribution
    const ratingDistribution: any = await db.sequelize.query(
      `SELECT rating, COUNT(*) as count
       FROM reviews 
       WHERE tree_id = :treeId
       GROUP BY rating
       ORDER BY rating`,
      {
        replacements: { treeId },
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    // Create a complete distribution with all ratings (1-5)
    const completeDistribution = [1, 2, 3, 4, 5].map(rating => {
      const found = ratingDistribution.find((r: any) => r.rating === rating);
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createReview,
  getReviewsForTree,
  updateReview,
  deleteReview,
  getReviewStats
};