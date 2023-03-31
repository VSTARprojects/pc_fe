import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
 
  title: {
    color: '#0275d8',
    marginBottom: theme.spacing(2),
    fontWeight:'bold',
    marginTop:"75px",
    paddingLeft:"30px"
 
  },
  subtitle: {
    color: '#0275d8',
    marginBottom: theme.spacing(4),
    paddingLeft:"30px"
  },
  button: {
    backgroundColor: '#0275d8',
    marginTop: theme.spacing(4),
  },
  body: {
    paddingLeft:"30px",
    marginBottom: theme.spacing(1),
    display: "block",
    marginLeft:"30px",
    color: "grey"

  }
}));

const Home = () => {
  const classes = useStyles();

  return (
      <Grid item xs direction="row" container spacing={2} sx={{marginLeft:"60px",marginRight:"50px", mt:3,width:"95%",}} >
      <Grid item xs={6}>
      <Typography variant="h4" className={classes.title}>
        Empowering Health Decisions with ML
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Get personalized health predictions with just a few clicks
      </Typography>
    
      <Typography variant="" className={classes.body}>
        Perform diagnosis for samples using the ML model 
      </Typography>

      <Typography variant="body3" className={classes.body}>
        View patient samples with their details
      </Typography>
      
      <Typography variant="body3" className={classes.body}>
        Share samples with the other pathologists
      </Typography>

      <div style={{paddingLeft:"30px"}}>
        <Button variant="contained" className={classes.button}>
        <Link to="/predict" style={{textDecoration:'none', color:"white"}}>
           PREDICT
        </Link>
      </Button>
      </div>
      </Grid>
      <Grid item xs={6}>
        <img
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS127ZWIqXSVQJ3jCBKoD8UJv6wen9jLkRZAQ&usqp=CAU"
           alr="image"
           width="60%"
           height="60%"
           style={{marginLeft:"70px", marginTop:"40px"}}
        />
      </Grid>
      </Grid>
  );
};

export default Home;
 