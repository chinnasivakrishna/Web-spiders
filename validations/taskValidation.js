const Joi = require('joi');

const taskValidationSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').default('TODO'),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required(),
  dueDate: Joi.date().optional(),
});

module.exports = { taskValidationSchema };
