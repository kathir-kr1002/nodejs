const Joi = require('joi');

const registerUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
});

const loginUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map(detail => detail.message).join(', ')
      });
    }
    next();
  };
};

module.exports = {
  registerUserSchema,
  loginUserSchema,
  validate
};
