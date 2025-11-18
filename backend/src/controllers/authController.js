const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateReferralCode = require("../utils/generateCode");

const SALT_ROUNDS = 10;

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        // Check duplicate email
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: "Email already exists" });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);

        // Generate unique referral code
        let code;
        let isUnique = false;

        for (let i = 0; i < 5 && !isUnique; i++) {
            code = generateReferralCode();
            const existingCode = await User.findOne({ referralCode: code });
            if (!existingCode) isUnique = true;
        }

        // Final fallback
        if (!isUnique) code = generateReferralCode();

        // Create user
        const user = new User({
            name,
            email,
            password: hashed,
            referralCode: code,
            coins: 0,
            usedReferral: null
        });

        await user.save();

        // hide password
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({ user: userObj });

    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = { register };