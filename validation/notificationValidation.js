const Joi = require('joi');

// Validation schema for notification permission
const notificationSchema = Joi.object({
        notification: Joi.boolean().required()
});

const notificationValidationSchema = (req, res, next) => {
    // Validate request body against schema
    console.log("Validating notification");
    const { error } = notificationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    
    next();
};
    
module.exports = notificationValidationSchema;