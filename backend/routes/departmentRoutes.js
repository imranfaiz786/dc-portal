const express = require('express');
const {
  addLivestockData,
  getAllLivestockData,
  getAllTeacherData,
  addHealthFacility,
  getAllHealthFacilities,
  addAgricultureRecord,
  getAllAgricultureRecords,
  addWaterScheme,
  getAllWaterSchemes,
  addPublicWorksProject,
  getAllPublicWorksProjects
} = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/livestock', addLivestockData);
router.get('/livestock', getAllLivestockData);
router.get('/education', authMiddleware, getAllTeacherData);

// Health
router.post('/health', authMiddleware, addHealthFacility);
router.get('/health', authMiddleware, getAllHealthFacilities);

// Agriculture
router.post('/agriculture', authMiddleware, addAgricultureRecord);
router.get('/agriculture', authMiddleware, getAllAgricultureRecords);

// Water & Sanitation
router.post('/water', authMiddleware, addWaterScheme);
router.get('/water', authMiddleware, getAllWaterSchemes);

// Public Works
router.post('/public-works', authMiddleware, addPublicWorksProject);
router.get('/public-works', authMiddleware, getAllPublicWorksProjects);

module.exports = router;
