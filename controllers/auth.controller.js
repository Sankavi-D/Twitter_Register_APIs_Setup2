const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Password = require('../models/passwordModel');
const ProfileImage = require('../models/profilePicture');
const { authentication, verifyEmail } = require('../middleware/authentication');

const userRegister =  async (req, res) => {
  try {
    console.log("Registration Started");
    const { name, email, dob } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, dob });
    await user.save();

    // Generate verification token
    console.log("Email Verification Started");
    const verificationToken = jwt.sign({ email }, "MY_SECRET_TOKEN", { expiresIn: '24h' });
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
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordCreated = await Password.create({ password: hashedPassword });
    await passwordCreated.save();
    
    // After creating the category, update users' categoryId
    user.passwordId = passwordCreated._id;
    await user.save();
      
    res.status(200).json({ message: 'Password setup successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const uploadProfileImage = async (req, res) => {
  try {
    console.log("DB Image storing function initiated");
    const image = req.file.path; // Get the path of the uploaded image
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });

    // Create a new profile image associated with the user's _id
    const profileImage = new ProfileImage({ image, userId: user._id });
    await profileImage.save();

    // Update the user document with the imageId
    user.imageId = profileImage._id;
    await user.save();

    res.status(200).json(profileImage);
  } catch (error) {
    console.log("Error on storing image on db");
    res.status(500).json({ message: error.message });
  }
};

// Diplay the suggesting usernames
const suggestUsername = async (req, res) => {
  try {
      console.log("Username suggestion started");
      const userEmail = req.user.email;
      const user = await User.findOne({ email: userEmail });

        // Generate username suggestions based on user's name and email
        const usernameSuggestions = generateUsernameSuggestions(user.name, user.email);

        // Return the username suggestions to the client
        res.status(200).json({ message: 'Username suggestions generated', usernameSuggestions });
  } catch (error) {
      console.error('Error generating username suggestions:', error);
      res.status(500).json({ message: 'Error generating username suggestions' });
  }
};

const usernameSetup = async (req, res) => {
  try {
      console.log("Username setup started");
      const { username } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const user = await authentication(token);

      // Check if the entered username is available in the database
      const isUsernameAvailable = await checkAvailability(username);
      if (!isUsernameAvailable) {
          // If the username is already taken, return an error message
          return res.status(400).json({ message: 'Username already exists' });
      }

      // Update the user's username in the database
      user.username = username;
      await user.save();

      // Return the final username to the client
      res.status(200).json({ message: 'Username setup successful', username});
    } catch (error) {
    console.error('Error setting up username:', error);
    res.status(500).json({ message: 'Error setting up username' });
    }
};

// Function to generate username suggestions based on name and email
const generateUsernameSuggestions = (name, email) => {
  console.log("Generating username suggestion...")
  const usernameSuggestions = [];
  const usernameFromName = name.replace(/\s/g, '').toLowerCase(); // Remove spaces and convert to lowercase
  const usernameFromEmail = email.split('@')[0].toLowerCase(); // Get the part before @ and convert to lowercase

  // Add username suggestions based on name and email
  usernameSuggestions.push(usernameFromName);
  usernameSuggestions.push(usernameFromEmail);

  return usernameSuggestions;
};

// Function to check availability of username suggestions in the database
const checkAvailability = async (username) => {
  try {
    console.log("Checking for username availability...")
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw new Error('Error checking username availability');
  }
};

const notificationSetup = async (req, res) => {
  try {
    console.log("Notification setup started");
   
    const { notification } = req.body;
    
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    
    // Update the user's notification preference
    user.notification = notification;
    await user.save();

    let notificationPermission;
    if (notification) {
      notificationPermission = "Notification Allowed";
    } else {
      notificationPermission = "Notification Blocked";
    }
    console.log(notificationPermission);
  
    res.json({ user, notificationPermission });
  } catch (error) {
    res.status(500).json({ error: error.details[0].message });
  }
};

module.exports = {
  userRegister,
  userEmailVerify,
  passwordSetup,
  uploadProfileImage,
  suggestUsername,
  usernameSetup,
  notificationSetup
};