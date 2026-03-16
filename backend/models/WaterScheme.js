const mongoose = require('mongoose');

const waterSchemeSchema = new mongoose.Schema(
  {
    tehsil: { type: String, required: true, trim: true },
    uc: { type: String, required: true, trim: true },
    schemeName: { type: String, required: true, trim: true },
    schemeType: { type: String, required: true, trim: true }, // Water Supply / Sewerage / Solid Waste
    status: { type: String, required: true, trim: true }, // Planned/In-Progress/Functional/Non-Functional
    beneficiaryHouseholds: { type: Number, default: 0, min: 0 },
    waterQuality: {
      ph: { type: Number },
      tds: { type: Number },
      coliform: { type: String, trim: true } // Present/Absent
    },
    lastInspectionDate: { type: Date },
    complaintHelpline: { type: String, trim: true },
    latitude: Number,
    longitude: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model('WaterScheme', waterSchemeSchema);

