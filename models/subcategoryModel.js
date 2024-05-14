const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    subcategoryName: [
        {
        type: String,
        required: true,
        unique: true
        }
    ],
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    }
});

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;
