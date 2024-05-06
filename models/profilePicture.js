const mongoose = require('mongoose');

const ProfilePictureSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    
    {
        timestamps: true,
    }
);

const ProfileImage = mongoose.model("ProfileImage", ProfilePictureSchema);

module.exports = ProfileImage;