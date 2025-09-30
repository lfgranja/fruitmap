import Joi from 'joi';

export const createReviewSchema = Joi.object({
  treeId: Joi.string().guid().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().max(1000).optional(),
});

export const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().max(1000).optional(),
}).min(1).message('At least one field (rating or comment) must be provided for update.');