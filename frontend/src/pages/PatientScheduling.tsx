import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUser from "../hooks/useUser";

interface Doctor {
  id: string;
  name: string;
}

interface Appointment {
  id: string;
  time: string;
}

const PatientScheduling = () => {
  const { user } = useUser();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [availableAppointments, setAvailableAppointments] = useState<
    Appointment[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    // Fetch the list of doctors from the backend
    axios
      .get("http://localhost:6001/api/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailableAppointments(selectedDoctor, selectedDate);
    }
  }, [selectedDoctor, selectedDate]);

  const fetchAvailableAppointments = (doctorId: string, date: Date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    axios
      .get(
        `http://localhost:6001/api/appointments/${doctorId}/${formattedDate}`
      )
      .then((response) => {
        setAvailableAppointments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDoctorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(e.target.value || null);
  };

  const handleAppointmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAppointment(e.target.value || null);
  };

  const handleDateChange: ReactDatePickerProps["onChange"] = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div>
      <h1>Patient Scheduling</h1>
      <label htmlFor="doctor-select">Select a doctor:</label>
      <select
        id="doctor-select"
        value={selectedDoctor || ""}
        onChange={handleDoctorChange}
      >
        <option value="">--Select a doctor--</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <label htmlFor="date-picker">Select a date:</label>
      <DatePicker
        id="date-picker"
        selected={selectedDate}
        onChange={handleDateChange}
      />
      <label htmlFor="appointment-select">Select an appointment time:</label>
      <select
        id="appointment-select"
        value={selectedAppointment || ""}
        onChange={handleAppointmentChange}
      >
        <option value="">--Select a time--</option>
        {availableAppointments.map((appointment) => (
          <option key={appointment.id} value={appointment.id}>
            {appointment.time}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PatientScheduling;
