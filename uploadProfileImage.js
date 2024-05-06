const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const ProfileImage = require('./models/profilePicture');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    console.log("verifying the token to upload image");
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is required' });
    }

    jwt.verify(token, 'JWT_SECRET_KEY', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.id; // User ID extracted from the token
        next();
    });
};

// Upload profile image
const uploadProfileImage = async (req, res) => {
    console.log("Uploading the image");
    try {
        const { userId } = req; // User ID extracted from the verified token
        const image = req.file.path; // Get the path of the uploaded image

        // Link profile image to the user
        const profileImage = new ProfileImage({ userId, image });
        await profileImage.save();

        res.status(200).json(profileImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    verifyToken,
    uploadProfileImage
};
