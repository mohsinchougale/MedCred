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
    console.log("a");
    const oldDoctor = await Doctor.findOne({ email });
    console.log("b");
    if (!oldDoctor)
      return res.status(404).json({ message: "Doctor doesn't exist" });
    console.log("c");
    const isPasswordCorrect = await bcrypt.compare(
      password,
      oldDoctor.password
    );
    console.log("d");
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    console.log("e");
    const token = jwt.sign(
      { email: oldDoctor.email, id: oldDoctor._id },
      secret,
      {
        expiresIn: "1h",
      }
    );
    console.log("f");
    // console.log({ result: oldDoctor, token });
    res.status(200).json({ result: oldDoctor, token });
    console.log("g");
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//doctor signup ---------------------------------------------------------------------
router.post("/doctor_signup", async (req, res) => {
  console.log("a");
  const { email, password, confirmPassword, name, contact, specialization } =
    req.body;
  console.log("a");
  try {
    console.log("c");
    const oldDoctor = await Doctor.findOne({ email });
    console.log("d");
    if (oldDoctor)
      return res.status(400).json({ message: "User already exists" });

    console.log("e");
    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords do not match " });

    console.log("f");
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("h");
    const result = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      contact,
      specialization,
    });
    console.log("e");
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    console.log("l");
    console.log({ result, token });
    res.status(200).json({ result, token });
    console.log("m");
  } catch (error) {
    res.status(500).json({ message: error });

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
  console.log("a");
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
  console.log("b");
  try {
    console.log("c");
    const oldPatient = await Patient.findOne({ email });
    console.log("d");
    if (oldPatient)
      return res.status(400).json({ message: "Patient already exists" });
    console.log("e");
    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords do not match " });
    console.log("f");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("g");
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
    console.log("g");
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    console.log("l");
    res.status(200).json({ result, token });
    console.log("m");
  } catch (error) {
    console.log("n");
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

module.exports = router;
