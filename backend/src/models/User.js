const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true, index: true },
    coins: { type: Number, default: 0 },
    referredBy: { type: String, default: null } // store referrer's code if applied
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);