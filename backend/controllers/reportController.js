const { jsPDF } = require("jspdf");
const Livestock = require('../models/Livestock');
const Teacher = require('../models/Teacher');

// Generate PDF report for Livestock
const generateLivestockReport = async (req, res) => {
    const doc = new jsPDF();
    try {
        const livestockData = await Livestock.find();
        
        doc.text('Livestock Data Report', 20, 20);
        doc.autoTable({ html: '#livestock-table' });
        doc.save('LivestockDataReport.pdf');
        res.status(200).json({ message: 'PDF Report Generated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Generate PDF report for Education
const generateEducationReport = async (req, res) => {
    const doc = new jsPDF();
    try {
        const teacherData = await Teacher.find();
        
        doc.text('Education Data Report', 20, 20);
        doc.autoTable({ html: '#education-table' });
        doc.save('EducationDataReport.pdf');
        res.status(200).json({ message: 'PDF Report Generated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generateLivestockReport, generateEducationReport };
