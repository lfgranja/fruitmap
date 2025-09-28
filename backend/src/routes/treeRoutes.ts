// src/routes/treeRoutes.ts
import { Router } from 'express';
import treeController from '../controllers/treeController';
import auth from '../middleware/auth';
import validation from '../validations/treeValidation';

const router = Router();

// Public routes
router.get('/', treeController.getAllTrees);
router.get('/search', validation.searchValidation, treeController.searchTrees);
router.get('/:id', treeController.getTreeById);

// Authenticated routes
router.post('/', auth, validation.createTreeValidation, treeController.createTree);
router.patch('/:id', auth, validation.updateTreeValidation, treeController.updateTree);
router.delete('/:id', auth, treeController.deleteTree);

export default router;