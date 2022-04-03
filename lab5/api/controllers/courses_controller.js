const mongoose = require('mongoose');
const Student = mongoose.model(process.env.STUDENT_MODEL);

const getAll = (req, res) => {
    console.log("Get all courses controller");
    const studentId = req.params.studentId;
    
    Student.findById(studentId).select("courses").exec((err, student) => {
        console.log("Courses found");
        res.status(200).json(student.courses);
    });
};

const addOne = (req, res) => {
    console.log("Add one course controller");
    const studentId = req.params.studentId;

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Invalid student id");
        return res.status(400).json({message: "Invalid student id provided"});
    }

    Student.findById(studentId).select('courses').exec((err, student) => {
        console.log("Found student");
        if (err) {
            console.log("Error reading a student");
            return res.status(500).json({error: err});
        } else if (!student) {
            console.log("Student not found");
            return res.status(404).json({message: "Student id " + studentId + " not found"});
        }
        _addCourse(req, res, student);
    });
}

const _addCourse = (req, res, student) => {
    let newCourse = {};

    if (req.body && req.body.name && req.body.code) {
        newCourse.name = req.body.name;
        newCourse.code = req.body.code;
        student.courses.push(newCourse);
        const response = {
            status: 200,
            message: {}
        };
        student.save((err, updatedSchool) => {
            if (err) {
                response.status = 500;
                response.message = err;
            } else {
                response.status = 201;
                response.message = updatedSchool.courses;
            }
            res.status(response.status).json(response.message);
        });
    } else {
        res.status(400).json({message: "Incomplete data. A course requires name and code"});
    }
};

const getOne = (req, res) => {
    console.log("Get one course controller");
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Invalid student id");
        return res.status(400).json({message: "Invalid student id provided"});
    }

    if (!mongoose.isValidObjectId(courseId)) {
        console.log("Invalid course id");
        return res.status(400).json({message: "Invalid course id provided"});
    }

    Student.findById(studentId).select("courses").exec((err, student) => {
        console.log("Found student");
        if (err) {
            console.log("Error reading a student");
            return res.status(500).json({error: err});
        } 
        if (!student) {
            console.log("Student not found");
            return res.status(404).json({message: "Student id " + studentId + " not found"});
        }
        const course = student.courses.id(courseId);
        if (!course) {
            console.log("Course not found");
            return res.status(404).json({message: "Course with id " + courseId + " not found"});
        }
        res.status(200).json(course);
    })
};

module.exports = {
    getAll,
    addOne,
    getOne
}
