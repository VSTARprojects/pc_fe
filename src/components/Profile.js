import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "50px",
    marginTop: "30px",
    padding: theme.spacing(4),
    maxWidth: 600,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  name: {
    fontWeight: 'bold',
  },

}));

function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Avatar
            alt="User avatar"
            src="https://picsum.photos/200"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" className={classes.name}>
            John Doe
          </Typography>
          <Typography variant="body2" style={{marginLeft:"5px"}}>Pathologist</Typography>
          
          <Typography variant="body1" style={{border:1, marginTop:"20px"}}>
            johndoe@gmail.com
          </Typography>
          
          
        </Grid>
      </Grid>
    </div>
  );
  }
  export default Profile;