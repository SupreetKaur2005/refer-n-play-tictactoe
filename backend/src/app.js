const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const referralRoutes = require('./routes/referralRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', gameRoutes);
app.use('/api', authRoutes);
app.use('/api', referralRoutes);

// Basic error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error' });
});

module.exports = app;