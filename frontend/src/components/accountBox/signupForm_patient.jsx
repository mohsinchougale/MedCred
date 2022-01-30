import React, { useContext, useRef, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { useNavigate } from "react-router";
import { ethers } from "ethers";
import patientABI from "../../ABIs/patientABI.json";
import { useMetaMask } from "metamask-react";
import "./signupForm_patient.css";
// string name;
// uint256 age;
// uint256 height;
// uint256 weight;
// string gender;
// string phoneNumber;
// string homeAddress;
// address walletAddress;
// string publicKey;
export function SignupForm_Patient(props) {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const ageRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const genderRef = useRef();
  const contactRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password1Ref = useRef();

  const [pt, setPt] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    contact: "",
    address: "",
    email: "",
    public_key: "",
  });

  const { status, connect, account } = useMetaMask();

  useEffect(() => {
    console.log(account);
    if (account) setPt({ public_key: account });
  }, [account]);
  const saveDetails = async (event) => {
    const name = usernameRef.current.value;
    const age = ageRef.current.value;
    const height = heightRef.current.value;
    const weight = weightRef.current.value;
    const gender = genderRef.current.value;
    const contact = contactRef.current.value;
    const address = addressRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = password1Ref.current.value;

    setPt({
      name,
      age,
      height,
      weight,
      gender,
      contact,
      address,
      email,
      public_key: account,
    });

    // const password = passwordRef.current.value;
    // const confirmPassword = password1Ref.current.value;

    const data = {
      name,
      age,
      height,
      weight,
      gender,
      contact,
      address,
      email,
      password,
      confirmPassword,
    };

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    console.log("P", provider);
    console.log(pt);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const patient = new ethers.Contract(
      "0x07469c006f35b58a4A52E77aAcf6A14fcE332276",
      patientABI,
      signer,
      provider
    );

    // const abc = await patient.patient(1);

    await patient.addPatient(
      name,
      age,
      height,
      weight,
      gender,
      contact,
      address,
      account
    );
    fetch("http://localhost:5000/patient_signup/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(), navigate("/home_patient"))
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("patient", JSON.stringify({ data }));
        // setSignedIn({firstName:user.fullName,loggedIn:"True"})
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" ref={usernameRef} />
        <Input type="text" placeholder="Age" ref={ageRef} />
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={password1Ref}
        />
        <Input type="text" placeholder="Height" ref={heightRef} />
        <Input type="text" placeholder="Weight" ref={weightRef} />
        <Input type="text" placeholder="Gender" ref={genderRef} />
        <Input type="text" placeholder="Contact" ref={contactRef} />
        <Input type="text" placeholder="Address" ref={addressRef} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={saveDetails}>
        Register
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="/patient_login">Signin</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
