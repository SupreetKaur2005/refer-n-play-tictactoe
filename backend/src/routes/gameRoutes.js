const express = require('express');
const router = express.Router();
const { awardWin } = require('../controllers/gameController');
const User = require('../models/User');

// Award win coins
router.post('/win', awardWin);

// 📌 NEW — Leaderboard Route
router.get('/leaderboard', async(req, res) => {
    try {
        const leaders = await User.find({})
            .sort({ coins: -1 })
            .limit(10)
            .select("name coins referralCode");

        res.json(leaders);
    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;