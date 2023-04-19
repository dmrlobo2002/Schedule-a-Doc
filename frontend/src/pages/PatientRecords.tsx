import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBarD from "../components/sidebar/SideBardD";
import "./PatientRecords.css"

export const PatientRecords = () => {
    const history = useNavigate();
    const [selectedName, setSelectedName] = useState("");   
    const [user, setUser] = useState({
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      isDoctor: false
    });
    const patients = [
        { name: 'John Smith', dob: 'January 1, 1980', visits: 5, insurance: 'XYZ Insurance', physician: 'Dr. Jones' },
        { name: 'Jane Doe', dob: 'February 14, 1995', visits: 2, insurance: 'ABC Insurance', physician: 'Dr. Lee' },
        { name: 'Bob Johnson', dob: 'March 22, 1976', visits: 10, insurance: '123 Insurance', physician: 'Dr. Patel' },
        { name: 'Alice Brown', dob: 'April 5, 1990', visits: 3, insurance: 'XYZ Insurance', physician: 'Dr. Lee' },
        { name: 'Sam Jones', dob: 'May 12, 1985', visits: 6, insurance: 'ABC Insurance', physician: 'Dr. Jones' },
        { name: 'Emily Davis', dob: 'June 30, 1978', visits: 4, insurance: '123 Insurance', physician: 'Dr. Patel' },
        { name: 'Mike Green', dob: 'July 4, 1982', visits: 8, insurance: 'XYZ Insurance', physician: 'Dr. Lee' },
        { name: 'Jennifer Lee', dob: 'August 17, 1987', visits: 1, insurance: 'ABC Insurance', physician: 'Dr. Jones' },
        { name: 'Tom Wilson', dob: 'September 2, 1972', visits: 12, insurance: '123 Insurance', physician: 'Dr. Patel' },
        { name: 'Sarah Nguyen', dob: 'October 25, 1988', visits: 7, insurance: 'XYZ Insurance', physician: 'Dr. Jones' },
        { name: 'Robert Jackson', dob: 'November 11, 1992', visits: 2, insurance: 'ABC Insurance', physician: 'Dr. Lee' },
        { name: 'David Kim', dob: 'December 3, 1983', visits: 9, insurance: '123 Insurance', physician: 'Dr. Patel' },
        { name: 'Catherine Chen', dob: 'January 15, 1998', visits: 3, insurance: 'XYZ Insurance', physician: 'Dr. Lee' },
        { name: 'William Johnson', dob: 'February 28, 1979', visits: 5, insurance: 'ABC Insurance', physician: 'Dr. Jones' },
        { name: 'Maria Rodriguez', dob: 'March 7, 1984', visits: 6, insurance: '123 Insurance', physician: 'Dr. Patel' },
        { name: 'Brian Lee', dob: 'April 12, 1991', visits: 4, insurance: 'XYZ Insurance', physician: 'Dr. Jones' },
        { name: 'Linda Thompson', dob: 'May 20, 1975', visits: 11, insurance: 'ABC Insurance', physician: 'Dr. Lee' },
        { name: 'Christopher Davis', dob: 'June 18, 1981', visits: 7, insurance: '123 Insurance', physician: 'Dr. Patel' },
        { name: 'Karen Wilson', dob: 'July 31, 1973', visits: 13, insurance: 'XYZ Insurance', physician: 'Dr. Lee' }, 
      ];
    const [expanded, setExpanded] = useState('');

    const handleViewLabResults = (name: string) => {
        history(`/LabResults/`);
      };
    const handleExpand = (name: string) => {
        if (expanded === name) {
            setExpanded("");
          } else {
            setExpanded(name);
            setSelectedName(name);
          }
    };
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:6001/user-properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    return (
      <div className = "patient">
        <SideBarD />
        <div className= "Title">
        <h1 style={{ display: "inline-block", flex: 1, fontSize: 20 }}>
          Patient Records Click on Any patient for more
        </h1>
        <div className="list-item" style={{ display: "flex", flexDirection: "column" }}>
        {patients
  .sort((a, b) => a.name.localeCompare(b.name)) // sort by name
  .map(({ name, dob, visits, insurance, physician }: { name: string; dob: string; visits: number; insurance: string; physician: string; }) => (
    <div key={name}  
    className={`name-box${selectedName === name ? " selected" : ""}`} onClick={() => handleExpand(name)}>
      <button><strong>{name}</strong></button>
      {expanded === name && (
        <>
          <div>Date of Birth: {dob}</div>
          <div>Number of Vists: {visits}</div>
          <div>Insurance Company: {insurance}</div>
          <div>Primary Care Physician: {physician}</div>
          <button 
          style={{borderRadius: "10px", color: "Red", backgroundColor: "blue" , padding: "10px"}}
          onClick={() => handleViewLabResults(name)
          }>View Lab Results</button>
        </>
      )}
    </div>
  ))} 
        </div>
      </div>
      </div>
    );
  };
  
  export default PatientRecords;