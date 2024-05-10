const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    dob: { 
        type: Date, 
        required: true,
    },
    passwordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Password'
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfileImage' // Reference to the ProfileImage model
    },
    username: {
        type: String,
        unique: true, // Ensure usernames are unique
        sparse: true // Allow null values to coexist in unique index
    },
    notification: {
        type: Boolean,
        required: false
    },
    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language' // Reference to the Language model
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category' // Reference to the Category model
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory' // Reference to the Category model
    },
    following: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ], // Array of users this user is following
    followers: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ] // Array of users following this user

});

const User = mongoose.model('User', UserSchema);

module.exports = User;