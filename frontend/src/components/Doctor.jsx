import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const [patientResponse, setPatientResponse] = useState("no");
  const navigate = useNavigate();

  const sendRequest = async () => {
    const request = { doctorId: "2000", patientId: "4000" };
    await axios.post("http://localhost:5000/doctor", request).then((res) => console.log(res));
  };

  const getResponse = async () => {
    await axios.get("http://localhost:5000/doctor/2000").then((res) => setPatientResponse(res?.data[0]?.response));

    if (patientResponse == "yes") {
      //Blockchain functionality
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      <button onClick={sendRequest}>Request</button>
      <button onClick={getResponse}>Save to Blockchain</button>
    </div>
  );
};

export default Doctor;
