const express = require("express");

const axios = require("axios");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = "test";

const Doctor = require("../models/doctor.js");
const Patient = require("../models/patient.js");

//doctor signin ---------------------------------------------------------------------
router.post("/doctor_signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldDoctor = await Doctor.findOne({ email });

    if (!oldDoctor)
      return res.status(404).json({ message: "Doctor doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldDoctor.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldDoctor.email, id: oldDoctor._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldDoctor, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//doctor signup ---------------------------------------------------------------------
router.post("/doctor_signup", async (req, res) => {
  const { email, password, confirmPassword, name, contact, specialization } =
    req.body;
  console.log("a");
  try {
    const oldDoctor = await Doctor.findOne({ email });
    console.log("b");
    if (oldDoctor)
      return res.status(400).json({ message: "User already exists" });

    console.log("c");
    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords do not match " });

    console.log("d");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("e");
    const result = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      contact,
      specialization,
    });
    console.log("f");
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    console.log("g");
    res.status(200).json({ result, token });
  } catch (error) {
    console.log("h");
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

// router.patch("/:email", async (req, res) => {
//   try {
//     const updatedUser = await User.updateOne(
//       { email: req.params.email },
//       req.body,
//       { new: true }
//     );
//     res.send(updatedUser);
//   } catch (e) {
//     console.log(e);
//   }
// });

//patient signin ---------------------------------------------------------------------
router.post("/patient_signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldPatient = await Patient.findOne({ email });

    if (!oldPatient)
      return res.status(404).json({ message: "Patient doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldPatient.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldPatient.email, id: oldPatient._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldPatient, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//patient signup ---------------------------------------------------------------------
router.post("/patient_signup", async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    name,
    age,
    height,
    weight,
    gender,
    contact,
    address,
  } = req.body;

  try {
    const oldPatient = await Patient.findOne({ email });

    if (oldPatient)
      return res.status(400).json({ message: "Patient already exists" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords do not match " });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Patient.create({
      email,
      password: hashedPassword,
      name,
      age,
      height,
      weight,
      gender,
      contact,
      address,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

module.exports = router;
