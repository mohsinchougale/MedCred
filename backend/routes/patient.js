const express = require("express");
const router = express.Router();
const Request = require("../models/request");
const Response = require("../models/response");
const Patient = require("../models/patient.js");

//Query request operation(To check if any doctor has made a request)
const getRequest = async (req, res, next) => {
  let request;
  try {
    request = await Request.find({ userId: req.params.patientId });
    if (request == null) {
      return res.status(400).json({ message: "Cannot find Request" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.request = request;
  next();
};

//TO get the list of all patients for dropdown menu
router.get("/allPatients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:patientId", getRequest, (req, res) => {
  // db.request.find({ "things.bottle": { $exists: true } });
  res.json(res.request);
});

//Create response operation (Yes or No)
router.post("/", async (req, res) => {
  const response = new Response({
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
    response: req.body.response,
  });

  try {
    const newResponse = await response.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
