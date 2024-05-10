const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

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


const authenticateToken = (req, res, next) => {
  console.log("Authenticating...");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'MY_SECRET_TOKEN', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  });
};

module.exports = {
  verifyEmail,
  authenticateToken
};

