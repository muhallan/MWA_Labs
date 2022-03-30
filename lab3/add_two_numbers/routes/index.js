const express = require('express');
const router = express.Router();
const additionController = require('../controllers/addition');

router.route('/add/:firstNumber').get(additionController.addTwoNumbers);

module.exports = router;
