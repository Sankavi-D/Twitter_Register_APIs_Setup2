const Joi = require('joi');

// Common validate function
const validateSchema = (schema) => (req, res, next) => {
    try {
        // Validate request body against schema
        console.log("Validating request body data...");
    
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ status_code: 400, message: errorMessage });
        }
        next();

    } catch (validationError) {
        return res.status(500).json({ status_code: 500, message: 'Internal server error' });
    }
};

// Joi validation schema
const userSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required: Cannot be empty',
      'any.required': 'Name is required: Cannot be empty'
    }).strict(),
    email: Joi.string().email().required(),
    dob: Joi.date().iso().required()
  });

const passwordSchema = Joi.object({
    password: Joi.string().required().min(8).messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required: Cannot be empty',
      'any.required': 'Password is required: Cannot be empty',
      'string.min': 'Password must be at least 8 characters long' 
    })
});

const imageSchema = Joi.object({
    image: Joi.string().allow('').optional()
});

const usernameSchema = Joi.object({
    username: Joi.string().required().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/)
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'string.min': 'Username must have at least {#limit} characters',
            'string.max': 'Username must have at most {#limit} characters',
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores'
        })
});

const notificationSchema = Joi.object({
    notification: Joi.boolean().required()
});

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

const categorySelectionSchema = Joi.object({
    categoryName: Joi.string().required().messages({
        'string.base': 'Category Name must be a string',
        'any.required': 'CAtegory Name is required: Cannot be empty'
    }),      
});

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

const subcategoryUpdateSchema = Joi.object({
    subcategoryName: Joi.string().required().messages({
        'string.base': 'Subcategory name must be a string',
        'any.required': 'Subcategory name is required: Cannot be empty'
      })
});

const followSchema = Joi.object({
    userIds: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
        .required()
});

const userLoginSchema = Joi.object({
    username: Joi.string().required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required: Cannot be empty',
      'any.required': 'Username is required: Cannot be empty'
    }).strict(),
    password: Joi.string().required().messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required: Cannot be empty',
      'any.required': 'Password is required: Cannot be empty'
    })
});

// Validating request body data
const userRegisterValidation = validateSchema(userSchema);
const passwordValidation = validateSchema(passwordSchema);
const imageValidation = validateSchema(imageSchema);
const usernameValidation = validateSchema(usernameSchema);
const notificationValidation = validateSchema(notificationSchema);
const languageValidation = validateSchema(languageSelectionSchema);
const categoryValidation = validateSchema(categorySelectionSchema)
const subcategoryValidation = validateSchema(subcategorySelectionSchema);
const subcategoryUpdateValidation = validateSchema(subcategoryUpdateSchema);
const followValidation = validateSchema(followSchema);
const userLoginValidation = validateSchema(userLoginSchema);

module.exports = {
    userRegisterValidation,
    passwordValidation,
    imageValidation,
    usernameValidation,
    notificationValidation,
    languageValidation,
    categoryValidation,
    subcategoryValidation,
    subcategoryUpdateValidation,
    followValidation,
    userLoginValidation
};