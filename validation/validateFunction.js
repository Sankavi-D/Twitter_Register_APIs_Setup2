const Joi = require('joi');

// Common validate function
const validateSchema = (schema) => (req, res, next) => {
    console.log("Validating request body data...");

    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ status_code: 400, message: errorMessage });
    }
    next();
};

const validateImageSchema = (schema) => (req, res, next) => {
    // Validate request body against schema
    console.log("Validating request body data...");

    const { error } = schema.validate(req.file);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ status_code: 400, message: errorMessage });
    }
    
  next();
};

// Joi validation schema
const userSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required: Cannot be empty',
      'any.required': 'Name is required: Cannot be empty'
    }).strict(),
    email: Joi.string().email().required().messages({
      'string.email': `"email" must be a valid email`,
      'any.required': `"email" is a required field`
    }),
    dob: Joi.string().isoDate().required().messages({
      'string.isoDate': `"dob" must be a valid ISO date`,
      'any.required': `"dob" is a required field`
    })
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
    image: Joi.array().items(
        Joi.object({
            path: Joi.string().required().messages({
                'string.base': 'Invalid image type',
                'any.required': 'Image is required'
            }),
        })
    ).min(1).required().messages({
        'array.base': 'Images should be an array of files',
        'array.min': 'At least one image is required',
        'any.required': 'Images are required'
    }),
    type: Joi.string().valid('profile', 'post').required().messages({
          'any.required': 'Type is required',
          'any.only': 'Type must be either "profile" or "post"',
          'string.base': 'Type must be a string'
        }),
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
    subcategoryName: Joi.array().items(Joi.string().required()).min(1).required().messages({
        'array.base': 'Subcategory names should be an array of strings.',
        'array.min': 'There should be at least one subcategory name.',
        'string.empty': 'Subcategory name cannot be empty.',
        'any.required': 'Subcategory names are required.'
    }),
    categoryId: Joi.string().required().messages({
        'string.base': 'Category Id must be a string',
        'any.required': 'Category Id is required: Cannot be empty'
    }),
});

const subcategoryUpdateSchema = Joi.object({
    subcategoryName: Joi.array().items(Joi.string().required()).min(1).required().messages({
      'array.base': 'Subcategory names should be an array of strings.',
      'array.min': 'There should be at least one subcategory name.',
      'string.empty': 'Subcategory name cannot be empty.',
      'any.required': 'Subcategory names are required.'
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

const dateSchema = Joi.object({
    dob: Joi.string().isoDate().required().messages({
      'string.isoDate': 'dob must be a valid ISO date ex: 1990-12-25',
      'any.required': 'dob is a required field'
    })
  });

// Validating request body data
const userRegisterValidation = validateSchema(userSchema);
const passwordValidation = validateSchema(passwordSchema);
const imageValidation = validateImageSchema(imageSchema);
const usernameValidation = validateSchema(usernameSchema);
const notificationValidation = validateSchema(notificationSchema);
const languageValidation = validateSchema(languageSelectionSchema);
const categoryValidation = validateSchema(categorySelectionSchema)
const subcategoryValidation = validateSchema(subcategorySelectionSchema);
const subcategoryUpdateValidation = validateSchema(subcategoryUpdateSchema);
const followValidation = validateSchema(followSchema);
const userLoginValidation = validateSchema(userLoginSchema);
const dateValidation = validateSchema(dateSchema);

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
    userLoginValidation,
    dateValidation
};