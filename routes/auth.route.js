const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const authenticateToken = require('../middleware/authentication');
const { userRegisterValidation, passwordValidation, imageValidation, usernameValidation, notificationValidation, userLoginValidation } = require('../validation/validateFunction');
const { userRegister, userEmailVerify, passwordSetup, uploadImage, suggestUsername, usernameSetup, notificationSetup, exportUserData, importUserData, userLogin, createPost } = require('../controllers/auth.controller');

// User registration
router.post('/register', userRegisterValidation, userRegister);

// Verify email
router.get('/verify-email', userEmailVerify);

// Password Setup
router.post('/password-setup', passwordValidation, authenticateToken, passwordSetup);

// Profile Picture Setup
router.post('/image-setup', imageValidation, upload.single('image'), authenticateToken, uploadImage);

// Suggest Username
router.post('/suggest-username', authenticateToken, suggestUsername);

// Unique username setup
router.post('/username-setup', usernameValidation, authenticateToken, usernameSetup);

// Notification Permission
router.post('/notification', notificationValidation, authenticateToken, notificationSetup);

// Export User Data
router.get('/export', exportUserData);

// Import User Data via Excel
router.post('/import', upload.single('file'), importUserData);

// User Login
router.post('/login', userLoginValidation, userLogin);

// Uploading new post
router.post('/create-post', authenticateToken, createPost);

module.exports = router;