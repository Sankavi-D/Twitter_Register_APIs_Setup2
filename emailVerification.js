const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

// Generate JWT token for email verification
const generateVerificationToken = (email) => {
  return jwt.sign({ email }, "MY_SECRET_TOKEN", { expiresIn: '24h' }); // Change the expiry as needed
};

// Verify email function
const verifyEmail = async (token) => {
  if (!token) {
    throw new Error('Token is required');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "MY_SECRET_TOKEN");

    // Check if the email exists in the database
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw new Error('User not found');
    }

    return user; // Return the user if verification is successful
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateVerificationToken, verifyEmail };
