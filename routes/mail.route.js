const express = require('express');
const router = express.Router();
const sendTemplateMail = require('../controllers/mail.controller');

// Send template (HTML) mail
router.post('/email', sendTemplateMail);

module.exports = router;