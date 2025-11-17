const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateReferralCode = require('../utils/generateCode');

const SALT_ROUNDS = 10;

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ error: 'Email already exists' });

        const match = await bcrypt.compare(password, user.password);


        // ensure unique code
        let code;
        let isUnique = false;
        for (let i = 0; i < 5 && !isUnique; i++) {
            code = generateReferralCode();
            const found = await User.findOne({ referralCode: code });
            if (!found) isUnique = true;
        }
        if (!code) code = generateReferralCode(); // fallback

        const user = new User({
            name,
            email,
            password: hashed,
            referralCode: code,
            coins: 0
        });
        await user.save();

        // hide password
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({ user: userObj });
    } catch (err) {
        next(err);
    }
}

module.exports = { register };