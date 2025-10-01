
import db from '../models';
import type Review from '../models/Review';

interface ReviewData {
  treeId: string;
  userId: string;
  rating: number;
  comment?: string;
}

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export const createReview = async (data: ReviewData): Promise<Review> => {
  const { treeId, userId, rating, comment } = data;

  const existingReview = await db.Review.findOne({
    where: { treeId, userId },
  });

  if (existingReview) {
    throw new Error('User has already reviewed this tree');
  }

  const review = await db.Review.create({
    treeId,
    userId,
    rating,
    comment,
  });

  return review;
};

export const getReviewsForTree = async (treeId: string, limit: number = DEFAULT_LIMIT, offset: number = DEFAULT_OFFSET): Promise<{ reviews: Review[]; count: number }> => {
  const { rows: reviews, count } = await db.Review.findAndCountAll({
    where: { treeId },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['username', 'fullName'],
      },
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  return { reviews, count };
};

export const updateReview = async (reviewId: string, userId: string, data: Partial<ReviewData>): Promise<Review> => {
  const review = await db.Review.findByPk(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.userId !== userId) {
    throw new Error('Not authorized to update this review');
  }

  await review.update(data);

  return review;
};

export const deleteReview = async (reviewId: string, userId: string): Promise<void> => {
  const review = await db.Review.findByPk(reviewId);

  if (!review) {
    throw new Error('Review not found');
  }

  const user = await db.User.findByPk(userId);

  if (review.userId !== userId && user?.role !== 'admin') {
    throw new Error('Not authorized to delete this review');
  }

  await review.destroy();
};

export const getAverageRating = async (treeId: string): Promise<number> => {
  const result = (await db.Review.findOne({
    where: { treeId },
    attributes: [[db.sequelize.fn('AVG', db.sequelize.col('rating')), 'avgRating']],
    raw: true,
  })) as { avgRating: number } | null;

  const avgRating = result ? result.avgRating : 0;
  return Math.round(avgRating * 10) / 10;
};

export const getReviewCount = async (treeId: string): Promise<number> => {
  const count = await db.Review.count({
    where: { treeId },
  });

  return count;
};
