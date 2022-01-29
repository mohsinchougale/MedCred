import React, { useEffect, useState } from "react";
import axios from "axios";
const Patient = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getRequest = async () => {
      await axios.get("http://localhost:5000/patient/4000").then((res) => {
        console.log(res);
        setShow(true);
      });
    };
    getRequest();
  }, []);

  const sendResponse = async (r) => {
    const response = { doctorId: "2000", patientId: "4000", response: r };
    await axios.post("http://localhost:5000/patient", response).then((res) => console.log(res));
  };

  return (
    <div>
      Hello
      {show && <button onClick={() => sendResponse("yes")}> Yes</button>}
      {show && <button onClick={() => sendResponse("no")}>No</button>}
    </div>
  );
};

export default Patient;
