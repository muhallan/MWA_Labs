const students = require('../students/school.json');

module.exports.getAll = (req, res) => {
    let offset = 0;
    let count = 5;

    if (req.query && req.query.count) {
      count = parseInt(req.query.count);
    }
    if (req.query && req.query.offset) {
      offset = parseInt(req.query.offset);
    }
    const paginatedStudents = students.slice(offset, offset + count);
    res.status(200).json(paginatedStudents);
}

module.exports.getOne = (req, res) => {
    const index = req.params.studentIndex;
    if (index > students.length) {
        res.status(404).json({"error": "Student not found"});
    } else {
        res.status(200).json(students[index - 1]);
    }
}
