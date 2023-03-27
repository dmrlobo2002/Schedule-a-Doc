import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Error from "./components/pages/Error";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import AboutUs from "./components/pages/AboutUs";
import PatientDashboard from "./components/pages/PatientDashboard";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
