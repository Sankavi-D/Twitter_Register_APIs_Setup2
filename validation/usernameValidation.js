const Joi = require('joi');

// Validation schema for username setup
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

const usernameValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating username");
    const { error } = usernameSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    next();
    };

module.exports = usernameValidationSchema;
