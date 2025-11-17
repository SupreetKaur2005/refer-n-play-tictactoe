const { customAlphabet } = require('nanoid');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const nanoid = customAlphabet(alphabet, 8); // 8-char code

function generateReferralCode() {
    return nanoid();
}

module.exports = generateReferralCode;