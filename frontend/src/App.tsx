import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
// import DoctorScheduling from "./pages/DoctorScheduling";
import PatientScheduling from "./pages/PatientScheduling";
import ForgotPassword from "./pages/ForgotPassword";
import VerificationCode from "./pages/VerificationCode";
import { PasswordReset } from "./pages/PasswordReset";

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
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/VerificationCode" element={<VerificationCode />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          {/* <Route path="/DoctorScheduling" element={<DoctorScheduling />} /> */}
          <Route path="/PatientScheduling" element={<PatientScheduling />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
