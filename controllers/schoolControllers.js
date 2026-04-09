
const { addSchoolSchema } = require("../validations/schoolValidation");
const getDistance = require("../utils/distance");
const db=require('../models')

// Add School
exports.addSchool = async (req, res) => {
  try {
    const { error } = addSchoolSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const school = await  db.School.create(req.body);
    res.status(201).json({ message: "School added successfully", school });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List Schools by Proximity
exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    console.log(req.query);
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude & Longitude required" });
    }

    const schools = await db.School.findAll();
    const schoolsWithDistance = schools.map((s) => {
      const distance = getDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        s.latitude,
        s.longitude
      );
      return { ...s.toJSON(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.json(schoolsWithDistance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};