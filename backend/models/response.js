const mongoose = require("mongoose");
const response = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },

  response: {
    type: String,
    required: true,
  },
});

const Response = mongoose.model("Response", response);
module.exports = Response;
