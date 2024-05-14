const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const excel = require('exceljs');
const fs = require('fs');
const User = require('../models/userModel');
const Image = require('../models/imageModel');
const Profile = require('../models/profilePicture');
const Post = require('../models/postModel');

const userRegister =  async (req, res) => {
  try {
    console.log("Registration Started");
    const { name, email, dob } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status_code: 400, message: 'Email already exists' });
    }

    // const userId = await getNextSequenceValue('userId');
    const user = new User({ name, email, dob });
    await user.save();

    // Generate verification token
    const secretKey = process.env.JWT_SECRET;
    console.log(secretKey);
    const verificationToken = jwt.sign({ _id: user._id, email }, secretKey, { expiresIn: '24h' });
    console.log('Verification token:', verificationToken);

    res.status(201).json({ status_code: 201, user, verificationToken });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ status_code: 500, error: 'Registration failed' });
  }
};

const userEmailVerify = async (req, res) => {
  try {
    console.log("Email Verification Started");

    const { token } = req.query;
    if (!token) {
      throw new Error('Token is required');
    }
    
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    console.log('decoded: ', decoded)
    const user = await User.findOne({ _id: decoded._id});
    await User.findByIdAndUpdate(user._id, { isEmailVerified: true });
    
    res.status(200).json({ status_code: 200, message: 'Email verified successfully!', user });
  } catch (error) {
    res.status(401).json({ status_code: 401, message: error.message });
  }
};

const passwordSetup = async (req, res) => {
  console.log("Password Setup Initiated");
  try {
    const user = req.user;
    
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
      
    res.status(201).json({ status_code: 201, message: 'Password setup successful' });
    } catch (error) {
      res.status(500).json({ status_code : 500, message: error.message });
    }
};

const uploadImage = async (req, res) => {
  try {
    console.log("DB Image storing function initiated");
    const user = req.user;
    const { type } = req.body;
    const images = req.files.map(file => {
      return {
        userId: req.body.userId,
        imageName: file.filename,
        type: type
      };
    });

    const savedImages = await Image.create(images);

    if (type === 'profile') {
      await Profile.findOneAndUpdate({ userId: user._id }, { profileImageId: savedImages._id });
      console.log(Profile);
    } else if (type === 'post') {
      await Post.findOneAndUpdate({ userId: user._id }, { postImageId: savedImages._id });
      console.log(`post: `, Post);
    }

    console.log("Images saved successfully:", savedImages);
    res.status(201).json({ status_code: 201, message: 'Images uploaded successfully', uploadedImages: savedImages });
  } catch (error) {
    
    console.log("Error on storing images in the database:", error);
    res.status(500).json({ status_code: 500, message: error.message });
  }
};

const uploadImageOld = async (req, res) => {
  try {
    console.log("DB Image storing function initiated");
    const { type } = req.body;

    const images = req.files.map(file => file.path); // Get an array of paths for the uploaded images
   
    const user = req.user;
    const userId = user._id;

    const savedImages = await new Image({ userId: userId, images, type });
    console.log('saved images: ', savedImages);

    // Update the user document with the imageIds
    user.imageIds = savedImages._id;
    await user.save();

     // Update profile or post with the imageIds
     if (type === 'profile') {
      await Profile.findOneAndUpdate({ userId: user._id }, { profileImageIds: savedImages._id });
    } else if (type === 'post') {
      await Post.findOneAndUpdate({ userId }, { postImageIds: savedImages._id });
    }

  console.log("Images saved successfully:", savedImages);
  res.status(201).json({ status_code: 201, message: 'Images uploaded successfully', uploadedImages: savedImages });
  } catch (error) {
    console.log("Error on storing images in the database:", error);
    res.status(500).json({ status_code: 500, message: error.message });
  }
};

// Diplay the suggesting usernames
const suggestUsername = async (req, res) => {
  try {
      console.log("Username suggestion started");
      const user = req.user;

      // Generate username suggestions based on user's name and email
      const usernameSuggestions = generateUsernameSuggestions(user.name, user.email);

      // Return the username suggestions to the client
      res.status(200).json({ status_code: 200, message: 'Username suggestions generated', usernameSuggestions });
  } catch (error) {
      console.error('Error generating username suggestions:', error);
      res.status(500).json({ status_code: 500, message: 'Error generating username suggestions' });
  }
};

const usernameSetup = async (req, res) => {
  try {
      console.log("Username setup started");
      const user = req.user;

      const { username } = req.body;
            
      // Check if the entered username is available in the database
      const isUsernameAvailable = await checkAvailability(username);
      if (!isUsernameAvailable) {
          // If the username is already taken, return an error message
          return res.status(400).json({ status_code: 400, message: 'Username already exists' });
      }

      // Update the user's username in the database
      user.username = username;
      await user.save();

      // Return the final username to the client
      res.status(200).json({ status_code: 200, message: 'Username setup successful', username});
    } catch (error) {
    console.error('Error setting up username:', error);
    res.status(500).json({ status_code: 500, message: 'Error setting up username' });
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
    
    const user = req.user;
    
    // Update the user's notification preference
    user.notification = notification;
    await user.save();

    let notification_permission;
    if (notification) {
      notification_permission = "Notification Allowed";
    } else {
      notification_permission = "Notification Blocked";
    }
    console.log(notification_permission);
  
    res.status(200).json({ status_code: 200, notification_permission });
  } catch (error) {
    res.status(500).json({ status_code: 500, error: error.details[0].message });
  }
};

// Exporting user data as excel file
const exportUserData = async (req, res) => {
  try {
    console.log("Exporting User Data..");
    const users = await User.find();

    // Create Excel workbook and worksheet
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Define columns
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'DOB', key: 'dob', width: 30 }
    ];

    // Add data to the worksheet
    users.forEach(user => {
      worksheet.addRow({
        name: user.name, 
        email: user.email,
        dob: user.dob
      });
    });

    // Generate Excel file
    const filePath = 'users.xlsx';
    await workbook.xlsx.writeFile(filePath);

    // Send the Excel file as a response
    res.download(filePath, 'users.xlsx', (err) => {
      // Clean up temporary Excel file after download
      if (err) {
        console.error('Error sending Excel file:', err);
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error exporting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// import user data via excel file
const importUserData = async (req, res) => {
  try {
    console.log("Import User Data file...");
    const workbook = new excel.Workbook();
    const filePath = req.file.path; // multer middleware for file upload
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    const users = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) { // Skip header row
        const userData = {
          name: row.getCell(1).value,
          email: row.getCell(2).value,
          dob: row.getCell(3).value
        };
        users.push(userData);
      }
    });

    // Insert users into database
    await User.insertMany(users);

    res.status(200).json({ status_code: 200, message: 'Users imported successfully' });
  } catch (error) {
    console.error('Error importing users:', error);
    res.status(500).json({ status_code: 500, error: 'Internal server error' });
  }
};

const userLogin = async (req, res) => {
  try {
    console.log("User Login Started...");
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(401).json({ status_code: 401, message: 'Invalid username' });
    }

    // const userPass = await User.findOne({ password });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status_code: 401, message: 'Invalid password' });
    }
    
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
    
    await user.save(); 

    res.status(200).json({ status_code: 200, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ status_code: 500, message: error.message });
  }
};

const createPost = async (req, res) => {
    try {
      console.log("Creating Post...");
      const user = req.user;
      console.log(user);

      const { title, description } = req.body;
      console.log(req.body);
      // const image = req.file.path;
      
      
      const postImageId = user.postImageId;
      console.log('postImageId: ', postImageId);
  
      const newPost = new Post({ postImageId, title, description });
      await newPost.save();
  
      user.postId = newPost._id;
      await user.save();
  
      res.status(200).json( { status_code: 200, message: 'Post created successfully', newPost } );
    } catch (error) {
      console.log("Error on storing post on db");
      res.status(500).json({ status_code: 500, message: error.message });
    }
};

// Function to update user's age
const updateUserAge = async (req, res) => {
  try {
    console.log("DOB updatation started...");
    const userId = req.params.userId;
    const { dob } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { dob },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status_code: 404, message: 'User not found' });
    }

    res.status(200).json({ status_code: 200, message: 'User dob and age updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user dob:', error.message);
    res.status(500).json({ status_code: 500, error: 'Failed to update user dob' });
  }
};

module.exports = {
  userRegister,
  userEmailVerify,
  passwordSetup,
  uploadImage,
  suggestUsername,
  usernameSetup,
  notificationSetup,
  exportUserData,
  importUserData,
  userLogin,
  createPost,
  updateUserAge
};