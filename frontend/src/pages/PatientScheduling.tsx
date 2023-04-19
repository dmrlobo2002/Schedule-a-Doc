import React, { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

interface Doctor {
  id: string;
  email: string
  firstName: string;
  lastName: string;
  isDoctor: boolean; // add the isDoctor property
}

const PatientScheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { user } = useUser();

  const getUserIDByEmail = async (email: string) => {
    try {
      console.log("Email in the func: ", email);
      const response = await axios.get(`http://localhost:6001/userID/${email}`);
      console.log("Response in the function: ", response);
      console.log("Response.data.userID ", response.data.userID, "and the type is: ", typeof response.data.userID);
      return response.data.userID;
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleDoctorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!selectedDate || !selectedTime || !selectedDoctor) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    console.log("Selected Doctor: ", selectedDoctor);

    const doctorID = await getUserIDByEmail(selectedDoctor);
    console.log("DoctorID inside of handleSubmit: ", doctorID)

    // const doctorID = selectedDoctorObject?.id || "";

    const appointmentData = {
      date: `${selectedDate.toISOString().split("T")[0]}T${selectedTime}:00`,
      category: "general checkup",
      patientID: user._id, // Replace with the actual patient ID
      doctorID: doctorID,
      isApproved: false,
    };
  
    try {
      console.log("Appointment Data: ", appointmentData);
      const response = await axios.post(
        "http://localhost:6001/createAppointment",
        appointmentData
      );
  
      if (response.status === 200) {
        alert("Appointment successfully scheduled.");
        // Clear form fields if necessary
        setSelectedDate(null);
        setSelectedTime("");
        setSelectedDoctor("");
      } else {
        alert("Error scheduling appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Error scheduling appointment. Please try again.");
    }
  };
  
  const renderTimeOptions = () => {
    const timeOptions: string[] = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0); // Set the start time to 9AM
    const endTime = new Date();
    endTime.setHours(17, 0, 0, 0); // Set the end time to 5PM
    const interval = 90 * 60 * 1000; // Set the interval to 1.5 hours in milliseconds

    // Loop through the available time slots and add them to the array of time options
    for (
      let time = startTime.getTime();
      time < endTime.getTime();
      time += interval
    ) {
      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;
      timeOptions.push(timeString);
    }

    // Map the array of time options to a list of option elements
    return timeOptions.map((time) => <option key={time}>{time}</option>);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<{ doctors: Doctor[] }>(
          "http://localhost:6001/doctors"
        );
        console.log(response);
        const validData = Array.isArray(response.data.doctors)
          ? response.data.doctors
          : [];
        setDoctors(validData.filter((doctor: Doctor) => doctor.isDoctor));
        console.log("Doctors advanced: ", validData.filter((doctor: Doctor) => doctor.isDoctor));
        console.log("Doctors: ", doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const renderDoctorOptions = () => {
    const doctorOptions = [];
    for (let i = 0; i < doctors.length; i++) {
      const doctor = doctors[i];
      const optionElement = (
        <option key={doctor.email} value={doctor.email}>
          {`${doctor.firstName} ${doctor.lastName}`}
        </option>
      );
      doctorOptions.push(optionElement);
    }
    return doctorOptions;
  };
  return (
    <div>
      <h1>Schedule an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={selectedDate?.toISOString().split("T")[0]} onChange={handleDateChange} required />
        </label>
        <label>
          Time:
          <select value={selectedTime} onChange={handleTimeChange} required>
            <option value="">Select a time</option>
            {renderTimeOptions()}
          </select>
        </label>
        <label>
          Doctor:
          <select value={selectedDoctor} onChange={handleDoctorChange} required>
            <option value="">Select a doctor</option>
            {renderDoctorOptions()}
          </select>
        </label>
        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
};

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!selectedDate || !selectedTime || !selectedDoctor) {
//       alert("Please fill out all fields before submitting.");
//       return;
//     }

//     const appointmentData = {
//       date: `${selectedDate.toISOString().split("T")[0]}T${selectedTime}:00`,
//       category: "general checkup",
//       patientID: user._id, // Replace with the actual patient ID
//       doctorID: selectedDoctor,
//       isApproved: false,
//     };

//     try {
//       console.log("Appointment Data: ", appointmentData);
//       const response = await axios.post(
//         "http://localhost:6001/createAppointment",
//         appointmentData
//       );

//       if (response.status === 200) {
//         alert("Appointment successfully scheduled.");
//         // Clear form fields if necessary
//         setSelectedDate(null);
//         setSelectedTime("");
//         setSelectedDoctor("");
//       } else {
//         alert("Error scheduling appointment. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error submitting appointment:", error);
//       alert("Error scheduling appointment. Please try again.");
//     }
//   };
//   const renderTimeOptions = () => {
//     const timeOptions: string[] = [];
//     const startTime = new Date();
//     startTime.setHours(9, 0, 0, 0); // Set the start time to 9AM
//     const endTime = new Date();
//     endTime.setHours(17, 0, 0, 0); // Set the end time to 5PM
//     const interval = 90 * 60 * 1000; // Set the interval to 1.5 hours in milliseconds

//     // Loop through the available time slots and add them to the array of time options
//     for (
//       let time = startTime.getTime();
//       time < endTime.getTime();
//       time += interval
//     ) {
//       const date = new Date(time);
//       const hours = date.getHours().toString().padStart(2, "0");
//       const minutes = date.getMinutes().toString().padStart(2, "0");
//       const timeString = `${hours}:${minutes}`;
//       timeOptions.push(timeString);
//     }

//     // Map the array of time options to a list of option elements
//     return timeOptions.map((time) => <option key={time}>{time}</option>);
//   };

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get<{ doctors: Doctor[] }>(
//           "http://localhost:6001/doctors"
//         );
//         console.log(response);
//         const validData = Array.isArray(response.data.doctors)
//           ? response.data.doctors
//           : [];
//         setDoctors(validData.filter((doctor: Doctor) => doctor.isDoctor));
//         console.log("Doctors: ", doctors);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h1>Patient Scheduling</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="date">Date:</label>
//           <input
//             type="date"
//             id="date"
//             name="date"
//             onChange={handleDateChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="time">Time:</label>
//           <select
//             id="time"
//             name="time"
//             value={selectedTime}
//             onChange={handleTimeChange}
//           >
//             <option value="">Select a time</option>
//             {renderTimeOptions()}
//           </select>
//         </div>
//         <div>
//           <label htmlFor="doctor">Doctor:</label>
//           <select
//             value={selectedDoctor}
//             onChange={(e) => setSelectedDoctor(e.target.value)}
//           >
//             <option value="">Select a Doctor</option>
//             {doctors.map((doctor) => (
//               <option key={doctor.id} value={doctor.id}>
//                 {doctor.lastName}, {doctor.firstName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Schedule</button>
//       </form>
//     </div>
//   );
// };

export default PatientScheduling;
