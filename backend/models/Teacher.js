const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    SrNo: Number,
    Tehsil: String,
    Markaz: String,
    EMIS: Number,
    School: String,
    Level: String,
    Teacher: String,
    Designation: String,
    Grade: Number,
    CNIC: String,
    Gender: String
});

module.exports = mongoose.model('Teacher', teacherSchema);
