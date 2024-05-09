const Joi = require('joi');

// Joi validation schema for language selection
const languageSelectionSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Name is required: Cannot be empty'
      }),
    status: Joi.string().valid('active', 'inactive').messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be either "active" or "inactive"',
        'any.required': 'Status is required: Cannot be empty' 
      }),
    });

const languageValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating language name, status");
    const { error } = languageSelectionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = languageValidationSchema;