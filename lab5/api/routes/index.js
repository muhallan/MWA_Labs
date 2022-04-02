const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/students_controller');
const coursesController = require('../controllers/courses_controller');

router.route('/students')
    .get(studentsController.getAll)
    .post(studentsController.addOne);
router.route('/students/:studentId').get(studentsController.getOne);
router.route('/students/:studentId/courses')
    .get(coursesController.getAll)
    .post(coursesController.addOne);
router.route('/students/:studentId/courses/:courseId')
    .get(coursesController.getOne);

module.exports = router;
