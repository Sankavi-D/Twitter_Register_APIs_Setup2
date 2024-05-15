const express = require('express');
const router = express.Router();
// const subcategoryValidationSchema = require('../validation/subcategoryValidation');
const { authenticateToken } = require('../middleware/authentication');
const { createSubcategory, gettingAllSubcategory, getSubcategoriesByCategory, updateSubcategory, deleteSubcategory } = require('../controllers/subcategory.controller');
const { subcategoryValidation, subcategoryUpdateValidation } = require('../validation/validateFunction');

// Create Operation: Create a new subcategory
router.post('/', subcategoryValidation, authenticateToken, createSubcategory);

// Read Operation: Get all subcategorys
router.get('/', gettingAllSubcategory);

// Read Operation: Get a specific subcategories by category ID
router.get('/:categoryId', getSubcategoriesByCategory);

// Update Operation: Update a subcategory by ID
router.put('/:id', subcategoryUpdateValidation, updateSubcategory);

// Delete Operation: Delete a subcategory by ID
router.delete('/:id', deleteSubcategory);

module.exports = router;