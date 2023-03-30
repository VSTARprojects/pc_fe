import React, { useEffect } from "react";
import FormDetail from "./FormDetail";
import PatientForm from "./PatientForm";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
 

function SampleCreation() {
    const defaultComponent = <PatientForm />;
  const [selectedItem, setSelectedItem] = useState("patient" );
  const [patientId, setPatientId] = useState(0);
  const dropdownItems = [
    { id: 1, name: "New Patient", component: "patient" },
    { id: 2, name: "Existing Patient", component: "sample" },
  ];

  const handleSelect = (itemId) => {
    const selectedItem = dropdownItems.find((item) => item.id === itemId);
    // setSelectedItem(selectedItem.component);
    if(selectedItem.component == "sample") {
      setPatientId(-1);
    } else {
      setPatientId(0);
    }   
    
  };

  return (
    
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <select onChange={(e) => handleSelect(parseInt(e.target.value))}
      style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "0.25rem",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          color: "#333",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        {/* <option value={0}>Patient</option> */}
        {dropdownItems.map((item) => (
          <option key={item.id} value={item.id} to={item.component}>
            {item.name}
          </option>
        ))}
      </select>
      {patientId == 0 ? <PatientForm setPatientId={setPatientId}/> : <FormDetail patientId={patientId}/>}
    </div>
     
  );
}

export default SampleCreation;
