const path = require('path');
const User = require('../models/userModel');

// Assuming you have a route handler for the profile API
const profileSetup = async (req, res) => {
    try {
        console.log("Profile Populated");
        
        const user = req.user;

        // Find the user profile by user ID
        const userId = user._id;
        console.log('User ID: ', userId);
        const userProfile = await User.findById(userId)
            .populate('imageId')
            .populate('languageId')
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('profile');

        // Send the populated user profile in the response
        res.status(200).json({ status_code: 200, userProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status_code: 500, message: 'Internal server error' });
    }
};


// Handle GET request to display the uploaded image
const displayProfileImage = async (req, res) => {
    console.log("Display Profile Image");
    const filename = req.params.filename;
    
    try {
        // Construct the image path
        const imagePath = path.join(__dirname, '../uploads', filename);
        console.log(imagePath);

        res.sendFile(imagePath);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ status_code: 500, error: 'Internal server error' });
    }
};

// Aggregation Method
const getUserData = async (req, res) => {
    try {
        console.log("Aggregation Method Started...");
        
        const user = req.user;

        const userId = user._id;
        console.log('User ID: ', userId);
  
        const aggregationResult = await User.aggregate([
            {
                $match: { _id: userId }
            }
        ]);
    
      res.status(200).json({ status_code: 200, aggregationResult });
    } catch (error) {
      console.error('Error counting followers:', error);
      res.status(500).json({ status_code: 500, error: 'Internal server error' });
    }
};


module.exports = {
    profileSetup,
    displayProfileImage,
    getUserData
};
