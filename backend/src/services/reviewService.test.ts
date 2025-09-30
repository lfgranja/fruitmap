import { createReview, getReviewsForTree, updateReview, deleteReview, getAverageRating, getReviewCount } from './reviewService';
import db from '../models';

// Mock the Review and User models
const mockReview = {
  create: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  count: jest.fn(),
  findAndCountAll: jest.fn(),
  get: jest.fn(key => mockReview[key]), // Mock get for instances
};

const mockUser = {
  findByPk: jest.fn(),
};

// Mock db.sequelize.fn and db.sequelize.col for getAverageRating
const mockSequelize = {
  fn: jest.fn((fnName, colName) => `${fnName}(${colName})`),
  col: jest.fn(colName => colName),
};

Object.defineProperty(db, 'Review', {
  value: mockReview,
  writable: true,
});

Object.defineProperty(db, 'User', {
  value: mockUser,
  writable: true,
});

Object.defineProperty(db, 'sequelize', {
  value: {
    fn: mockSequelize.fn,
    col: mockSequelize.col,
  },
  writable: true,
});

describe('ReviewService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createReview', () => {
    it('should create a new review if no existing review from user for tree', async () => {
      mockReview.findOne.mockResolvedValue(null);
      mockReview.create.mockResolvedValue({ id: 1, treeId: 'tree1', userId: 'user1', rating: 5, comment: 'Great!' });

      const reviewData = { treeId: 'tree1', userId: 'user1', rating: 5, comment: 'Great!' };
      const result = await createReview(reviewData);

      expect(mockReview.findOne).toHaveBeenCalledWith({ where: { treeId: 'tree1', userId: 'user1' } });
      expect(mockReview.create).toHaveBeenCalledWith(reviewData);
      expect(result).toEqual({ id: 1, treeId: 'tree1', userId: 'user1', rating: 5, comment: 'Great!' });
    });

    it('should throw an error if user has already reviewed the tree', async () => {
      mockReview.findOne.mockResolvedValue({ id: 1, treeId: 'tree1', userId: 'user1', rating: 5, comment: 'Great!' });

      const reviewData = { treeId: 'tree1', userId: 'user1', rating: 5, comment: 'Great!' };
      await expect(createReview(reviewData)).rejects.toThrow('User has already reviewed this tree');
      expect(mockReview.create).not.toHaveBeenCalled();
    });
  });

  describe('getReviewsForTree', () => {
    it('should return reviews and count for a given treeId', async () => {
      const mockReviews = [{ id: 1, rating: 5 }, { id: 2, rating: 4 }];
      mockReview.findAndCountAll.mockResolvedValue({ rows: mockReviews, count: 2 });

      const result = await getReviewsForTree('tree1', 10, 0);

      expect(mockReview.findAndCountAll).toHaveBeenCalledWith({
        where: { treeId: 'tree1' },
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['username', 'fullName'],
          },
        ],
        order: [['createdAt', 'DESC']],
        limit: 10,
        offset: 0,
      });
      expect(result).toEqual({ reviews: mockReviews, count: 2 });
    });
  });

  describe('updateReview', () => {
    it('should update an existing review if authorized', async () => {
      const existingReview = { id: 1, treeId: 'tree1', userId: 'user1', rating: 3, comment: 'Old comment', update: jest.fn().mockResolvedValue(true) };
      mockReview.findByPk.mockResolvedValue(existingReview);

      const updateData = { rating: 4, comment: 'New comment' };
      const result = await updateReview('1', 'user1', updateData);

      expect(mockReview.findByPk).toHaveBeenCalledWith('1');
      expect(existingReview.update).toHaveBeenCalledWith(updateData);
      expect(result).toEqual(existingReview);
    });

    it('should throw an error if review not found', async () => {
      mockReview.findByPk.mockResolvedValue(null);

      const updateData = { rating: 4 };
      await expect(updateReview('1', 'user1', updateData)).rejects.toThrow('Review not found');
    });

    it('should throw an error if not authorized to update review', async () => {
      const existingReview = { id: 1, treeId: 'tree1', userId: 'user2', rating: 3, comment: 'Old comment', update: jest.fn() };
      mockReview.findByPk.mockResolvedValue(existingReview);

      const updateData = { rating: 4 };
      await expect(updateReview('1', 'user1', updateData)).rejects.toThrow('Not authorized to update this review');
      expect(existingReview.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteReview', () => {
    it('should delete a review if authorized', async () => {
      const existingReview = { id: 1, treeId: 'tree1', userId: 'user1', destroy: jest.fn().mockResolvedValue(true) };
      mockReview.findByPk.mockResolvedValue(existingReview);
      mockUser.findByPk.mockResolvedValue({ id: 'user1', role: 'user' });

      await deleteReview('1', 'user1');

      expect(mockReview.findByPk).toHaveBeenCalledWith('1');
      expect(mockUser.findByPk).toHaveBeenCalledWith('user1');
      expect(existingReview.destroy).toHaveBeenCalled();
    });

    it('should delete a review if user is admin', async () => {
      const existingReview = { id: 1, treeId: 'tree1', userId: 'user2', destroy: jest.fn().mockResolvedValue(true) };
      mockReview.findByPk.mockResolvedValue(existingReview);
      mockUser.findByPk.mockResolvedValue({ id: 'user1', role: 'admin' });

      await deleteReview('1', 'user1');

      expect(mockReview.findByPk).toHaveBeenCalledWith('1');
      expect(mockUser.findByPk).toHaveBeenCalledWith('user1');
      expect(existingReview.destroy).toHaveBeenCalled();
    });

    it('should throw an error if review not found', async () => {
      mockReview.findByPk.mockResolvedValue(null);

      await expect(deleteReview('1', 'user1')).rejects.toThrow('Review not found');
    });

    it('should throw an error if not authorized to delete review', async () => {
      const existingReview = { id: 1, treeId: 'tree1', userId: 'user2', destroy: jest.fn() };
      mockReview.findByPk.mockResolvedValue(existingReview);
      mockUser.findByPk.mockResolvedValue({ id: 'user1', role: 'user' });

      await expect(deleteReview('1', 'user1')).rejects.toThrow('Not authorized to delete this review');
      expect(existingReview.destroy).not.toHaveBeenCalled();
    });
  });

  describe('getAverageRating', () => {
    it('should return the average rating for a tree', async () => {
      mockReview.findOne.mockResolvedValue({ avgRating: 4.5 });

      const result = await getAverageRating('tree1');

      expect(mockReview.findOne).toHaveBeenCalledWith({
        where: { treeId: 'tree1' },
        attributes: [`AVG(rating)`],
        raw: true,
      });
      expect(result).toBe(4.5);
    });

    it('should return 0 if no reviews for the tree', async () => {
      mockReview.findOne.mockResolvedValue(null);

      const result = await getAverageRating('tree1');

      expect(result).toBe(0);
    });
  });

  describe('getReviewCount', () => {
    it('should return the total number of reviews for a tree', async () => {
      mockReview.count.mockResolvedValue(5);

      const result = await getReviewCount('tree1');

      expect(mockReview.count).toHaveBeenCalledWith({ where: { treeId: 'tree1' } });
      expect(result).toBe(5);
    });
  });
});
