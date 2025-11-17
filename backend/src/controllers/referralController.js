const User = require('../models/User');
const Config = require('../models/Config');

async function applyReferral(req, res, next) {
    try {
        const { userId, code } = req.body;
        if (!userId || !code) return res.status(400).json({ error: 'Missing userId or code' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // can't apply own code
        if (user.referralCode === code) return res.status(400).json({ error: 'Cannot apply own referral code' });

        // check if already applied
        if (user.referredBy) return res.status(400).json({ error: 'Referral code already applied' });

        const referrer = await User.findOne({ referralCode: code });
        if (!referrer) return res.status(404).json({ error: 'Referral code not found' });

        const cfg = await Config.findOne({ key: 'referralReward' });
        const reward = cfg ? cfg.value : 50; // default if not seeded

        // award coins (to both: referrer and referee)
        user.coins += reward;
        user.referredBy = code;
        await user.save();

        referrer.coins += reward;
        await referrer.save();

        res.json({
            message: 'Referral applied',
            yourNewBalance: user.coins,
            referrerNewBalance: referrer.coins,
            reward
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { applyReferral };