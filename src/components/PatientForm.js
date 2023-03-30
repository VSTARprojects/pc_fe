import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useNavigate } from "react-router-dom";
import SampleService from "../services/SampleService";

const useStyles = makeStyles((theme) => ({
    formContainer: {
    width:"50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
        margin: "1rem",
   
    backgroundColor: "#f7f7f7",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  textField: {
    margin: "0.5rem",
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  submitButton: {
    margin: "1rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
      alignItems: "center",
    
    justifyContent: "center",
  },
  title: {
    marginBottom: "1rem",
    color: "#4caf50",
    fontWeight: "bold",
  },
}));


function PatientForm({setPatientId}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  //const [id, setId] = useState('');
  const [phone_number, setphoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
   
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
     
    console.log(`Name: ${name}\n PhoneNo: ${phone_number}\nGender: ${gender}`);

    var formData = new FormData();
    formData.append("name", name);
    formData.append("sex", gender);
    formData.append("dob", dob);
    formData.append("phone_number", phone_number);
    console.log(formData)

    
    SampleService.setPatient(formData).then((response) => {
        console.log(response.data)
        setPatientId(response.data)
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong in creating the patient");
    });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
       <Typography variant="h5" className={classes.title}>
        Patient Form
      </Typography>
      <TextField
            type="text"
            label="Patient Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
             
            className={classes.textField}
            required
      />
            <Typography>Gender</Typography>
             <RadioGroup value={gender} onChange={handleGenderChange} required  className={classes.radioGroup}>
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel
                value="F"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="O"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel
                value="N"
                control={<Radio />}
                label="Pefer not to say"
              />
      </RadioGroup>
          <TextField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            InputLabelProps={{
              shrink: true
          }}
        required
        className={classes.textField}
          />

          <TextField
            label="Phone number"
            type="text"
        value={phone_number}
         
            onChange={(event) => setphoneNo(event.target.value)}
            
        required
        className={classes.textField}
          />

      <Button type="submit" variant="contained"
        color="primary" className={classes.submitButton}>
            Submit
          </Button>
      </form>
    
  );
}

export default PatientForm;
