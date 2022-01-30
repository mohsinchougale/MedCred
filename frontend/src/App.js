import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SignupForm_Patient } from "./components/accountBox/signupForm_patient";
import "./App.css";
import { LoginForm_Patient } from "./components/accountBox/loginForm_patient";
import { LoginForm_Doctor } from "./components/accountBox/loginForm_doctor";
import { SignupForm_Doctor } from "./components/accountBox/signupForm_doctor";
import Home from "./components/pages/HomePage/Home";
import Home_Doctor from "./components/Home_Doctor";
import Home_Patient from "./components/Home_Patient";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home_doctor" element={<Home_Doctor />} />
        <Route path="/home_patient" element={<Home_Patient />} />

        <Route path="/patient_login" element={<LoginForm_Patient />} />
        <Route path="/doctor_login" element={<LoginForm_Doctor />} />
        <Route path="/patient_signup" element={<SignupForm_Patient />} />
        <Route path="/doctor_signup" element={<SignupForm_Doctor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
