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
import doctorABI from "../../ABIs/doctorABI.json";
import { useMetaMask } from "metamask-react";
// string name;
// string phoneNumber;
// string specialization;
// address walletAddress;
// string publicKey;
export function SignupForm_Doctor(props) {
  const [dr, setDr] = useState({
    name: "",
    contact: "",
    specialization: "",
    public_key: "",
  });
  const navigate = useNavigate();
  const usernameRef = useRef();
  const contactRef = useRef();
  const specializationRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password1Ref = useRef();

  const { status, connect, account } = useMetaMask();

  useEffect(() => {
    console.log(account);
    if (account) setDr({ public_key: account });
  }, [account]);

  const saveDetails = async (event) => {
    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = password1Ref.current.value;
    const contact = contactRef.current.value;
    const specialization = specializationRef.current.value;
    setDr({
      name,
      contact,
      specialization,
      public_key: account,
    });

    const data = {
      name,
      email,
      password,
      confirmPassword,
      contact,
      specialization,
    };
    console.log("d", data);
    // if (dr.address !== "-") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    console.log("P", provider);
    console.log(dr);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const doctor = new ethers.Contract(
      "0xd7bD36a1038421FF0F500e8fFeF34d7ee7AF72CE",
      doctorABI,
      signer,
      provider
    );

    const abc = await doctor.doctor(1);

    await doctor.addDoctor(name, contact, specialization, account);

    console.log("ABC", abc);

    fetch("http://localhost:5000/doctor_signup/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json(), navigate("/home_doctor"))
      .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("doctor", JSON.stringify({ data }));
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
