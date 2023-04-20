import React, { useState, useEffect } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
import "./DoctorScheduling.css";
// import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

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

      if (appointmentsData === null) {
        console.log("No appointments found");
        setAppointments([]);
        return;
      }

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
    <div className="navbar w-full fixed bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">Doctor Scheduling</h1>
        <div className="shadow-md rounded-lg p-6 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(appointments) &&
                appointments.map((appointment: any, index: number) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(appointment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.patientName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.isApproved ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {appointment.isApproved ? (
                        <button
                          onClick={() => handleDeny(appointment.ID)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(appointment.ID)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduling;
