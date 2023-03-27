import React from 'react';
import { Container, Typography, Button, Box } from "@mui/material";
import ImageLists from './ImageLists';
function SampleData ({ sample})  {
  return (
    // <div className="card">
    //   <img src={sample.wsi_image} alt="card image" />
    //   <div className="card-body">
    //     <h5 className="card-title">ID: {sample.id}</h5>
    //     <p className="card-text">Collection Date: {sample.collection_datetime}</p>
    //           <h2 className='card-text'>type : {sample.type}</h2>
    //     <p className="card-text">Diagnosis Code: {sample.diagnosis_code}</p>
    //     <h2 className="card-text">Origin: {sample.origin}</h2> 
    //     <p className="card-text">Symptoms: {sample.symptoms}</p>
        
    //   </div>
    // </div>

    <Container sx={{ boxShadow: 2, p: 2, mt: 5 }}>
      
      <Box sx={{ py: 2 }}>
        <Typography
          variant="h4"
          color="black"
          fontWeight={"bold"}
          marginBottom={"10px"}
        >
          Noor Khan
        </Typography>
        <div style={{ marginBottom: "10px" }}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Date of Collection:&nbsp;
          </Typography>
          <Typography variant="body1" sx={{ display: "inline" }}>
            10-01-2022
          </Typography>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Age:&nbsp;
          </Typography>
          <Typography variant="body1" sx={{ display: "inline" }}>
            21
          </Typography>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Type:&nbsp;
          </Typography>
          <Typography variant="body1" sx={{ display: "inline" }}>
            Biospy
          </Typography>
        </div>
        
        { 
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            marginBottom={"10px"}
          >
            Sample Image
          </Typography>
        }
        
        
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ textTransform: "none", marginRight: "10px" }}
            href=""
            target="_blank"
          >
            Predict
          </Button>

          <ImageLists />
        
      </Box>
    </Container>


  );
};

export default SampleData