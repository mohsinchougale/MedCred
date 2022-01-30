import React, { useState, useEffect, useRef } from "react";
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
import Select from "react-select";
import { ethers } from "ethers";
import reportABI from "../ABIs/reportABI.json";
import { useMetaMask } from "metamask-react";

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
  const navigate = useNavigate();

  const classes = useStyles();
  const diagnosisRef = useRef("");
  const medicineRef = useRef("");
  const receiverIdRef = useRef("");
  const paperStyle = {
    padding: 20,
    height: "88vh",
    width: 300,
    margin: "15px auto",
  };
  const userId = JSON.parse(localStorage.getItem("doctor"))?.["data"]["result"][
    "_id"
  ];
  const [patientResponse, setPatientResponse] = useState("no");
  const [patients, setPatients] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [receiverKey, setReceiverKey] = useState("");
  const { status, connect, account } = useMetaMask();

  useEffect(() => {
    fetch("http://localhost:5000/patient/allPatients")
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res);
        setPatients(res);
      });
  }, []);

  const sendRequest = async () => {
    const request = { doctorId: userId, patientId: selectValue };
    await axios
      .post("http://localhost:5000/doctor", request)
      .then((res) => console.log(res));
  };

  const handleChange = (e) => {
    setSelectValue({ selectValue: e.target.value });
  };

  const getResponse = async () => {
    await axios.get("http://localhost:5000/doctor/2000").then((res) => {
      console.log(res?.data[0]?.response);
      setPatientResponse(res?.data[0]?.response);
      setReceiverKey(res?.data[0]?.receiverKey);
    });
  };

  const saveToBlockChain = async (d, m) => {
    console.log(selectValue);
    console.log(userId);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    console.log("P", provider);
    // console.log(dr);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const report = new ethers.Contract(
      "0x4db7ff0b5656d641EddB7Ff039A6c55784f1B8C3",
      reportABI,
      signer,
      provider
    );

    await report.addPatient(
      `Diagnosis:Fever\n Medicine:Crocin`,
      `Patient:${receiverKey}`
    );
  };
  return (
    <div className="container">
      {/* <Button
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
        Get Response
      </Button> */}
      {/* <Button
        variant="contained"
        color="secondary"
        onClick={saveToBlockChain}
        className="btn"
      >
        Save to Blockchain
      </Button> */}

      {/* <select
        value={selectValue}
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
      >
        {patients.map((patient) => (
          <option value={patient._id}>{patient.name}</option>
        ))}
      </select> */}
      {/* <button onClick={() => console.log(selectValue)}>
        Check Select Function
      </button> */}
      {/* { value: 'chocolate', label: 'Chocolate' }, */}
      {/* <Select
        value={selectValue}
        placeholder="Select a patient"
        onChange={(event) => {
          handleChange(event);
        }}
        options={patients.map((patient) => {
          return { value: patient._id, label: patient.name };
        })}
      /> */}
      {/* {patientResponse === "yes" && ( */}
      <Grid>
        <Paper elevation={10} style={paperStyle} className={classes.root}>
          <Grid align="center">
            <h2>Health Details</h2>
          </Grid>
          <TextField
            id="outlined-basic"
            label="diagnosis"
            variant="outlined"
            required
            inputRef={diagnosisRef}
          />
          <TextField
            id="outlined-basic"
            label="medicine"
            variant="outlined"
            required
            inputRef={medicineRef}
          />

          <TextField
            id="outlined-basic"
            label="reciever Id"
            variant="outlined"
            required
            inputRef={receiverIdRef}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              saveToBlockChain(medicineRef, diagnosisRef);
            }}
            className="btn"
          >
            Save to Blockchain
          </Button>
        </Paper>
      </Grid>
      {/* )} */}
    </div>
  );
};

export default Home_Doctor;
