"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const createTreeValidation = [
    (0, express_validator_1.body)('speciesId')
        .isInt({ min: 1 })
        .withMessage('Species ID must be a positive integer'),
    (0, express_validator_1.body)('location')
        .notEmpty()
        .withMessage('Location is required'),
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),
    (0, express_validator_1.body)('accessibility')
        .optional()
        .isIn(['public', 'community', 'private-permission', 'restricted'])
        .withMessage('Accessibility must be one of: public, community, private-permission, restricted')
];
const updateTreeValidation = [
    (0, express_validator_1.body)('speciesId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Species ID must be a positive integer'),
    (0, express_validator_1.body)('location')
        .optional()
        .notEmpty()
        .withMessage('Location cannot be empty'),
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),
    (0, express_validator_1.body)('accessibility')
        .optional()
        .isIn(['public', 'community', 'private-permission', 'restricted'])
        .withMessage('Accessibility must be one of: public, community, private-permission, restricted'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['active', 'inactive', 'seasonal', 'removed'])
        .withMessage('Status must be one of: active, inactive, seasonal, removed')
];
const searchValidation = [
    (0, express_validator_1.query)('query')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Search query cannot exceed 100 characters'),
    (0, express_validator_1.query)('species')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Species ID must be a positive integer'),
    (0, express_validator_1.query)('lat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be between -90 and 90'),
    (0, express_validator_1.query)('lng')
        .optional()
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be between -180 and 180'),
    (0, express_validator_1.query)('radius')
        .optional()
        .isFloat({ min: 0.1, max: 50 })
        .withMessage('Search radius must be between 0.1 and 50 kilometers')
];
exports.default = {
    createTreeValidation,
    updateTreeValidation,
    searchValidation
};
//# sourceMappingURL=treeValidation.js.map