import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Home_Patient.css";
const Home_Patient = () => {
  const { account } = useMetaMask();
  const [show, setShow] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const userId = JSON.parse(localStorage.getItem("patient"))?.["data"][
    "result"
  ]["_id"];

  useEffect(() => {
    const getRequest = async () => {
      await axios.get("http://localhost:5000/patient/4000").then((res) => {
        console.log(res);

        if (res?.data?.length > 0) {
          console.log("a");
          setShow(true);
          setDoctorId(res.data[0].doctorId);
        }
      });
    };
    getRequest();
  }, []);

  const sendResponse = async (r) => {
    const response = {
      doctorId: doctorId,
      patientId: userId,
      response: r,
      receiverKey: account,
    };
    await axios
      .post("http://localhost:5000/patient", response)
      .then((res) => console.log(res));
  };

  return (
    <div>
      {show && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => sendResponse("yes")}
          className="btn"
        >
          {" "}
          Yes
        </Button>
      )}
      {show && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => sendResponse("no")}
          className="btn"
        >
          No
        </Button>
      )}
    </div>
  );
};

export default Home_Patient;
