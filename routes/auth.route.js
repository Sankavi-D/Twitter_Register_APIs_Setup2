const express = require('express');
const router = express.Router();
const { uploadImage, uploadVideo, checkFiles, checkImageFiles, checkVideoFile } = require('../middleware/multer');
const {authenticateToken, validateToken} = require('../middleware/authentication');
const { userRegisterValidation, passwordValidation, imageValidation, uploadVideoValidation, usernameValidation, notificationValidation, userLoginValidation, dateValidation } = require('../validation/validateFunction');
const { userRegister, userEmailVerify, passwordSetup, uploadImageHandler, uploadVideoHandler, suggestUsername, usernameSetup, notificationSetup, exportUserData, importUserData, userLogin, createPost, updateUserDobAndAge, activateAccount } = require('../controllers/auth.controller');
const sendTemplateMail = require('../controllers/mail.controller');

// User registration
router.post('/register', userRegisterValidation, userRegister, sendTemplateMail);

// Verify email
router.get('/verify-email', userEmailVerify);

// Password Setup
router.post('/password-setup', passwordValidation, authenticateToken, passwordSetup);

// Upload more than one Image Setup
router.post('/image-setup', authenticateToken, checkImageFiles,  uploadImageHandler);

// Upload video setup
router.post('/video-setup', authenticateToken, uploadVideoValidation, checkVideoFile, uploadVideoHandler);

// Suggest Username
router.post('/suggest-username', authenticateToken, suggestUsername);

// Unique username setup
router.post('/username-setup', usernameValidation, authenticateToken, usernameSetup);

// Notification Permission
router.post('/notification', notificationValidation, authenticateToken, notificationSetup);

// Export User Data
router.get('/export', exportUserData);

// Import User Data via Excel
// router.post('/import', upload.single('file'), importUserData);

// User Login
router.post('/login', userLoginValidation, userLogin);

// Uploading new post
router.post('/create-post', authenticateToken, createPost);

// Route to update user's dob and age
router.put('/:userId/updateDob', dateValidation, updateUserDobAndAge);

// Activate User's Account
router.get('/activate-account', validateToken, activateAccount);

module.exports = router;