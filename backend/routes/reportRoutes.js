const express = require('express');
const { generateLivestockReport, generateEducationReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/livestock/report', authMiddleware, generateLivestockReport);
router.get('/education/report', authMiddleware, generateEducationReport);

module.exports = router;
