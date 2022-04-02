const mongoose = require('mongoose');

const CoursesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const StudentsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpa: {
        type: Number,
        required: true
    },
    courses: [CoursesSchema]
});

mongoose.model(process.env.STUDENT_MODEL, StudentsSchema, process.env.STUDENT_COLLECTION);
