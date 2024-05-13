const Subcategory = require('../models/subcategoryModel');

// Create Operation: Create a new Subcategory
const createSubcategory = async (req, res) => {
    try {
        console.log("Creating Subcategory");

        const user = req.user;
        
        const { subcategoryName, categoryId } = req.body;
        const subcategory = new Subcategory({ subcategoryName, categoryId });
        const savedSubcategory = await subcategory.save();

        // After creating the subcategory, update users' subcategoryId
        user.subcategoryId = subcategory._id;
        await user.save();

        res.status(201).json({ status_code: 201, savedSubcategory });
    } catch (error) {
        console.error('Error creating subcategory:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating subcategory' });
    }
};

// Read Operation: Get all Subategories
const gettingAllSubcategory = async (req, res) => {
    try {
        console.log("Getting All Subategories");
        const subcategories = await Subcategory.find();
        res.status(200).json({ status_code: 200, subcategories });
    } catch (error) {
        console.error('Error fetching Subategories:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching subcategories' });
    }
};

// Get Subcategory by categoryId
const getSubcategoriesByCategory = async (req, res) => {
    try {
        console.log("Getting Subcategory by Category ID");
        const categoryId = req.params.categoryId;
        const subcategories = await Subcategory.find({ categoryId });
        res.status(200).json({ status_code: 200, subcategories });
    } catch (error) {
        console.error('Error fetching subcategories by category:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching subcategories by category' });
    }
};

// Read Operation: Get a specific subcategory by ID
const getOneSubcategory = async (req, res) => {
    try {
        console.log("Getting One Subcategory");
        const subcategory = await Subcategory.findById(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ status_code: 404, message: 'Subcategory not found' });
        }
        res.status(200).json({ status_code: 200, subcategory });
    } catch (error) {
        console.error('Error fetching subcategory:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching subcategory' });
    }
};

//
const updateSubcategory = async (req, res) => {
    try {
        console.log("Updating a Subcategory");
        const { subcategoryName } = req.body;
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id, { subcategoryName }, { new: true });
        if (!updatedSubcategory) {
            return res.status(404).json({ status_code: 404, message: 'Subcategory not found' });
        }
        res.status(200).json({ status_code: 200, updatedSubcategory });
    } catch (error) {
        console.error('Error updating subcategory:', error);
        res.status(500).json({ status_code: 500, message: 'Error updating subcategory' });
    }
};

// Delete Operation: Delete a Subcategory by ID
const deleteSubcategory = async (req, res) => {
    try {
        console.log("Deleting a Subcategory");
        const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (!deletedSubcategory) {
            return res.status(404).json({ status_code: 404, message: 'Subcategory not found' });
        }
        res.status(200).json({ status_code: 200, message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error('Error deleting Subcategory:', error);
        res.status(500).json({ status_code: 500, message: 'Error deleting Subcategory' });
    }
};

module.exports = {
    createSubcategory,
    gettingAllSubcategory,
    getSubcategoriesByCategory,
    updateSubcategory,
    deleteSubcategory
};
