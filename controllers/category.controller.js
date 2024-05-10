const Category = require('../models/categoryModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create Operation: Create a new Category
const createCategory = async (req, res) => {
    try {
        console.log("Creating Category");
        
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail });

        const { categoryName } = req.body;
        const category = new Category({ categoryName });
        const savedCategory = await category.save();

        // After creating the category, update users' categoryId
        user.categoryId = category._id;
        await user.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Error creating category' });
    }
};

// Read Operation: Get all Categories
const gettingAllCategory = async (req, res) => {
    try {
        console.log("Getting All Categories");
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching Categories:', error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

// Read Operation: Get a specific category by ID
const getOneCategory = async (req, res) => {
    try {
        console.log("Getting One Category");
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Error fetching category' });
    }
};

//
const updateCategory = async (req, res) => {
    try {
        console.log("Updating a Category");
        const { categoryName } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { categoryName }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error updating category' });
    }
};

// Delete Operation: Delete a Category by ID
const deleteCategory = async (req, res) => {
    try {
        console.log("Deleting a Category");
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting Category:', error);
        res.status(500).json({ message: 'Error deleting Category' });
    }
};

module.exports = {
    createCategory,
    gettingAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
};
