const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
    tehsil: String,
    ucs: String,
    livestockFacilityName: String,
    staff: {
        APVO_SVO_VO: String,
        cellNoAPVO: String,
        DVS_AVS_VA: String,
        cellNoDVS: String,
        DLS_ALS_AIT: String,
        cellNoDLS: String,
    },
    latitude: Number,
    longitude: Number,
    services: [String],
    totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
            cattle: Number,
            buffalo: Number,
            totalLA: Number,
            sheep: Number,
            goat: Number,
            totalSA: Number,
            ruralPoultry: Number
        }
    }
});

module.exports = mongoose.model('Livestock', livestockSchema);
