// src/routes/reviewRoutes.ts
import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import auth from '../middleware/auth';

const router = Router();

// Authenticated routes for creating, updating, and deleting reviews
router.post('/', auth, reviewController.createReview);
router.patch('/:reviewId', auth, reviewController.updateReview);
router.delete('/:reviewId', auth, reviewController.deleteReview);

// Public routes for getting reviews and stats
router.get('/tree/:treeId', reviewController.getReviewsForTree);
router.get('/tree/:treeId/stats', reviewController.getReviewStats);

export default router;