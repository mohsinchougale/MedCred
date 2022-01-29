const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((error) => console.error(error));

const doctorRouter = require("./routes/doctor");
app.use("/doctor", doctorRouter);

const patientRouter = require("./routes/patient");
app.use("/patient", patientRouter);

app.use("/", userRoutes);
