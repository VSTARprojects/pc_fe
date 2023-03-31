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


function PatientForm() {
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

    // let config = {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         "Authorization": "Token ce3b119c6856ae942772f8c1693ddff40d574959",
    //     }
    //   }

    let formData = new FormData();
    formData.append("name", { name });
    formData.append("sex", { gender });
    formData.append("dob", { dob });
    formData.append("phone_number", { phone_number });

    

    //     axios
    //       .post("http://127.0.0.1:8000/api/v1/samples/", formData, config)
    //       .then((response) => {
    //         console.log(response)
      navigate("/formDetail" , {replace:true});
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         alert("Something went wrong in creating the sample");
    //       });
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
 
    // <Container sx={{ width: "1000" }}>
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Typography component="h1" variant="h5">
    //       Patient Form
    //     </Typography>
    //     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
    //       {/* <TextField
    //                 label="Patient ID"
    //                 type="text"
    //                 value={id}
    //                 onChange={(event) => setId(event.target.value)}
    //                 margin="normal"
    //                 fullWidth
    //                 required
    //             /> */}
    //       <TextField
    //         type="text"
    //         label="Patient Name"
    //         value={name}
    //         onChange={(event) => setName(event.target.value)}
    //         margin="none"
    //         fullWidth
    //         required
    //       />

    //       <Typography>Gender</Typography>
    //       <Box sx={{ marginLeft: 10 }}>
    //         <RadioGroup value={gender} onChange={handleGenderChange} required>
    //           <FormControlLabel value="MALE" control={<Radio />} label="Male" />
    //           <FormControlLabel
    //             value="FEMALE"
    //             control={<Radio />}
    //             label="Female"
    //           />
    //           <FormControlLabel
    //             value="OTHER"
    //             control={<Radio />}
    //             label="Other"
    //           />
    //           <FormControlLabel
    //             value="NOT_SAY"
    //             control={<Radio />}
    //             label="Pefer not to say"
    //           />
    //         </RadioGroup>
    //       </Box>
    //       <TextField
    //         label="Date of Birth"
    //         type="date"
    //         value={dob}
    //         onChange={(event) => setDob(event.target.value)}
    //         margin="normal"
    //         fullWidth
    //         required
    //       />

    //       <TextField
    //         label="Phone number"
    //         type="text"
    //         value={phone_number}
    //         onChange={(event) => setphoneNo(event.target.value)}
    //         margin="normal"
    //         fullWidth
    //         required
    //       />

    //       <Button type="submit" variant="contained" color="primary">
    //         Submit
    //       </Button>
    //     </Box>
    //   </Box>
    // </Container>

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
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              <FormControlLabel
                value="FEMALE"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="OTHER"
                control={<Radio />}
                label="Other"
              />
              <FormControlLabel
                value="NOT_SAY"
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
