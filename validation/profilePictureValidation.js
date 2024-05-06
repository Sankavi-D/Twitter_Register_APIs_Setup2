const Joi = require('joi');

const profileImageSchema = Joi.object({
    image: Joi.string().allow('').optional()
});

const profileImageValidationSchema = (req, res, next) => {
    // Validate request body
    console.log("Validating Profile Image");
    const { error } = profileImageSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details.map(detail => detail.message).join(', ');
        return res.status(400).json({ message: errorMessage });
    }

    next();
}

module.exports = profileImageValidationSchema;