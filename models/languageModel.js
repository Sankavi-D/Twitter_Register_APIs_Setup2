const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;
