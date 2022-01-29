const mongoose = require("mongoose");
const request = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("Request", request);
module.exports = Request;
