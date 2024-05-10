const express = require('express');
const { getRegisteredUsers, followUsers } = require('../controllers/follow.controller');
const followValidationSchema = require('../validation/followValidaion');
const { authenticateToken } = require('../middleware/authentication');
const router = express.Router();

// Get already register username
router.get('/users', getRegisteredUsers);

// POST endpoint to follow users
router.post('/follower-setup', followValidationSchema, authenticateToken, followUsers);

module.exports = router;