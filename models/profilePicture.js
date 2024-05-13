const mongoose = require('mongoose');

const ProfilePictureSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        profileImageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
          },     
    },
    
    {
        timestamps: true,
    }
);

const ProfileImage = mongoose.model("ProfileImage", ProfilePictureSchema);

module.exports = ProfileImage;