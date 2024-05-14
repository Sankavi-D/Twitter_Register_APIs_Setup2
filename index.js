const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth.route');
const languageRoutes = require('./routes/language.route');
const categoryRoutes = require('./routes/category.route');
const subcategoryRoutes = require('./routes/subcategory.route');
const followRoutes = require('./routes/follow.route');
const profileRoutes = require('./routes/profile.route');
const schedule = require('node-schedule');
const updateAges = require('./services/cronServices');
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'uploads' directory
const imagePath = path.join(__dirname, '/uploads');
app.use(express.static(imagePath));

// Schedule task to update user ages daily at midnight (IST)
const job = schedule.scheduleJob('0 0 * * *', async () => {
    await updateAges();
});

require('dotenv').config();
const PORT = process.env.PORT || 6000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

app.use('/api/auth', authRoutes);
app.use('/api/auth/languages', languageRoutes);
app.use('/api/auth/category', categoryRoutes);
app.use('/api/auth/subcategory', subcategoryRoutes);
app.use('/api/auth/follow', followRoutes);
app.use('/api/auth/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Twitter App');
});

// Error handling middleware for unmatched routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Global error handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal server error' });
});

module.exports = app;