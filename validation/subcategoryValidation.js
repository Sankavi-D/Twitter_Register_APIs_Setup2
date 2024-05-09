const Joi = require('joi');

// Joi validation schema for subcategory selection
const subcategorySelectionSchema = Joi.object({
    subcategoryName: Joi.string().required().messages({
        'string.base': 'Subcategory name must be a string',
        'any.required': 'Subcategory name is required: Cannot be empty'
      }),
      categoryId: Joi.string().required().messages({
        'string.base': 'Category Id must be a string',
        'any.required': 'Category Id is required: Cannot be empty'
      }),
    });

const subcategoryValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating subcategory");
    const { error } = subcategorySelectionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = subcategoryValidationSchema;