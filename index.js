const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.route');
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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