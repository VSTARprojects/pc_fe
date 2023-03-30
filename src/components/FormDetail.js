import React from "react";
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

function FormDetail() {
    const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pid, setPid] = useState("");
  const [collection_datetime, setCollectionDatetime] = useState("");
  const [diagnosis_code, setDiagnosisCode] = useState("");
  const [origin, setOrigin] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [comments, setComments] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [human_label, setHL] = useState("");
  const [formData, setFormData] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Id: ${id}\n Pid: ${pid}`);
    // let config = {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         "Authorization": "Token ce3b119c6856ae942772f8c1693ddff40d574959",
    //     }
    //   }
    console.log(`owner: ${id}\n Patient: ${pid}\n date_collected: ${image}`);
    let formData = new FormData();
    formData.append("owner", { id });
    formData.append("patient", { pid });
    formData.append("date_collected", { collection_datetime });
    formData.append("diagnosis_code", { diagnosis_code });
    formData.append("type", { type });
    formData.append("origin", { origin });
    formData.append("comments", { comments });
    formData.append("symptoms", { symptoms });
    formData.append("image", { image });
    formData.append("human_label", { human_label });
    console.log(formData)
      setFormData(formData);
      
      navigate("/sample/{pid}",{replace:true})
    //     axios
    //       .post("http://127.0.0.1:8000/api/v1/samples/", formData, config)
    //       .then((response) => {
    //         console.log(response)
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         alert("Something went wrong in creating the sample");
    //       });
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
            label="Owner ID"
            value={id}
            onChange={(event) => setId(event.target.value)}
            margin="normal"
            fullWidth
            required
          />
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
                value="BIOPSY"
                control={<Radio />}
                label="Biopsy"
              />
              <FormControlLabel
                value="SURGICAL_RESECTION"
                control={<Radio />}
                label="Surgical Resection"
              />
              <FormControlLabel
                value="OTHER"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </Box>
          <Typography>Origin</Typography>
          <Box sx={{ marginLeft: 10 }}>
            <RadioGroup value={origin} onChange={handleOriginChange} required>
              <FormControlLabel
                value="BLOOD"
                control={<Radio />}
                label="Blood"
              />
              <FormControlLabel
                value="TISSUE"
                control={<Radio />}
                label="Tissue"
              />
              <FormControlLabel
                value="URINE"
                control={<Radio />}
                label="Urine"
              />
              <FormControlLabel
                value="STOOL"
                control={<Radio />}
                label="Stool"
              />
              <FormControlLabel
                value="FLUID"
                control={<Radio />}
                label="Fluid"
              />
              <FormControlLabel
                value="OTHER"
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
