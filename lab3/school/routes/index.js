const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students_controller');

router.route('/students').get(studentsController.getAll);
router.route('/students/:studentIndex').get(studentsController.getOne);

module.exports = router;
