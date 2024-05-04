const express = require('express');
const router = express.Router();
const userValidationSchema = require('../validation/userValidation');
const { userRegister, userEmailVerify, passwordSetup } = require('../controllers/auth.controller');
const passwordValidationSchema = require('../validation/passwordValidation');

// User registration
router.post('/register', userValidationSchema, userRegister);

// Verify email
router.get('/verify-email', userEmailVerify);

// Password Setup
router.post('/password-setup', passwordValidationSchema, passwordSetup);

module.exports = router;