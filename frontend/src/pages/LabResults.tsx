import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';
import axios from "axios";
import SideBarD from "../components/sidebar/SideBardD";
import "./LabResults.css"
//npm install query strings

export const LabResults = () => {
  const [selectedName, setSelectedName] = useState("");
  const patients = [
    { name: 'John Smith', dob: 'January 1, 1980', visits: 5, insurance: 'XYZ Insurance', physician: 'Dr. Jones', testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Jane Doe', dob: 'February 14, 1995', visits: 2, insurance: 'ABC Insurance', physician: 'Dr. Lee' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Bob Johnson', dob: 'March 22, 1976', visits: 10, insurance: '123 Insurance', physician: 'Dr. Patel' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Alice Brown', dob: 'April 5, 1990', visits: 3, insurance: 'XYZ Insurance', physician: 'Dr. Lee' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Sam Jones', dob: 'May 12, 1985', visits: 6, insurance: 'ABC Insurance', physician: 'Dr. Jones', testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Emily Davis', dob: 'June 30, 1978', visits: 4, insurance: '123 Insurance', physician: 'Dr. Patel' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Mike Green', dob: 'July 4, 1982', visits: 8, insurance: 'XYZ Insurance', physician: 'Dr. Lee', testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Jennifer Lee', dob: 'August 17, 1987', visits: 1, insurance: 'ABC Insurance', physician: 'Dr. Jones', testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Tom Wilson', dob: 'September 2, 1972', visits: 12, insurance: '123 Insurance', physician: 'Dr. Patel' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Sarah Nguyen', dob: 'October 25, 1988', visits: 7, insurance: 'XYZ Insurance', physician: 'Dr. Jones' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Robert Jackson', dob: 'November 11, 1992', visits: 2, insurance: 'ABC Insurance', physician: 'Dr. Lee' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'David Kim', dob: 'December 3, 1983', visits: 9, insurance: '123 Insurance', physician: 'Dr. Patel' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Catherine Chen', dob: 'January 15, 1998', visits: 3, insurance: 'XYZ Insurance', physician: 'Dr. Lee' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'William Johnson', dob: 'February 28, 1979', visits: 5, insurance: 'ABC Insurance', physician: 'Dr. Jones' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Maria Rodriguez', dob: 'March 7, 1984', visits: 6, insurance: '123 Insurance', physician: 'Dr. Patel' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Brian Lee', dob: 'April 12, 1991', visits: 4, insurance: 'XYZ Insurance', physician: 'Dr. Jones' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Linda Thompson', dob: 'May 20, 1975', visits: 11, insurance: 'ABC Insurance', physician: 'Dr. Lee', testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'] },
    { name: 'Christopher Davis', dob: 'June 18, 1981', visits: 7, insurance: '123 Insurance', physician: 'Dr. Patel' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']},
    { name: 'Karen Wilson', dob: 'July 31, 1973', visits: 13, insurance: 'XYZ Insurance', physician: 'Dr. Lee' , testResults: ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function']}, 
  ];
  const handleExpand = (name: string) => {
    if (expanded === name) {
        setExpanded("");
      } else {
        setExpanded(name);
        setSelectedName(name);
      }
};

  addRandomTestResult(patients);
  console.log(patients);
  function addRandomTestResult(patients: any[]) {
    const testOptions = ['Blood Glucose', 'Cholesterol', 'Triglycerides', 'HDL Cholesterol', 'LDL Cholesterol', 'Liver Function', 'Kidney Function'];
  
    patients.forEach((patient) => {
      const randomTestResult = testOptions[Math.floor(Math.random() * testOptions.length)];
      patient.testResults.push(randomTestResult);
    });
  
    return patients;
  }
  function SearchLabResults(nombre: string) {
    for (let i = 0; i < patients.length; i++) {
      if (patients[i].name === nombre) {
        addRandomTestResult(patients);
        return i;
      }
    }
    return -1;
  }
  const [nombre, setFirstName] = useState<string>("");
  const [expanded, setExpanded] = useState('');
  const [index, setIndex] = useState<number>();

  return (
    <div className = "patient">
      <SideBarD />
      <div className= "Title">
        <h1>Lab Results for
            <input
              className="firstName"
              placeholder="Patient Name"
              value={nombre}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <button  style={{border: " 1px solid black", borderRadius: "10px", color: "black", backgroundColor: "lightblue" , padding: "10px"}}
          onClick={() => setIndex(SearchLabResults(nombre))
          }>Search</button>
          </h1>
      <div className="ResultFound">
        {index !== undefined ? (
        <div>
            <div className="Element">Patient: {patients[index].name}</div>
            <div className="Element"> DOB: {patients[index].dob}</div>
            <div className="Element">Number of Visits: {patients[index].visits}</div>
        </div>
      ) : (
        <p>No patient found</p>
      )}
      </div>
    </div> 
    </div>
  );
};

export default LabResults;
