const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Controller function to get unique usernames of registered users
const getRegisteredUsers = async (req, res) => {
    try {
        console.log("Getting registered users to follow");
        
        const users = await User.find({ username: { $ne: null } }, { username: 1, _id: 1 });
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching registered users:', error);
        res.status(500).json({ message: 'Error fetching registered users' });
    }
};

// Controller function to follow users
const followUsers = async (req, res) => {
    try {
        console.log("Following users");
        
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });

        const { userIds } = req.body; // Extract user IDs from the request body
        
        // Validate if userIds is an array and not empty
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: 'User IDs must be provided in an array and cannot be empty' });
        }

        // Find the current user by ID 
        const currentUser = await User.findById(user._id);
       
        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the specified users to the current user's following list
        currentUser.following.push(...userIds);

        // Save the updated user document
        await currentUser.save();

        res.status(200).json({ message: 'Users followed successfully' });
    } catch (error) {
        console.error('Error following users:', error);
        res.status(500).json({ message: 'Error following users' });
    }
};


module.exports = {
    getRegisteredUsers,
    followUsers
};