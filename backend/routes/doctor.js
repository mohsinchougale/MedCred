const express = require("express");
const router = express.Router();
const Request = require("../models/request");
const Response = require("../models/response");

//Create request Operation(Initiating transaction)
router.post("/", async (req, res) => {
  const request = new Request({
    doctorId: req.body.doctorId,
    patientId: req.body.patientId,
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Query the responses send by the patient
const getResponse = async (req, res, next) => {
  let response;
  try {
    response = await Response.find({ userId: req.params.doctorId });
    if (response == null) {
      return res.status(400).json({ message: "Cannot find Response" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.response = response;
  next();
};

router.get("/:doctorId", getResponse, (req, res) => {
  res.json(res.response);
});

module.exports = router;
