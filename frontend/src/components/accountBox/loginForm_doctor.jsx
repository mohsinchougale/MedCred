import React, { useContext, useRef } from "react";
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

export function LoginForm_Doctor(props) {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const saveDetails = (event) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const data = { email, password };

    fetch("http://localhost:5001/doctor_signin", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        if (response.status !== 404) navigate("/");
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    navigate("/");
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={saveDetails}>
        Sign In
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="/doctor_signup">Register</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
