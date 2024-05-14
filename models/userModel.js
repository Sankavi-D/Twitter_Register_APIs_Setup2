const mongoose = require('mongoose');
const getNextSequenceValue = require('../utils/autoIncrement');

const UserSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        unique: true 
    },
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
        type: String, 
        required: true,
    },
    age: {
        type: Number,
        default: 0
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        // required: true
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image' // Reference to the Image model
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
        ref: 'Language'
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
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
    ], // Array of users following this user
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
}, { timestamps: true }
);

// function to calculate age based on dob
const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) {
      age--;
    }
    console.log("User's age is: ", age);
    return age;
};

// Pre-save hook to calculate age based on dob
// UserSchema.pre('save', function(next) {
//     if (this.isModified('dob')) {
//       this.age = calculateAge(this.dob);
//     }
//     next();
// });

// Pre-save hook to handle auto-increment for userId and update age based on dob
UserSchema.pre('save', async function(next) {
    if (this.isNew) {
      const sequenceValue = await getNextSequenceValue('userId');
      this.userId = `user${sequenceValue.toString().padStart(5, '0')}`;
    }
  
    if (this.isModified('dob')) {
      this.age = calculateAge(this.dob);
    }
  
    next();
  });
  
// Pre hook for findOneAndUpdate to update age when dob is modified
UserSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();

    if (update.dob) {
        update.age = calculateAge(update.dob);
        this.setUpdate(update);
    }

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;