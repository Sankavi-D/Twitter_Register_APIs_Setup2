const Joi = require('joi');
const moment = require('moment');

// Validation schema for user password register
const userSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required: Cannot be empty',
      'any.required': 'Name is required: Cannot be empty'
    }).strict(),
    email: Joi.string().email().required(),
    dob: Joi.date().iso().required().custom((value, helpers) => {
      // Custom validation to ensure date is in the format YYYY-MM-DD
      if (!moment(value).isValid()) {
        return helpers.message('Invalid date format');
      }
      return moment.utc(value).format('YYYY-MM-DD'); // Format date to YYYY-MM-DD without time component
    })
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