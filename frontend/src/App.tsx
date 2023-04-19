import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/sidebar/SideBar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Scheduling from "./pages/Scheduling";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
// import DoctorScheduling from "./pages/DoctorScheduling";
import PatientScheduling from "./pages/PatientScheduling";
import ForgotPassword from "./pages/ForgotPassword";
import PatientInfo from "./pages/PatientInfo";
import DoctorInfo from "./pages/DoctorInfo";
import PatientRecords from "./pages/PatientRecords";
import PendingRequests from "./pages/PendingRequests";
import LabResults from "./pages/LabResults";
import VerificationCode from "./pages/VerificationCode";
import { PasswordReset } from "./pages/PasswordReset";
import DoctorScheduling from "./pages/DoctorScheduling";
import DaCalendar from "./pages/DaCalendar";
import PaCalendar from "./pages/PaCalendar";
import DailyTasks from "./pages/DailyTask";
import DocCalConnect from "./pages/DocCalConnect";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Scheduling" element={<Scheduling />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/DoctorScheduling" element={<DoctorScheduling />} />
          <Route path="/VerificationCode" element={<VerificationCode />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/PatientInfo" element={<PatientInfo />} />
          <Route path="/LabResults" element={<LabResults />} />
          <Route path="/DoctorInfo" element={<DoctorInfo />} />
          <Route path="/PatientRecords" element={<PatientRecords />} />
          <Route path="/PendingRequests" element={<PendingRequests />} />
          {/* <Route path="/DoctorScheduling" element={<DoctorScheduling />} />*/}
          <Route path="/PatientScheduling" element={<PatientScheduling />} />
          <Route path="/PaCalendar" element={<PaCalendar />} />
          <Route path="/DaCalendar" element={<DaCalendar />} />
          <Route path="/DailyTasks" element={<DailyTasks />} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;
