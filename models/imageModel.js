const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
  
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        imageName: { 
            type: String, 
            required: true 
        },
        type: { 
            type: String, 
            enum: ['profile', 'post'], 
            required: true 
        },
    }, { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema);
