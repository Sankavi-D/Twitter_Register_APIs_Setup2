const Joi = require('joi');

// Validation schema for user password register
const userSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required: Cannot be empty',
      'any.required': 'Name is required: Cannot be empty'
    }).strict(),
    email: Joi.string().email().required(),
    dob: Joi.date().iso().required()
  });

const userValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating user data");
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = userValidationSchema;