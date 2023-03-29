import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../hooks/useUser';

type Appointment = {
    id: string;
    date: string;
    patientName: string;
    isApproved: boolean;
  };
  
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
        const response = await axios.get(`http://localhost:6001/appointments/${user._id}`);
        console.log(response.data as Appointment[])
        if (Array.isArray(response.data)) {
            console.log(response.data as Appointment[])
          setAppointments(response.data as Appointment[]);
        } else {
            console.log('Wrapping single object inside array');
            setAppointments([response.data] as Appointment[]);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
  

  const handleApprove = async (appointmentId: string) => {
    try {
      // Replace the URL with the actual API endpoint
      const response = await axios.patch(`https://your-api-url.com/appointments/${appointmentId}`, {
        isApproved: true,
      });

      if (response.status === 200) {
        fetchAppointments();
      } else {
        alert('Error updating appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDeny = async (appointmentId: string) => {
    try {
      // Replace the URL with the actual API endpoint
      const response = await axios.patch(`https://your-api-url.com/appointments/${appointmentId}`, {
        isApproved: false,
      });

      if (response.status === 200) {
        fetchAppointments();
      } else {
        alert('Error updating appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
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
          {Array.isArray(appointments) && appointments.map((appointment: any) => (
            <tr key={appointment.id}>
              <td>{appointment.date}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.isApproved ? 'Approved' : 'Pending'}</td>
              <td>
                {appointment.isApproved ? (
                  <button onClick={() => handleDeny(appointment.id)}>Deny</button>
                ) : (
                  <button onClick={() => handleApprove(appointment.id)}>Approve</button>
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
