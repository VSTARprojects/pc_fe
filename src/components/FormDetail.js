import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Input,
} from "@material-ui/core";
import SampleData from "./SampleData";
import { useNavigate } from "react-router-dom";
import SampleService from "../services/SampleService";

function FormDetail({patientId}) {
    const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pid, setPid] = useState(patientId != -1? patientId : "");
  const [collection_datetime, setCollectionDatetime] = useState("");
  const [diagnosis_code, setDiagnosisCode] = useState("");
  const [origin, setOrigin] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [comments, setComments] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [human_label, setHL] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`owner: ${id}\n Patient: ${pid}\n date_collected: ${image}`);
    let formData = new FormData();
    formData.append("patient", pid);
    formData.append("date_collected", collection_datetime);
    formData.append("diagnosis_code", diagnosis_code);
    formData.append("type", type);
    formData.append("origin", origin);
    formData.append("comments", comments);
    formData.append("symptoms", symptoms);
    formData.append("image", image);
    formData.append("human_label", human_label);
    console.log(formData)    
    SampleService.setSample(formData).then(() => {
      navigate("/sample/{pid}",{replace:true})
    }).catch((error) => {
      console.log(error);
      alert("Something went wrong in creating the sample");
    });
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

    return (
    <>
    <Container sx={{ width: "200" }}>
      <Box
        sx={{
          width: "50%", 
          
          display: "flex",
          flexDirection: "column",
                        alignItems: "Center",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                        margin: "1rem",
                        marginLeft:"16rem",
    backgroundColor: "#f7f7f7",
    padding: "1rem",
        }}
      >
        <Typography component="h1" variant="h5">
          Sample Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            type="text"
            label="Patient Id"
            value={pid}
            onChange={(event) => setPid(event.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            label="Collection Date"
            type="datetime-local"
            value={collection_datetime}
            onChange={(event) => setCollectionDatetime(event.target.value)}
            margin="normal"
            fullWidth
            required
            InputLabelProps={{
              shrink: true
          }}
          />

          <TextField
            label="Diagnosis Code"
            type="text"
            value={diagnosis_code}
            onChange={(event) => setDiagnosisCode(event.target.value)}
            margin="normal"
            fullWidth
            required
            inputProps={{ maxLength: 8 }}
          />
       
          <Typography>Type</Typography>
          <Box sx={{ marginLeft: 10 }}>
            <RadioGroup value={type} onChange={handleTypeChange} required>
              <FormControlLabel
                value="biopsy"
                control={<Radio />}
                label="Biopsy"
              />
              <FormControlLabel
                value="surgical resection"
                control={<Radio />}
                label="Surgical Resection"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Box>
          <Typography>Origin</Typography>
          <Box sx={{ marginLeft: 10 }}>
            <RadioGroup value={origin} onChange={handleOriginChange} required>
              <FormControlLabel
                value="Blood"
                control={<Radio />}
                label="Blood"
              />
              <FormControlLabel
                value="Tissue"
                control={<Radio />}
                label="Tissue"
              />
              <FormControlLabel
                value="Urine"
                control={<Radio />}
                label="Urine"
              />
              <FormControlLabel
                value="Stool"
                control={<Radio />}
                label="Stool"
              />
              <FormControlLabel
                value="Fluid"
                control={<Radio />}
                label="Fluid"
              />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Box>
          <TextField
            label="Symptoms"
            type="text"
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            label="Comments"
            type="text"
            value={comments}
            onChange={(event) => setComments(event.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            label="Human Label"
            type="text"
            value={human_label}
            onChange={(event) => setHL(event.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <FormControl fullWidth margin="normal">
            <FormLabel>Upload an WSI image</FormLabel>
            <Input type="file" onChange={handleImageChange} />
          </FormControl>

          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
            {/* {formData && <SampleData formData={formData} />} */}
    </>
  );
}

export default FormDetail;
