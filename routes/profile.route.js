const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const { profileSetup, displayProfileImage, getUserData } = require("../controllers/profile.controller");

router.get('/setup', authenticateToken, profileSetup);

router.get('/display/:filename', displayProfileImage);

router.get('/aggregation/user-data', authenticateToken, getUserData);

module.exports = router;