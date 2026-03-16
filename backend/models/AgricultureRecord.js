const mongoose = require('mongoose');

const agricultureRecordSchema = new mongoose.Schema(
  {
    tehsil: { type: String, required: true, trim: true },
    uc: { type: String, required: true, trim: true },
    farmerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    farmAreaAcres: { type: Number, required: true, min: 0 },
    majorCrop: { type: String, required: true, trim: true },
    season: { type: String, required: true, trim: true }, // Rabi/Kharif
    expectedYieldTons: { type: Number, default: 0, min: 0 },
    subsidyProgram: { type: String, trim: true }, // e.g. Seed/Equipment/Fertilizer
    irrigationSource: { type: String, trim: true }, // Canal/Tubewell/Rainfed
    extensionOfficer: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('AgricultureRecord', agricultureRecordSchema);

