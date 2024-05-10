const express = require('express');
const router = express.Router();
const { profileSetup, displayProfileImage } = require("../controllers/profile.controller");
const { authenticateToken } = require('../middleware/authentication');

router.get('/setup', authenticateToken, profileSetup);

router.get('/display/:filename', displayProfileImage);

module.exports = router;