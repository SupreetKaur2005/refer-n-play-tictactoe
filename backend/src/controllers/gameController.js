const User = require('../models/User');
const Config = require('../models/Config');

async function awardWin(req, res, next) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // find win reward from config
        const cfg = await Config.findOne({ key: "winReward" });
        const winReward = cfg ? cfg.value : 10; // fallback to 10

        user.coins += winReward;
        await user.save();

        res.json({
            message: "Win reward added",
            winReward,
            newBalance: user.coins,
            user
        });

    } catch (err) {
        next(err);
    }
}

module.exports = { awardWin };