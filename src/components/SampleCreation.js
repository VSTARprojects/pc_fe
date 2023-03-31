import React from "react";
import FormDetail from "./FormDetail";
import PatientForm from "./PatientForm";
import { useState } from "react";
 

function SampleCreation() {
    const defaultComponent = <PatientForm />;
  const [selectedItem, setSelectedItem] = useState(defaultComponent );
  const dropdownItems = [
    { id: 1, name: "New Patient", component: <PatientForm /> },
    { id: 2, name: "Existing Patient", component: <FormDetail /> },
  ];

  const handleSelect = (itemId) => {
    const selectedItem = dropdownItems.find((item) => item.id === itemId);
    setSelectedItem(selectedItem.component);
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
      {selectedItem}
    </div>
     
  );
}

export default SampleCreation;
