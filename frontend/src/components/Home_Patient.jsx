import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMetaMask } from "metamask-react";
const Home_Patient = () => {
  const { account } = useMetaMask();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getRequest = async () => {
      await axios.get("http://localhost:5000/patient/4000").then((res) => {
        console.log(res);

        if (res?.data?.length > 0) {
          setShow(true);
        }
      });
    };
    getRequest();
  }, []);

  const sendResponse = async (r) => {
    const response = {
      doctorId: "2000",
      patientId: "4000",
      response: r,
      receiverKey: account,
    };
    await axios
      .post("http://localhost:5000/patient", response)
      .then((res) => console.log(res));
  };

  return (
    <div>
      Hello
      {show && <button onClick={() => sendResponse("yes")}> Yes</button>}
      {show && <button onClick={() => sendResponse("no")}>No</button>}
    </div>
  );
};

export default Home_Patient;
