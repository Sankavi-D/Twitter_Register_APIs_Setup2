const express = require('express');
const router = express.Router();
const userValidationSchema = require('../validation/userValidation');
const { userRegister, userEmailVerify, passwordSetup, uploadProfileImage, suggestUsername, usernameSetup, notificationSetup, selectLanguage } = require('../controllers/auth.controller');
const passwordValidationSchema = require('../validation/passwordValidation');
const profileImageValidationSchema = require('../validation/profilePictureValidation');
const usernameValidationSchema = require('../validation/usernameValidation');
const notificationValidationSchema = require('../validation/notificationValidation');

const upload = require('../middleware/multer');

// User registration
router.post('/register', userValidationSchema, userRegister);

// Verify email
router.get('/verify-email', userEmailVerify);

// Password Setup
router.post('/password-setup', passwordValidationSchema, passwordSetup);

// Profile Picture Setup
router.post('/profile-picture-setup', profileImageValidationSchema, upload.single('image'), uploadProfileImage);

// Suggest Username
router.post('/suggest-username', suggestUsername);

// Unique username setup
router.post('/username-setup', usernameValidationSchema, usernameSetup);

// Notification Permission
router.post('/notification', notificationValidationSchema, notificationSetup);

module.exports = router;