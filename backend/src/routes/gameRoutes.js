const express = require('express');
const router = express.Router();
const { awardWin } = require('../controllers/gameController');

router.post('/win', awardWin);

module.exports = router;