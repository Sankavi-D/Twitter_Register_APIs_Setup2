const Joi = require('joi');

// Joi validation schema for category selection
const categorySelectionSchema = Joi.object({
    categoryName: Joi.string().required().messages({
        'string.base': 'Category Name must be a string',
        'any.required': 'CAtegory Name is required: Cannot be empty'
      }),
      
    });

const categoryValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating category");
    const { error } = categorySelectionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = categoryValidationSchema;