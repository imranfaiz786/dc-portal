const Livestock = require('../models/Livestock');
const Teacher = require('../models/Teacher');
const HealthFacility = require('../models/HealthFacility');
const AgricultureRecord = require('../models/AgricultureRecord');
const WaterScheme = require('../models/WaterScheme');
const PublicWorksProject = require('../models/PublicWorksProject');

function parseCommaSeparatedList(value) {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return [];
    return value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
}

const addLivestockData = async (req, res) => {
    try {
        const payload = { ...req.body };
        payload.services = parseCommaSeparatedList(payload.services);
        const livestockData = new Livestock(payload);
        await livestockData.save();
        res.status(201).json({ message: "Livestock data added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding livestock data" });
    }
};

// Get all Livestock data
const getAllLivestockData = async (req, res) => {
    try {
        const livestockData = await Livestock.find();
        res.status(200).json(livestockData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Teacher data (Education Department)
const getAllTeacherData = async (req, res) => {
    try {
        const teacherData = await Teacher.find();
        res.status(200).json(teacherData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Health Department
const addHealthFacility = async (req, res) => {
    try {
        const payload = { ...req.body };
        payload.services = parseCommaSeparatedList(payload.services);
        const doc = new HealthFacility(payload);
        await doc.save();
        res.status(201).json({ message: "Health facility added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding health facility" });
    }
};

const getAllHealthFacilities = async (req, res) => {
    try {
        const docs = await HealthFacility.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Agriculture Department
const addAgricultureRecord = async (req, res) => {
    try {
        const doc = new AgricultureRecord(req.body);
        await doc.save();
        res.status(201).json({ message: "Agriculture record added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding agriculture record" });
    }
};

const getAllAgricultureRecords = async (req, res) => {
    try {
        const docs = await AgricultureRecord.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Water & Sanitation Department
const addWaterScheme = async (req, res) => {
    try {
        const doc = new WaterScheme(req.body);
        await doc.save();
        res.status(201).json({ message: "Water scheme added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding water scheme" });
    }
};

const getAllWaterSchemes = async (req, res) => {
    try {
        const docs = await WaterScheme.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Public Works Department
const addPublicWorksProject = async (req, res) => {
    try {
        const doc = new PublicWorksProject(req.body);
        await doc.save();
        res.status(201).json({ message: "Public works project added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding public works project" });
    }
};

const getAllPublicWorksProjects = async (req, res) => {
    try {
        const docs = await PublicWorksProject.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
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
};
