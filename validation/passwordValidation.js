const Joi = require('joi');

// Validation schema for user password register
const passwordSchema = Joi.object({
    password: Joi.string().required().min(8).messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required: Cannot be empty',
      'any.required': 'Password is required: Cannot be empty',
      'string.min': 'Password must be at least 8 characters long' 
    })
});

const passwordValidationSchema = (req, res, next) => {
// Validate request body against schema
console.log("Validating password");
const { error } = passwordSchema.validate(req.body);
if (error) {
    return res.status(400).json({ error: error.details[0].message });
}

next();
};

module.exports = passwordValidationSchema;