const express = require('express');
const router = express.Router();
// const followValidationSchema = require('../validation/followValidaion');
const authenticateToken = require('../middleware/authentication');
const { getRegisteredUsers, followUsers } = require('../controllers/follow.controller');
const { followValidation } = require('../validation/validateFunction');

// Get already register username
router.get('/users', getRegisteredUsers);

// POST endpoint to follow users
router.post('/follower-setup', followValidation, authenticateToken, followUsers);

module.exports = router;