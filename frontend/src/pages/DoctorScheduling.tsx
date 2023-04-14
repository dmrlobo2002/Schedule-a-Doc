import React, { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

type Appointment = {
  id: string;
  date: string;
  patientName: string;
  isApproved: boolean;
};

function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

const DoctorScheduling = () => {
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    try {
      // Replace the URL with the actual API endpoint
      const response = await axios.get(
        `http://localhost:6001/appointments/${user._id}`
      );
      console.log("response.data:", response.data);

      // Access the "appointments" property of response.data
      const appointmentsData = response.data.appointments;

      if (Array.isArray(appointmentsData)) {
        console.log(appointmentsData as Appointment[]);

        // Fetch patient names and update the appointments state
        const appointmentsWithPatientName = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const patient = await fetchUser(appointment.patientID);
            return {
              ...appointment,
              patientName: patient
                ? `${patient.firstName} ${patient.lastName}`
                : "Unknown",
            };
          })
        );
        setAppointments(appointmentsWithPatientName);
      } else {
        console.log("Wrapping single object inside array");
        setAppointments([appointmentsData] as Appointment[]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleApprove = async (appointmentId: string) => {
    try {
      // Replace the URL with the actual API endpoint
      console.log("APPT ID: ", appointmentId);
      const response = await axios.patch(
        `http://localhost:6001/appointments/${appointmentId}/status`,
        {
          isApproved: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchAppointments();
      } else {
        alert("Error updating appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDeny = async (appointmentId: string) => {
    try {
      // Replace the URL with the actual API endpoint
      const response = await axios.patch(
        `http://localhost:6001/appointments/${appointmentId}/status`,
        {
          isApproved: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchAppointments();
      } else {
        alert("Error updating appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const fetchUser = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:6001/users/${userId}`);
      console.log("USER OBJ" + response);
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  return (
    <div>
      <h1>Doctor Scheduling</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(appointments) &&
            appointments.map((appointment: any) => (
              <tr key={appointment.id}>
                <td>{formatDate(appointment.date)}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.isApproved ? "Approved" : "Pending"}</td>
                <td>
                  {appointment.isApproved ? (
                    <button onClick={() => handleDeny(appointment.ID)}>
                      Deny
                    </button>
                  ) : (
                    <button onClick={() => handleApprove(appointment.ID)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorScheduling;
