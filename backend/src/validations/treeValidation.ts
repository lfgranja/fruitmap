// src/validations/treeValidation.ts
import { body, query } from 'express-validator';

const createTreeValidation = [
  body('speciesId')
    .isInt({ min: 1 })
    .withMessage('Species ID must be a positive integer'),
  body('location')
    .notEmpty()
    .withMessage('Location is required'),
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('accessibility')
    .optional()
    .isIn(['public', 'community', 'private-permission', 'restricted'])
    .withMessage('Accessibility must be one of: public, community, private-permission, restricted')
];

const updateTreeValidation = [
  body('speciesId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Species ID must be a positive integer'),
  body('location')
    .optional()
    .notEmpty()
    .withMessage('Location cannot be empty'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('accessibility')
    .optional()
    .isIn(['public', 'community', 'private-permission', 'restricted'])
    .withMessage('Accessibility must be one of: public, community, private-permission, restricted'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'seasonal', 'removed'])
    .withMessage('Status must be one of: active, inactive, seasonal, removed')
];

const searchValidation = [
  query('query')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query cannot exceed 100 characters'),
  query('species')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Species ID must be a positive integer'),
  query('lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  query('lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  query('radius')
    .optional()
    .isFloat({ min: 0.1, max: 50 })
    .withMessage('Search radius must be between 0.1 and 50 kilometers')
];

export default {
  createTreeValidation,
  updateTreeValidation,
  searchValidation
};