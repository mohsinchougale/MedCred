import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { SignupForm_Patient } from "./components/accountBox/signupForm_patient";
import "./App.css";
import { LoginForm_Patient } from "./components/accountBox/loginForm_patient";
import { LoginForm_Doctor } from "./components/accountBox/loginForm_doctor";
import { SignupForm_Doctor } from "./components/accountBox/signupForm_doctor";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient_login" element={<LoginForm_Patient />} />
        <Route path="/doctor_login" element={<LoginForm_Doctor />} />
        <Route path="/patient_signup" element={<SignupForm_Patient />} />
        <Route path="/doctor_signup" element={<SignupForm_Doctor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
