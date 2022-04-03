const mongoose = require('mongoose');
const Student = mongoose.model(process.env.STUDENT_MODEL);

module.exports.getAll = (req, res) => {
    let offset = 0;
    let count = 5;

    if (req.query && req.query.count) {
      count = parseInt(req.query.count);
    }
    if (req.query && req.query.offset) {
      offset = parseInt(req.query.offset);
    }

    Student.find().skip(offset).limit(count).exec((err, students) => {
        res.status(200).json(students);
    });
}

module.exports.getOne = (req, res) => {
    const studentId = req.params.studentId;

    Student.findById(studentId).exec((err, student) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(student);
        }
    });
}

module.exports.addOne = (req, res) => {
    console.log("Add one student controller called");

    const response = {
        status: 200,
        message: {}
    };

    if (req.body && req.body.name && req.body.gpa) {
        const gpa = parseInt(req.body.gpa);
        if (isNaN(gpa)) {
            response.status = 400;
            response.message = {message: "GPA should be a number"};
        } else {
            const newStudent = {
                name: req.body.name,
                gpa: gpa,
                courses: []
            };
            Student.create(newStudent, (err, student) => {
                if (err) {
                    console.log("Error creating a student");
                    response.status = 500;
                    response.message = {message: {error: err}};
                } else {
                    response.status = 201;
                    response.message = student;
                }
                res.status(response.status).json(response.message);
            });
        }
    } else {
        response.status = 400;
        response.message = {message: "A student requires name and gpa"};
    }
    if (response.status !== 200) {
        return res.status(response.status).json(response.message);
    }
}

