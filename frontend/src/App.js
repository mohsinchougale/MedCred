import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Doctor from "./components/Doctor";
import Patient from "./components/Patient";
import Home from "./components/Home";
const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
