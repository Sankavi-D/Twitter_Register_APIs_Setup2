const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateToken = async (req, res, next) => {
  try {
    console.log("Authenticating...");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ status_code: 401, message: 'Unauthorized: Token is required' });
    }
    const secretKey = process.env.JWT_SECRET;
    
    try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(403).json({ status_code: 403, message: 'User not found' });
    }

    req.user = user;
      
    next();
    } catch (err) {
      return res.status(403).json({ status_code: 403, message: 'Invalid token' });
    }
  } catch (error) {
      console.error('Error:', error.message);
      return res.status(500).json({ status_code: 500, message: 'Internal server error' });
    }
};

const validateToken = async (req, res, next) => {
  console.log("Email Verification Started");
  const token = req.query.token;
  
  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id});
    await User.findByIdAndUpdate(user._id, { isEmailVerified: true });
    // res.status(200).json({ status_code: 200, message: 'Email verified successfully!', user });
    console.log( 'status_code: 200, message: Email verified successfully!' );
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Invalid or expired token');
  }
};

module.exports = {
  authenticateToken, 
  validateToken
};

