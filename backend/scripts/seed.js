const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Livestock = require('../models/Livestock');
const Teacher = require('../models/Teacher');
const HealthFacility = require('../models/HealthFacility');
const AgricultureRecord = require('../models/AgricultureRecord');
const WaterScheme = require('../models/WaterScheme');
const PublicWorksProject = require('../models/PublicWorksProject');

dotenv.config();

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing in environment.');
  }

  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    Livestock.deleteMany({}),
    Teacher.deleteMany({}),
    HealthFacility.deleteMany({}),
    AgricultureRecord.deleteMany({}),
    WaterScheme.deleteMany({}),
    PublicWorksProject.deleteMany({})
  ]);

  await Livestock.insertMany([
    {
      tehsil: 'Central',
      ucs: 'UC-01',
      livestockFacilityName: 'Veterinary Dispensary Central',
      staff: {
        APVO_SVO_VO: 'Dr. Amir Khan (VO)',
        cellNoAPVO: '0300-1111111',
        DVS_AVS_VA: 'Dr. Sana Ali (DVS)',
        cellNoDVS: '0300-2222222',
        DLS_ALS_AIT: 'Mr. Bilal Ahmed (AIT)',
        cellNoDLS: '0300-3333333'
      },
      latitude: 33.6844,
      longitude: 73.0479,
      services: ['Vaccination', 'Deworming', 'Treatment', 'AI'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 820,
          buffalo: 640,
          totalLA: 1460,
          sheep: 510,
          goat: 930,
          totalSA: 1440,
          ruralPoultry: 5200
        }
      }
    },
    {
      tehsil: 'North',
      ucs: 'UC-03',
      livestockFacilityName: 'Livestock Service Center North',
      staff: {
        APVO_SVO_VO: 'Dr. Hammad Iqbal (SVO)',
        cellNoAPVO: '0301-4444444',
        DVS_AVS_VA: 'Dr. Iqra Noor (AVS)',
        cellNoDVS: '0301-5555555',
        DLS_ALS_AIT: 'Mr. Hamza Raza (ALS)',
        cellNoDLS: '0301-6666666'
      },
      latitude: 34.0151,
      longitude: 71.5249,
      services: ['Treatment', 'Extension', 'Disease Surveillance'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 620,
          buffalo: 420,
          totalLA: 1040,
          sheep: 760,
          goat: 1100,
          totalSA: 1860,
          ruralPoultry: 4100
        }
      }
    }
  ]);

  await Teacher.insertMany([
    {
      SrNo: 1,
      Tehsil: 'Central',
      Markaz: 'Markaz-A',
      EMIS: 123456,
      School: 'Govt High School Central',
      Level: 'High',
      Teacher: 'Ms. Ayesha Khan',
      Designation: 'SST',
      Grade: 16,
      CNIC: '35202-1234567-1',
      Gender: 'Female'
    },
    {
      SrNo: 2,
      Tehsil: 'North',
      Markaz: 'Markaz-B',
      EMIS: 234567,
      School: 'Govt Primary School North',
      Level: 'Primary',
      Teacher: 'Mr. Usman Ali',
      Designation: 'PST',
      Grade: 14,
      CNIC: '35202-2345678-2',
      Gender: 'Male'
    }
  ]);

  await HealthFacility.insertMany([
    {
      tehsil: 'Central',
      uc: 'UC-02',
      facilityName: 'BHU City Center',
      facilityType: 'BHU',
      inCharge: 'Dr. Sana Ali',
      phone: '051-1234567',
      services: ['OPD', 'Maternal Health', 'Immunization'],
      beds: 10,
      staffCounts: { doctors: 2, nurses: 4, technicians: 2 },
      monthlyPatients: 3200,
      latitude: 33.7005,
      longitude: 73.0402
    },
    {
      tehsil: 'South',
      uc: 'UC-05',
      facilityName: 'RHC Riverside',
      facilityType: 'RHC',
      inCharge: 'Dr. Faisal Rehman',
      phone: '051-7654321',
      services: ['OPD', 'Emergency', 'Lab'],
      beds: 20,
      staffCounts: { doctors: 3, nurses: 6, technicians: 3 },
      monthlyPatients: 4100,
      latitude: 33.5603,
      longitude: 73.0169
    }
  ]);

  await AgricultureRecord.insertMany([
    {
      tehsil: 'Central',
      uc: 'UC-01',
      farmerName: 'Mr. Imran Shah',
      phone: '0302-1111111',
      farmAreaAcres: 8,
      majorCrop: 'Wheat',
      season: 'Rabi',
      expectedYieldTons: 18,
      subsidyProgram: 'Seed',
      irrigationSource: 'Canal',
      extensionOfficer: 'AO Nadia'
    },
    {
      tehsil: 'North',
      uc: 'UC-03',
      farmerName: 'Ms. Rabia Malik',
      phone: '0302-2222222',
      farmAreaAcres: 5.5,
      majorCrop: 'Maize',
      season: 'Kharif',
      expectedYieldTons: 9,
      subsidyProgram: 'Fertilizer',
      irrigationSource: 'Tubewell',
      extensionOfficer: 'AO Salman'
    }
  ]);

  await WaterScheme.insertMany([
    {
      tehsil: 'Central',
      uc: 'UC-04',
      schemeName: 'Water Supply Scheme Central-04',
      schemeType: 'Water Supply',
      status: 'Functional',
      beneficiaryHouseholds: 1200,
      waterQuality: { ph: 7.3, tds: 420, coliform: 'Absent' },
      lastInspectionDate: new Date('2026-01-18'),
      complaintHelpline: '0800-111-222',
      latitude: 33.6938,
      longitude: 73.0651
    },
    {
      tehsil: 'South',
      uc: 'UC-06',
      schemeName: 'Solid Waste Collection South-06',
      schemeType: 'Solid Waste',
      status: 'In-Progress',
      beneficiaryHouseholds: 800,
      waterQuality: { ph: 7.0, tds: 500, coliform: 'Absent' },
      lastInspectionDate: new Date('2026-02-05'),
      complaintHelpline: '0800-111-222'
    }
  ]);

  await PublicWorksProject.insertMany([
    {
      tehsil: 'Central',
      uc: 'UC-02',
      projectName: 'Rehabilitation of Main Bazaar Road',
      projectType: 'Road',
      status: 'In-Progress',
      estimatedCostPKR: 65000000,
      spentCostPKR: 21000000,
      startDate: new Date('2025-12-10'),
      expectedCompletionDate: new Date('2026-06-30'),
      contractor: 'ABC Contractors',
      progressPercent: 35
    },
    {
      tehsil: 'North',
      uc: 'UC-03',
      projectName: 'Construction of Drainage Line Phase-I',
      projectType: 'Drainage',
      status: 'Planned',
      estimatedCostPKR: 24000000,
      spentCostPKR: 0,
      expectedCompletionDate: new Date('2026-09-15'),
      contractor: 'N/A',
      progressPercent: 0
    }
  ]);

  console.log('Seed completed successfully.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

