import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Home_Doctor.css";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Home_Doctor = () => {
  const [patientResponse, setPatientResponse] = useState("no");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const sendRequest = async () => {
    const request = { doctorId: "2000", patientId: "4000" };
    await axios
      .post("http://localhost:5000/doctor", request)
      .then((res) => console.log(res));
  };

  const getResponse = async () => {
    await axios
      .get("http://localhost:5000/doctor/2000")
      .then((res) => console.log(res?.data[0]?.response));
  };
  return (
    <div className="container">
      <Button
        variant="contained"
        color="primary"
        onClick={sendRequest}
        className="btn"
      >
        Request
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={getResponse}
        className="btn"
      >
        Save to Blockchain
      </Button>

      {/* 
      <Grid>
        <Paper elevation={10} style={paperStyle} className={classes.root}>
          <Grid align="center">
            <h2>Health Details</h2>
          </Grid>
          <TextField
            id="outlined-basic"
            label="age"
            variant="outlined"
            required
            inputRef={ageRef}
          />
          <TextField
            id="outlined-basic"
            label="gender"
            variant="outlined"
            required
            inputRef={genderRef}
          />
          <TextField
            id="outlined-basic"
            label="weight(in kg)"
            variant="outlined"
            required
            inputRef={weightRef}
          />
          <TextField
            id="outlined-basic"
            label="height(in cm)"
            variant="outlined"
            required
            inputRef={heightRef}
          />
          <TextField
            id="outlined-basic"
            label="neck(in cm)"
            variant="outlined"
            required
            inputRef={neckRef}
          />
          <TextField
            id="outlined-basic"
            label="waist(in cm)"
            variant="outlined"
            required
            inputRef={waistRef}
          />
          <TextField
            id="outlined-basic"
            label="hip(in cm)"
            variant="outlined"
            required
            inputRef={hipRef}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={showModal}
          >
            BMI Calculator
          </Button>
        </Paper>
      </Grid> */}
    </div>
  );
};

export default Home_Doctor;
