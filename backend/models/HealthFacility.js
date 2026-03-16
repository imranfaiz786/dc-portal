const mongoose = require('mongoose');

const healthFacilitySchema = new mongoose.Schema(
  {
    tehsil: { type: String, required: true, trim: true },
    uc: { type: String, required: true, trim: true },
    facilityName: { type: String, required: true, trim: true },
    facilityType: { type: String, required: true, trim: true }, // BHU/RHC/DHQ/THQ/Dispensary
    inCharge: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    services: [{ type: String, trim: true }],
    beds: { type: Number, default: 0 },
    staffCounts: {
      doctors: { type: Number, default: 0 },
      nurses: { type: Number, default: 0 },
      technicians: { type: Number, default: 0 }
    },
    monthlyPatients: { type: Number, default: 0 },
    latitude: Number,
    longitude: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthFacility', healthFacilitySchema);

