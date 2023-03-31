import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

// Define some styles for the modal
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// Define the modal component
const MyModal = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  // Render the modal content
  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Modal Title</h2>
      <p id="simple-modal-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
      </p>
      <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
    </div>
  );

  return (
    <div>
      <Button
            variant="contained"
            color="error"
            size="large"
            style={{ textTransform: "none" }}
            href=""
            target="_blank"
            sx={{mb:3, mt:4}}
            onClick={handleOpen}


          >
            Predict
          </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
    </div>
  );
}

export default MyModal;
