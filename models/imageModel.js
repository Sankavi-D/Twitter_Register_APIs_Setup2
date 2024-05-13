const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        imageName: {
            type: String,
            required: false
            },
        type: String, // 'profile' or 'post'
    }, { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);
