/* Seed script for DC Portal
 * Usage: node seed.js
 *
 * - Connects to MongoDB Atlas using process.env.MONGO_URI
 * - Inserts realistic sample data ONLY if collections are empty
 * - Departments covered (mapped to existing models):
 *   - Livestock        → Livestock
 *   - Education        → Teacher
 *   - Health           → HealthFacility
 *   - Agriculture      → AgricultureRecord
 *   - Police           → PublicWorksProject (projectType: 'Police Facility')
 *   - LGCD             → PublicWorksProject (projectType: 'LGCD Scheme')
 */

require('dotenv').config();
const mongoose = require('mongoose');

const Livestock = require('./models/Livestock');
const Teacher = require('./models/Teacher');
const HealthFacility = require('./models/HealthFacility');
const AgricultureRecord = require('./models/AgricultureRecord');
const PublicWorksProject = require('./models/PublicWorksProject');

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function seedIfEmpty(Model, name, docs) {
  const count = await Model.countDocuments();
  if (count > 0) {
    console.log(`[seed] Skipping ${name}: collection already has ${count} documents.`);
    return;
  }
  await Model.insertMany(docs);
  console.log(`[seed] Inserted ${docs.length} ${name} records.`);
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is missing in environment.');
  }

  console.log('[seed] Connecting to MongoDB...');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  });
  console.log('[seed] Connected to MongoDB.');

  // --- Livestock (10 realistic facilities, varying tehsils/ucs) ---
  const livestockDocs = [
    {
      tehsil: 'City',
      ucs: 'UC-01',
      livestockFacilityName: 'Veterinary Dispensary City Center',
      staff: {
        APVO_SVO_VO: 'Dr. Aamir Khan (VO)',
        cellNoAPVO: '0300-1111111',
        DVS_AVS_VA: 'Dr. Sana Ali (DVS)',
        cellNoDVS: '0300-2222222',
        DLS_ALS_AIT: 'Mr. Bilal Ahmed (AIT)',
        cellNoDLS: '0300-3333333',
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
          ruralPoultry: 5200,
        },
      },
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
        cellNoDLS: '0301-6666666',
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
          ruralPoultry: 4100,
        },
      },
    },
    {
      tehsil: 'South',
      ucs: 'UC-05',
      livestockFacilityName: 'Mobile Veterinary Unit South',
      staff: {
        APVO_SVO_VO: 'Dr. Saif Ur Rehman (VO)',
        cellNoAPVO: '0302-7777777',
        DVS_AVS_VA: 'Dr. Maria Javed (AVS)',
        cellNoDVS: '0302-8888888',
        DLS_ALS_AIT: 'Mr. Farhan Riaz (ALS)',
        cellNoDLS: '0302-9999999',
      },
      latitude: 33.5123,
      longitude: 73.1123,
      services: ['Vaccination', 'Awareness Camps'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 410,
          buffalo: 390,
          totalLA: 800,
          sheep: 610,
          goat: 840,
          totalSA: 1450,
          ruralPoultry: 3600,
        },
      },
    },
    {
      tehsil: 'East',
      ucs: 'UC-07',
      livestockFacilityName: 'Livestock Research Farm East',
      staff: {
        APVO_SVO_VO: 'Dr. Junaid Malik (SVO)',
        cellNoAPVO: '0303-1111222',
        DVS_AVS_VA: 'Dr. Zainab Shah (DVS)',
        cellNoDVS: '0303-3333444',
        DLS_ALS_AIT: 'Mr. Kamran Tariq (AIT)',
        cellNoDLS: '0303-5555666',
      },
      latitude: 33.8001,
      longitude: 73.2004,
      services: ['Breed Improvement', 'Disease Surveillance'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 950,
          buffalo: 780,
          totalLA: 1730,
          sheep: 620,
          goat: 980,
          totalSA: 1600,
          ruralPoultry: 6100,
        },
      },
    },
    {
      tehsil: 'West',
      ucs: 'UC-09',
      livestockFacilityName: 'Livestock Emergency Center West',
      staff: {
        APVO_SVO_VO: 'Dr. Asad Mehmood (VO)',
        cellNoAPVO: '0304-1010101',
        DVS_AVS_VA: 'Dr. Uzma Riaz (AVS)',
        cellNoDVS: '0304-2020202',
        DLS_ALS_AIT: 'Mr. Naveed Iqbal (DLS)',
        cellNoDLS: '0304-3030303',
      },
      latitude: 33.6205,
      longitude: 72.9901,
      services: ['Emergency Response', 'Vaccination'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 530,
          buffalo: 480,
          totalLA: 1010,
          sheep: 450,
          goat: 730,
          totalSA: 1180,
          ruralPoultry: 2900,
        },
      },
    },
    {
      tehsil: 'Hill',
      ucs: 'UC-11',
      livestockFacilityName: 'Mountain Livestock Center',
      staff: {
        APVO_SVO_VO: 'Dr. Shahid Aziz (SVO)',
        cellNoAPVO: '0305-1111333',
        DVS_AVS_VA: 'Dr. Kiran Yousaf (DVS)',
        cellNoDVS: '0305-2222444',
        DLS_ALS_AIT: 'Mr. Raza Ali (ALS)',
        cellNoDLS: '0305-3333555',
      },
      latitude: 34.2001,
      longitude: 73.3402,
      services: ['Treatment', 'Vaccination', 'Awareness'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 300,
          buffalo: 260,
          totalLA: 560,
          sheep: 980,
          goat: 1210,
          totalSA: 2190,
          ruralPoultry: 1800,
        },
      },
    },
    {
      tehsil: 'Plain',
      ucs: 'UC-12',
      livestockFacilityName: 'Rural Veterinary Center Plain',
      staff: {
        APVO_SVO_VO: 'Dr. Adeel Rafiq (VO)',
        cellNoAPVO: '0306-1111777',
        DVS_AVS_VA: 'Dr. Rida Noor (AVS)',
        cellNoDVS: '0306-2222888',
        DLS_ALS_AIT: 'Mr. Jawad Khan (AIT)',
        cellNoDLS: '0306-3333999',
      },
      latitude: 33.4103,
      longitude: 73.1205,
      services: ['Vaccination', 'Farmer Training'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 710,
          buffalo: 590,
          totalLA: 1300,
          sheep: 430,
          goat: 820,
          totalSA: 1250,
          ruralPoultry: 3300,
        },
      },
    },
    {
      tehsil: 'River',
      ucs: 'UC-13',
      livestockFacilityName: 'River Belt Livestock Center',
      staff: {
        APVO_SVO_VO: 'Dr. Ali Jan (VO)',
        cellNoAPVO: '0307-1111555',
        DVS_AVS_VA: 'Dr. Mahnoor Iqbal (DVS)',
        cellNoDVS: '0307-2222666',
        DLS_ALS_AIT: 'Mr. Zubair Ahmed (DLS)',
        cellNoDLS: '0307-3333777',
      },
      latitude: 33.3802,
      longitude: 72.9101,
      services: ['Deworming', 'Vaccination'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 460,
          buffalo: 430,
          totalLA: 890,
          sheep: 520,
          goat: 760,
          totalSA: 1280,
          ruralPoultry: 2500,
        },
      },
    },
    {
      tehsil: 'Canal',
      ucs: 'UC-14',
      livestockFacilityName: 'Canal Side Veterinary Center',
      staff: {
        APVO_SVO_VO: 'Dr. Imtiaz Raza (VO)',
        cellNoAPVO: '0308-1111222',
        DVS_AVS_VA: 'Dr. Mehwish Tariq (AVS)',
        cellNoDVS: '0308-3333444',
        DLS_ALS_AIT: 'Mr. Haris Javed (ALS)',
        cellNoDLS: '0308-5555666',
      },
      latitude: 33.6504,
      longitude: 73.3302,
      services: ['Treatment', 'Vaccination'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 540,
          buffalo: 510,
          totalLA: 1050,
          sheep: 610,
          goat: 910,
          totalSA: 1520,
          ruralPoultry: 3000,
        },
      },
    },
    {
      tehsil: 'Industrial',
      ucs: 'UC-15',
      livestockFacilityName: 'Urban Livestock Support Unit',
      staff: {
        APVO_SVO_VO: 'Dr. Waqas Anwar (SVO)',
        cellNoAPVO: '0309-1111999',
        DVS_AVS_VA: 'Dr. Hareem Shafi (DVS)',
        cellNoDVS: '0309-2222999',
        DLS_ALS_AIT: 'Mr. Taha Siddiq (AIT)',
        cellNoDLS: '0309-3333999',
      },
      latitude: 33.7204,
      longitude: 73.0804,
      services: ['Urban Dairy Support', 'Vaccination'],
      totalNumberOfRegisteredAnimals: {
        tehsilWiseAreaWise: {
          cattle: 390,
          buffalo: 350,
          totalLA: 740,
          sheep: 210,
          goat: 510,
          totalSA: 720,
          ruralPoultry: 1900,
        },
      },
    },
  ];

  // --- Education (Teacher, 10 records with varied EMIS/tehsil) ---
  const teacherDocs = Array.from({ length: 10 }).map((_, idx) => {
    const i = idx + 1;
    return {
      SrNo: i,
      Tehsil: ['City', 'North', 'South', 'East', 'West'][i % 5],
      Markaz: `Markaz-${String.fromCharCode(64 + i)}`,
      EMIS: 100000 + i,
      School: i % 2 === 0 ? `Govt High School ${i}` : `Govt Primary School ${i}`,
      Level: i % 2 === 0 ? 'High' : 'Primary',
      Teacher: i % 2 === 0 ? `Mr. Teacher ${i}` : `Ms. Teacher ${i}`,
      Designation: i % 2 === 0 ? 'SST' : 'PST',
      Grade: i % 2 === 0 ? 16 : 14,
      CNIC: `35202-${1000000 + i}-${i % 9} `,
      Gender: i % 2 === 0 ? 'Male' : 'Female',
    };
  });

  // --- Health (10 HealthFacility, timestamps give createdAt) ---
  const healthDocs = [
    {
      tehsil: 'City',
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
      longitude: 73.0402,
      createdAt: daysAgo(10),
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
      longitude: 73.0169,
      createdAt: daysAgo(20),
    },
    {
      tehsil: 'North',
      uc: 'UC-03',
      facilityName: 'THQ Hospital North',
      facilityType: 'THQ',
      inCharge: 'Dr. Imran Akhtar',
      phone: '051-9988776',
      services: ['OPD', 'Emergency', 'Surgery'],
      beds: 80,
      staffCounts: { doctors: 12, nurses: 30, technicians: 10 },
      monthlyPatients: 9500,
      latitude: 34.0201,
      longitude: 71.5205,
      createdAt: daysAgo(30),
    },
    {
      tehsil: 'East',
      uc: 'UC-07',
      facilityName: 'RHC Hill View',
      facilityType: 'RHC',
      inCharge: 'Dr. Rida Malik',
      phone: '051-3344556',
      services: ['OPD', 'Lab'],
      beds: 18,
      staffCounts: { doctors: 3, nurses: 8, technicians: 3 },
      monthlyPatients: 2700,
      latitude: 33.8203,
      longitude: 73.2102,
      createdAt: daysAgo(45),
    },
    {
      tehsil: 'West',
      uc: 'UC-09',
      facilityName: 'BHU West End',
      facilityType: 'BHU',
      inCharge: 'Dr. Nadeem Khan',
      phone: '051-4455667',
      services: ['OPD', 'Immunization'],
      beds: 8,
      staffCounts: { doctors: 2, nurses: 3, technicians: 1 },
      monthlyPatients: 1900,
      latitude: 33.6004,
      longitude: 72.9801,
      createdAt: daysAgo(60),
    },
    {
      tehsil: 'Industrial',
      uc: 'UC-11',
      facilityName: 'Urban Dispensary Industrial Area',
      facilityType: 'Dispensary',
      inCharge: 'Dr. Maham Shah',
      phone: '051-5566778',
      services: ['OPD'],
      beds: 4,
      staffCounts: { doctors: 1, nurses: 2, technicians: 1 },
      monthlyPatients: 1300,
      latitude: 33.7104,
      longitude: 73.0703,
      createdAt: daysAgo(75),
    },
    {
      tehsil: 'River',
      uc: 'UC-13',
      facilityName: 'Rural Health Center River Belt',
      facilityType: 'RHC',
      inCharge: 'Dr. Zafar Lodhi',
      phone: '051-6677889',
      services: ['OPD', 'Emergency'],
      beds: 16,
      staffCounts: { doctors: 3, nurses: 7, technicians: 2 },
      monthlyPatients: 2500,
      latitude: 33.3902,
      longitude: 72.9202,
      createdAt: daysAgo(90),
    },
    {
      tehsil: 'Plain',
      uc: 'UC-12',
      facilityName: 'BHU Plain Fields',
      facilityType: 'BHU',
      inCharge: 'Dr. Adnan Qureshi',
      phone: '051-7788990',
      services: ['OPD', 'Maternal Health'],
      beds: 12,
      staffCounts: { doctors: 2, nurses: 5, technicians: 2 },
      monthlyPatients: 2300,
      latitude: 33.4203,
      longitude: 73.1305,
      createdAt: daysAgo(105),
    },
    {
      tehsil: 'Canal',
      uc: 'UC-14',
      facilityName: 'Canal Side Dispensary',
      facilityType: 'Dispensary',
      inCharge: 'Dr. Shaista Riaz',
      phone: '051-8899001',
      services: ['OPD'],
      beds: 3,
      staffCounts: { doctors: 1, nurses: 1, technicians: 1 },
      monthlyPatients: 900,
      latitude: 33.6604,
      longitude: 73.3403,
      createdAt: daysAgo(120),
    },
    {
      tehsil: 'Hill',
      uc: 'UC-10',
      facilityName: 'BHU Hill Top',
      facilityType: 'BHU',
      inCharge: 'Dr. Naila Rahim',
      phone: '051-9900112',
      services: ['OPD', 'Immunization'],
      beds: 6,
      staffCounts: { doctors: 2, nurses: 3, technicians: 1 },
      monthlyPatients: 1500,
      latitude: 34.2102,
      longitude: 73.3501,
      createdAt: daysAgo(135),
    },
  ];

  // --- Agriculture (10 records, varied seasons/crops, with timestamps) ---
  const agricultureDocs = [
    {
      tehsil: 'City',
      uc: 'UC-01',
      farmerName: 'Imran Shah',
      phone: '0302-1111111',
      farmAreaAcres: 8,
      majorCrop: 'Wheat',
      season: 'Rabi',
      expectedYieldTons: 18,
      subsidyProgram: 'Seed',
      irrigationSource: 'Canal',
      extensionOfficer: 'AO Nadia',
      createdAt: daysAgo(15),
    },
    {
      tehsil: 'North',
      uc: 'UC-03',
      farmerName: 'Rabia Malik',
      phone: '0302-2222222',
      farmAreaAcres: 5.5,
      majorCrop: 'Maize',
      season: 'Kharif',
      expectedYieldTons: 9,
      subsidyProgram: 'Fertilizer',
      irrigationSource: 'Tubewell',
      extensionOfficer: 'AO Salman',
      createdAt: daysAgo(25),
    },
    {
      tehsil: 'South',
      uc: 'UC-05',
      farmerName: 'Khalid Hussain',
      phone: '0303-3333333',
      farmAreaAcres: 12,
      majorCrop: 'Rice',
      season: 'Kharif',
      expectedYieldTons: 24,
      subsidyProgram: 'Equipment',
      irrigationSource: 'Canal',
      extensionOfficer: 'AO Ayesha',
      createdAt: daysAgo(35),
    },
    {
      tehsil: 'East',
      uc: 'UC-07',
      farmerName: 'Sadia Yousaf',
      phone: '0304-4444444',
      farmAreaAcres: 4,
      majorCrop: 'Vegetables',
      season: 'Rabi',
      expectedYieldTons: 6,
      subsidyProgram: 'Seed',
      irrigationSource: 'Tubewell',
      extensionOfficer: 'AO Bilal',
      createdAt: daysAgo(45),
    },
    {
      tehsil: 'West',
      uc: 'UC-09',
      farmerName: 'Naeem Akbar',
      phone: '0305-5555555',
      farmAreaAcres: 15,
      majorCrop: 'Sugarcane',
      season: 'Annual',
      expectedYieldTons: 40,
      subsidyProgram: 'Fertilizer',
      irrigationSource: 'Canal',
      extensionOfficer: 'AO Hira',
      createdAt: daysAgo(60),
    },
    {
      tehsil: 'Plain',
      uc: 'UC-12',
      farmerName: 'Faisal Javed',
      phone: '0306-6666666',
      farmAreaAcres: 9,
      majorCrop: 'Cotton',
      season: 'Kharif',
      expectedYieldTons: 16,
      subsidyProgram: 'Seed',
      irrigationSource: 'Rainfed',
      extensionOfficer: 'AO Saad',
      createdAt: daysAgo(75),
    },
    {
      tehsil: 'River',
      uc: 'UC-13',
      farmerName: 'Umar Rafiq',
      phone: '0307-7777777',
      farmAreaAcres: 6.5,
      majorCrop: 'Wheat',
      season: 'Rabi',
      expectedYieldTons: 13,
      subsidyProgram: 'Equipment',
      irrigationSource: 'Canal',
      extensionOfficer: 'AO Rabia',
      createdAt: daysAgo(90),
    },
    {
      tehsil: 'Hill',
      uc: 'UC-10',
      farmerName: 'Aqsa Noreen',
      phone: '0308-8888888',
      farmAreaAcres: 3.2,
      majorCrop: 'Potato',
      season: 'Rabi',
      expectedYieldTons: 7,
      subsidyProgram: 'Seed',
      irrigationSource: 'Rainfed',
      extensionOfficer: 'AO Kamran',
      createdAt: daysAgo(105),
    },
    {
      tehsil: 'Industrial',
      uc: 'UC-11',
      farmerName: 'Zeeshan Ali',
      phone: '0309-9999999',
      farmAreaAcres: 2.5,
      majorCrop: 'Vegetables',
      season: 'Kharif',
      expectedYieldTons: 5,
      subsidyProgram: 'Fertilizer',
      irrigationSource: 'Tubewell',
      extensionOfficer: 'AO Sana',
      createdAt: daysAgo(120),
    },
    {
      tehsil: 'Canal',
      uc: 'UC-14',
      farmerName: 'Hira Aslam',
      phone: '0310-1010101',
      farmAreaAcres: 11,
      majorCrop: 'Rice',
      season: 'Kharif',
      expectedYieldTons: 22,
      subsidyProgram: 'Equipment',
      irrigationSource: 'Canal',
      extensionOfficer: 'AO Adeel',
      createdAt: daysAgo(135),
    },
  ];

  // --- Police (10 projects, mapped into PublicWorksProject) ---
  const policeDocs = Array.from({ length: 10 }).map((_, idx) => {
    const i = idx + 1;
    return {
      tehsil: ['City', 'North', 'South', 'East', 'West'][i % 5],
      uc: `UC-P${i}`,
      projectName: `Construction / Renovation of Police Station ${i}`,
      projectType: 'Police Facility',
      status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In-Progress' : 'Planned',
      estimatedCostPKR: 20000000 + i * 1500000,
      spentCostPKR: i % 3 === 0 ? 20000000 + i * 1500000 : (20000000 + i * 1500000) * 0.4,
      startDate: daysAgo(200 - i * 5),
      expectedCompletionDate: daysAgo(50 - i * 3),
      contractor: i % 2 === 0 ? 'Secure Builders' : 'SafeGuard Constructions',
      progressPercent: i % 3 === 0 ? 100 : i % 3 === 1 ? 45 : 10,
      createdAt: daysAgo(200 - i * 5),
    };
  });

  // --- LGCD (10 projects, also in PublicWorksProject) ---
  const lgcdDocs = Array.from({ length: 10 }).map((_, idx) => {
    const i = idx + 1;
    return {
      tehsil: ['City', 'North', 'South', 'East', 'West'][i % 5],
      uc: `UC-L${i}`,
      projectName: `LGCD Street Pavement & Drainage Scheme ${i}`,
      projectType: 'LGCD Scheme',
      status: i % 2 === 0 ? 'Completed' : 'In-Progress',
      estimatedCostPKR: 8000000 + i * 500000,
      spentCostPKR: i % 2 === 0 ? 8000000 + i * 500000 : (8000000 + i * 500000) * 0.6,
      startDate: daysAgo(160 - i * 4),
      expectedCompletionDate: daysAgo(20 - i * 2),
      contractor: i % 2 === 0 ? 'Community Works Ltd' : 'People First Contractors',
      progressPercent: i % 2 === 0 ? 100 : 55,
      createdAt: daysAgo(160 - i * 4),
    };
  });

  // Seed each domain only if empty.
  await seedIfEmpty(Livestock, 'Livestock', livestockDocs);
  await seedIfEmpty(Teacher, 'Teacher (Education)', teacherDocs);
  await seedIfEmpty(HealthFacility, 'HealthFacility (Health)', healthDocs);
  await seedIfEmpty(AgricultureRecord, 'AgricultureRecord (Agriculture)', agricultureDocs);

  // For Police + LGCD we use PublicWorksProject with different projectType tags.
  const pwCount = await PublicWorksProject.countDocuments();
  if (pwCount === 0) {
    await PublicWorksProject.insertMany([...policeDocs, ...lgcdDocs]);
    console.log('[seed] Inserted Police and LGCD records into PublicWorksProject.');
  } else {
    console.log(`[seed] Skipping Police/LGCD seeding: PublicWorksProject already has ${pwCount} documents.`);
  }

  await mongoose.disconnect();
  console.log('[seed] Completed successfully.');
}

main().catch((err) => {
  console.error('[seed] Error:', err.message || err);
  process.exit(1);
});

