const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const Password = require('../models/passwordModel');
const { generateVerificationToken, verifyEmail } = require('../emailVerification');


const userRegister =  async (req, res) => {
  try {
    console.log("Registration Started");
    const { name, email, dob } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    } 
    // Save user data to MongoDB
    const user = new User({ name, email, dob });
    await user.save();

    // Generate verification token
    console.log("Email Verification Started");
    const verificationToken = generateVerificationToken(email);
    console.log('Verification token:', verificationToken);

    res.json({user, verificationToken });
  } catch (error) {
    res.status(500).json({ error: error.details[0].message });
  }
};

const userEmailVerify = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await verifyEmail(token);
    res.json({ message: 'Email verified successfully', user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const passwordSetup = async (req, res) => {
  console.log("Password Setup Initiated");
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordCreated = await Password.create({ password: hashedPassword });
    await passwordCreated.save();
      
    res.status(200).json({ message: 'Password setup successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
  userRegister,
  userEmailVerify,
  passwordSetup
};