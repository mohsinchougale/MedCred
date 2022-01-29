const mongoose = require("mongoose");
// name,
// email,
// password,
// confirmPassword,
// contact,
// specialization,
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  id: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
