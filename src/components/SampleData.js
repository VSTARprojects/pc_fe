import React from 'react';
import { Container, Typography, Button, Box } from "@mui/material";
import {Link} from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import SampleListData from './SampleListData';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SampleService from '../services/SampleService';
import SampleDetail from './SampleDetail';
import CommentsTable from './CommentsTable';
import SharedCommentService from '../services/SharedCommentService';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import YourComment from './YourComment';

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
  const data = [
    { id: 1, username: 'Alice', comment: 'Lorem ipsum dolor sit amet' },
    { id: 2, username: 'Bob', comment: 'Consectetur adipiscing elit' },
    { id: 3, username: 'Charlie', comment: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }
  ];

  let commentData = { value: 'true', comment: '' };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    SampleService.predict_sample(id.id).then((response) => {
      const new_sample = response.data
      const curr_sample = sample
      curr_sample.predicted_label = new_sample.predicted_label
      setsample(curr_sample)
      setprediction(new_sample.predicted_label)
      setOpen(true)
    }).catch((error) => {
      alert("something went wrong while prediting.");
      console.log(error)
    })
  };
  const handleClose = () => setOpen(false);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => {
    setShareOpen(false);
    setUserName('');
    setMessage('');
  }
  const handleShare = () =>{
    const shared_commit = {
      "receiver": userName,
      "sender_comment": message,
      "status": "incomplete",
      "sample": id.id
    }
    SharedCommentService.set_shared_comment(shared_commit).then((response) => {
      console.log(response)
      handleShareClose();
    }).catch((e) => {
      console.log(e)
      handleShareClose();
      alert(e.response.data)
    })
    
  }
  const handleUserNameChange = (event) =>{
    const userName = event.target.value;
    console.log("username update")
    setUserName(userName);
  }
  const handleMessageChange = (event) =>{
    console.log(message)
    const t = event.target.value;
    console.log("message update", t)
    setMessage(t);
  }
  const [predOpen, setPredOpen] = React.useState(false);
  const handlePredOpen = () => {
    SampleService.predict_sample(id.id).then((response) => {
      const new_sample = response.data
      const curr_sample = sample
      curr_sample.predicted_label = new_sample.predicted_label
      setsample(curr_sample)
      setprediction(new_sample.predicted_label)
      setPredOpen(true)
    }).catch((error) => {
      alert("something went wrong while prediting.");
      console.log(error)
    })
  };
  const handlePredClose = () => setPredOpen(false);
  const [sample, setsample] = useState([]);
  const [comments, setcomments] = useState([]);
  const [prediction, setprediction] = useState("");
  const classes = useStyles();


  let id=useParams();
  const queryParameters = new URLSearchParams(window.location.search)
  const share_id = queryParameters.get("sid")
  const share_status = queryParameters.get("status")
  console.log("share_id", share_id)
  // const name = queryParameters.get("name")


    const fetchAll = async () => {
      await SampleService.getSample(id.id).then((response) => {
        const tsample = response.data
        SampleService.getPatient(tsample.patient).then((res) => {
          const tpatient = res.data
          console.log(tsample, tpatient)
          setsample({
            pid: tsample.patient,
            patientName: tpatient.name,
            phone_number: tpatient.phone_number,
            dob: tpatient.dob,
            sex: tpatient.sex,
            date_collected: tsample.date_collected,
            date_added: tsample.date_added,
            type: tsample.type,
            origin: tsample.origin,
            symptoms: tsample.symptoms,
            comments: tsample.comments,
            predicted_label: tsample.predicted_label,
            human_label: tsample.human_label,
          })
        }).catch((error) => {
            alert("Something went wrong while fetching patient details")
            console.log(error)
        })
      })
      .catch((error) => {
          alert("Something went wrong while fetching sample details")
          console.log(error)
      })


      await SharedCommentService.get_shared_comments_by_sample(id.id).then((response) => {
        // setcomments()
        
        const commentst = response.data
        console.log("yoooooo", commentst)
        const curr_comments = comments
        for(var ind in commentst) {
          const comment = commentst[ind]
          var present = false
          for(var i in comments) {
            if(comments[i].id == comment.id) {
              present = true
            }
          }
          console.log(comment.status, comment.id)
          if(!present && comment.status == "complete") {
            curr_comments.push({id: comment.id, username: comment.receiver, comment: comment.receiver_comment})
          }
        }         
        setcomments(curr_comments)
        console.log(response)
      }).catch((error) => {
        alert("Something went wrong while fetching shared comments")
        console.log(error)
      })
    }
   
    useEffect(() => {
      fetchAll()        
  }, [])

  
  useEffect(() => {
    console.log(reload)
  }, [reload])


  return (
    <div> 
    <Typography variant="h5" color="primary" style={{marginBottom:"20px", textAlign:"center", marginTop:"75px", fontWeight:"bold"}}>
        Sample Details
    </Typography>

    <Container sx={{ boxShadow: 4, p: 2, mt:3, width:"80%", mb:8}}>
      
        <Typography
          variant="h4"
          color="black"
          fontWeight={"bold"}
          marginBottom={"10px"}
        >
            {sample.patientName}         
          
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

            {sample.pid}

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
            {sample.sex}
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
            {sample.dob}
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
            {sample.phone_number}
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
            {sample.date_collected}
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
            Date Added&nbsp;
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
            {sample.date_added}
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
            {sample.type}
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
           {sample.origin}
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
           {sample.symptoms}
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
            {sample.comments}
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
            {sample.predicted_label}
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
            {sample.human_label}
          </Typography>
          </Grid>
          </Grid>
        </div>
        
    </Container>

    <hr/>

    <Typography variant="h5" color="primary" style={{marginBottom:"20px", textAlign:"center", marginTop:"50px", fontWeight:"bold"}}>
          Pathology Report
    </Typography>
    <Box sx={{m: 5}}>
        <SampleDetail id={id.id} />
    </Box>
    <Box textAlign='center'>
      <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ textTransform: "none" }}
          href=""
          target="_blank"
          sx={{mb:3, mt:4, mx:5, width: 400}}
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
              <h2 id="simple-modal-title">{prediction}</h2>
              <p id="simple-modal-description">
                Our model has predicted the given sample as: {prediction}
              </p>
             <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
          </div>
  
          </Modal>


          <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ textTransform: "none" }}
          href=""
          target="_blank"
          sx={{mb:3, mt:4, width: 400}}
          onClick={handleShareOpen}

        >
          SHARE
        </Button>

        <Dialog open={shareOpen} onClose={handleShareClose} aria-labelledby="save-as-dialog-title">
          <DialogTitle id="save-as-dialog-title">Share Sample</DialogTitle>
          <DialogContent>
            <TextField required autoFocus margin="dense" label="User Name" value={userName} onChange={handleUserNameChange} fullWidth />
          </DialogContent>
          <DialogContent>
            <TextField required autoFocus margin="dense" label="Message" value={message} onChange={handleMessageChange} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShareClose} color="secondary" style={{marginBottom:"30px"}}>
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={!userName || !message} color="primary" style={{marginBottom:"30px"}} >
              SHARE
            </Button>
          </DialogActions>
        </Dialog>

    </Box>
    <hr/> 
    <Typography variant="h5" color="prima ry" style={{marginBottom:"20px", textAlign:"center", marginTop:"50px", fontWeight:"bold"}}>
          Comments
    </Typography>
      <CommentsTable data={comments} />
    
      <YourComment data={commentData} reloadParent={(x) => setReload(x)} isParentReload={reload} addComment={(c)=>{setcomments([...comments, c])}} sample_id={id.id} sid={share_id} status={share_status}/>
    </div>


  );
};

export default SampleData