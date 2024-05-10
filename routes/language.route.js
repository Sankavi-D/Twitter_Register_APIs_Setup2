const express = require('express');
const router = express.Router();
const languageValidationSchema = require('../validation/languageValidation');
const { createLanguage, gettingAllLanguage, getOneLanguage, updateLanguage, deleteLanguage } = require('../controllers/language.controller');
const { authenticateToken } = require('../middleware/authentication');

// Create Operation: Create a new language
router.post('/', languageValidationSchema, authenticateToken, createLanguage);

// Read Operation: Get all languages
router.get('/', gettingAllLanguage);

// Read Operation: Get a specific language by ID
router.get('/:id', getOneLanguage);

// Update Operation: Update a language by ID
router.put('/:id', languageValidationSchema, updateLanguage);

// Delete Operation: Delete a language by ID
router.delete('/:id', deleteLanguage);

module.exports = router;