const express = require('express');
const router = express.Router();
const categoryValidationSchema = require('../validation/categoryValidation');
const { createCategory, gettingAllCategory, getOneCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

// Create Operation: Create a new category
router.post('/', categoryValidationSchema, createCategory);

// Read Operation: Get all categorys
router.get('/', gettingAllCategory);

// Read Operation: Get a specific category by ID
router.get('/:id', getOneCategory);

// Update Operation: Update a category by ID
router.put('/:id', categoryValidationSchema, updateCategory);

// Delete Operation: Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;