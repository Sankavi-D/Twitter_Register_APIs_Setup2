const Language = require('../models/languageModel');

// Create Operation: Create a new language
const createLanguage = async (req, res) => {
    try {
        console.log("Creating Language");
        
        const user = req.user;

        const { name, status } = req.body;
        const language = new Language({ name, status });
        const savedLanguage = await language.save();

        // After creating the language, update users' languageId
        user.languageId = language._id;
        await user.save();
        console.log(user.languageId);

        res.status(201).json({ status_code: 201, savedLanguage });
    } catch (error) {
        console.error('Error creating language:', error);
        res.status(500).json({ status_code: 500, message: 'Error creating language' });
    }
};

// Read Operation: Get all languages
const gettingAllLanguage = async (req, res) => {
    try {
        console.log("Getting All Language");
        const languages = await Language.find();
        res.status(200).json({ status_code: 200, languages });
    } catch (error) {
        console.error('Error fetching languages:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching languages' });
    }
};

// Read Operation: Get a specific language by ID
const getOneLanguage = async (req, res) => {
    try {
        console.log("Getting One Language");
        const language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).json({ status_code: 404, message: 'Language not found' });
        }
        res.status(200).json({ status_code: 200, language });
    } catch (error) {
        console.error('Error fetching language:', error);
        res.status(500).json({ status_code: 500, message: 'Error fetching language' });
    }
};

// Update Operation: Update a category by ID
const updateLanguage = async (req, res) => {
    try {
        console.log("Updating a Language");
        const { name, status } = req.body;
        const updatedLanguage = await Language.findByIdAndUpdate(req.params.id, { name, status }, { new: true });
        if (!updatedLanguage) {
            return res.status(404).json({ status_code: 404, message: 'Language not found' });
        }
        res.status(200).json({ status_code: 200, updatedLanguage });
    } catch (error) {
        console.error('Error updating language:', error);
        res.status(500).json({ status_code: 500, message: 'Error updating language' });
    }
};

// Delete Operation: Delete a language by ID
const deleteLanguage = async (req, res) => {
    try {
        console.log("Deleting a Language");
        const deletedLanguage = await Language.findByIdAndDelete(req.params.id);
        if (!deletedLanguage) {
            return res.status(404).json({ status_code: 404, message: 'Language not found' });
        }
        res.status(200).json({ status_code: 200, message: 'Language deleted successfully' });
    } catch (error) {
        console.error('Error deleting language:', error);
        res.status(500).json({ status_code: 500, message: 'Error deleting language' });
    }
};

module.exports = {
    createLanguage,
    gettingAllLanguage,
    getOneLanguage,
    updateLanguage,
    deleteLanguage
};
