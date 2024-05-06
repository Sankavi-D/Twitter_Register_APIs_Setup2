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
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfileImage' // Reference to the ProfileImage model
    },
    username: {
        type: String,
        unique: true, // Ensure usernames are unique
        sparse: true // Allow null values to coexist in unique index
    },
});


// Middleware to format the date before saving to the database
UserSchema.pre('save', function(next) {
    // Ensure only the date part is stored without the time component
    this.dob = new Date(this.dob.toISOString().split('T')[0]);
    next();
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;