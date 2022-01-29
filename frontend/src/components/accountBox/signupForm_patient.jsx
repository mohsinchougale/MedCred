import React, { useContext, useRef, useState } from "react";
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

  const saveDetails = (event) => {
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

    fetch("http://localhost:5001/patient_signup/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(), navigate("/"))
      .then((data) => {
        console.log("Success:", data);
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
