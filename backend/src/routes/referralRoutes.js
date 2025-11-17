const express = require('express');
const router = express.Router();
const { applyReferral } = require('../controllers/referralController');

router.post('/apply-referral', applyReferral);

module.exports = router;