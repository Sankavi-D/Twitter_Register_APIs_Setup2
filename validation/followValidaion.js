const Joi = require('joi');

// Define Joi schema for username validation
// const followSchema = Joi.object({
//     usernames: Joi.array().items(Joi.string()).min(1).messages({
//             'array.base': 'Usernames must be provided as an array',
//             'array.empty': 'At least one username must be provided',
//             'array.min': 'At least one username must be provided',
//             'string.base': 'Each username must be a string'
//         })
    
// });

// Joi validation schema for the "/follow" API
const followSchema = Joi.object({
    userIds: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
        .required()
});

const followValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating user Ids to follow");
        
    const { error } = followSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = followValidationSchema;
 