import React from 'react';
import { Container, Typography, Button, Box } from "@mui/material";
import {Link} from 'react-router-dom';
import SampleService from '../services/SampleService';
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import SampleListData from './SampleListData';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 5, 4),
  },
}));

function SampleData ()  {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [samples, setSamples] = useState([]);
  const classes = useStyles();


  let id=useParams();
  // console.log(Object.values(id));

    const fetchAll = async () => {
        try {
            const samples = await SampleService.get_user_samples()
            setSamples(samples)
            
        } catch(e) {
            console.log(e)
            setSamples(SampleListData);
            // console.log(samples);
        
        }
      
    }
   
    useEffect(() => {
      fetchAll()        
  }, [])



  return (
    <div>
      <Typography variant="h5" color="primary" style={{marginBottom:"20px", textAlign:"center", marginTop:"50px", fontWeight:"bold"}}>
          Pathology Report
    </Typography>
    <Container sx={{ boxShadow: 4, p: 3, mt:3, width:"80%"}}>

      <div>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            marginBottom={"10px"}
          >
            Sample Image
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography  sx={{mt:1}}>
            <img
              src="https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg"
              alt="example"
             
             />
           
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ textTransform: "none" }}
            href=""
            target="_blank"
            sx={{mb:3, mt:4}}
            onClick={handleOpen}

          >
            PREDICT
          </Button>

  
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
           <div className={classes.paper}>
              <h2 id="simple-modal-title">Prediction</h2>
              <p id="simple-modal-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
              </p>
             <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
          </div>
  
          </Modal>
          
          </Grid>
          </Grid>
        </div> 
       

    </Container>

    <Typography variant="h5" color="primary" style={{marginBottom:"20px", textAlign:"center", marginTop:"75px", fontWeight:"bold"}}>
          Patient Details
    </Typography>

    <Container sx={{ boxShadow: 4, p: 2, mt:3, width:"80%", mb:8}}>
      
        <Typography
          variant="h4"
          color="black"
          fontWeight={"bold"}
          marginBottom={"10px"}
        >
             {/* {sample.patientName}   */} Noor Khan
           
          
        </Typography>

        <div style={{ marginBottom: "10px", marginTop: "30px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
          <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Patient ID&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>

            {samples.id}

          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        <div style={{ marginBottom: "10px"}}>
        <Grid item xs direction="row" container spacing={3} component="div">
          <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Gender&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.sex}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
          <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Date of Birth&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.dob}
          </Typography>
          </Grid>
          </Grid>
        </div>
       <hr />
        {/* <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Height&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            170 cm
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        
        <Grid item xs direction="row" container spacing={3} component="div">
          <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
            xs={4}
          >
            Weight&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }} xs={4}>
            60 kg
          </Typography>
          </Grid>
        </Grid> 
       
        <hr /> */}

        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Phone Number&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.phone_number}
          </Typography>
          </Grid>
        </Grid>
        </div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Date of Collection&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.date_added}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        <div>
        <Grid item xs direction="row" container spacing={3} component="div">
         <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Type&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.type}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />

        {/* <Grid item xs={1}></Grid>
        <Grid item>
          <Avatar 
            alt="Remy Sharp" 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
            sx={{ width: 175, height: 225, mt: 7 }}
            variant="square"

          />
          </Grid>
        </Grid> */}
        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
         <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Origin&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
           {samples.origin}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Symptoms&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={7}>
          <Typography variant="body1" sx={{ display: "inline" }}>
           {samples.symptoms}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        
        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Comments&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={7}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.comments}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        <div style={{ marginBottom: "10px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Predicted Label&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.predicted_label}
          </Typography>
          </Grid>
          </Grid>
        </div>
        <hr />
        <div style={{ marginBottom: "50px" }}>
        <Grid item xs direction="row" container spacing={3} component="div">
        <Grid item xs={4}>
          <Typography
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}
          >
            Human Label&nbsp;
          </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography 
            variant="body1"
            color="black"
            fontWeight={"bold"}
            sx={{ display: "inline" }}>:</Typography>
          </Grid>
          <Grid item xs={4}>
          <Typography variant="body1" sx={{ display: "inline" }}>
            {samples.human_label}
          </Typography>
          </Grid>
          </Grid>
        </div>
        
    </Container>

    </div>
  );
};

export default SampleData