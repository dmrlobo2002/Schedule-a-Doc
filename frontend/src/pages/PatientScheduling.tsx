import React, { useState } from "react";

const PatientScheduling = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
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

  return (
    <div>
      <h1>Patient Scheduling</h1>
      <form>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <select
            id="time"
            name="time"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            <option value="">Select a time</option>
            {renderTimeOptions()}
          </select>
        </div>
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default PatientScheduling;
