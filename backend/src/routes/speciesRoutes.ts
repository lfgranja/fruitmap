// src/routes/speciesRoutes.ts
import { Router } from 'express';
import speciesController from '../controllers/speciesController';

const router = Router();

// Public routes
router.get('/', speciesController.getAllSpecies);
router.get('/:id', speciesController.getSpeciesById);

export default router;