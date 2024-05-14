const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        postImageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        },
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;