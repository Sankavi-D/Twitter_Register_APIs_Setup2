const express = require('express');
const router = express.Router();
const { languageValidation } = require('../validation/validateFunction');
const authenticateToken = require('../middleware/authentication');
const { createLanguage, gettingAllLanguage, getOneLanguage, updateLanguage, deleteLanguage } = require('../controllers/language.controller');

// Create Operation: Create a new language
router.post('/', languageValidation, authenticateToken, createLanguage);

// Read Operation: Get all languages
router.get('/', gettingAllLanguage);

// Read Operation: Get a specific language by ID
router.get('/:id', getOneLanguage);

// Update Operation: Update a language by ID
router.put('/:id', languageValidation, updateLanguage);

// Delete Operation: Delete a language by ID
router.delete('/:id', deleteLanguage);

module.exports = router;