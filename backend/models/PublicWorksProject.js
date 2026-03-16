const mongoose = require('mongoose');

const publicWorksProjectSchema = new mongoose.Schema(
  {
    tehsil: { type: String, required: true, trim: true },
    uc: { type: String, required: true, trim: true },
    projectName: { type: String, required: true, trim: true },
    projectType: { type: String, required: true, trim: true }, // Road/Bridge/Building/Drainage
    status: { type: String, required: true, trim: true }, // Planned/In-Progress/Completed/Halted
    estimatedCostPKR: { type: Number, required: true, min: 0 },
    spentCostPKR: { type: Number, default: 0, min: 0 },
    startDate: { type: Date },
    expectedCompletionDate: { type: Date },
    contractor: { type: String, trim: true },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PublicWorksProject', publicWorksProjectSchema);

