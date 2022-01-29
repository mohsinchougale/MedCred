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
// string phoneNumber;
// string specialization;
// address walletAddress;
// string publicKey;
export function SignupForm_Doctor(props) {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const contactRef = useRef();
  const specializationRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password1Ref = useRef();

  const saveDetails = (event) => {
    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = password1Ref.current.value;
    const contact = contactRef.current.value;
    const specialization = specializationRef.current.value;

    const data = {
      name,
      email,
      password,
      confirmPassword,
      contact,
      specialization,
    };

    fetch("http://localhost:5001/doctor_signup", {
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
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <Input
          type="password"
          placeholder="Confirm Password"
          ref={password1Ref}
        />
        <Input type="text" placeholder="Contact Number" ref={contactRef} />
        <Input
          type="text"
          placeholder="Specialization"
          ref={specializationRef}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={saveDetails}>
        Register
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="/doctor_login">Signin</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
