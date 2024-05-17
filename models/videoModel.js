const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        videoName: { 
            type: String, 
            required: true 
        },
        title: { 
            type: String, 
            required: true 
        },
    }, { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
