import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width:"50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    margin: "auto",
    marginBottom: "1rem",
    backgroundColor: "#f7f7f7",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  formInput: {
    marginBottom: theme.spacing(2),
    width: '50%',
  },
  formButton: {
    alignSelf: 'flex-end',
  },
  
  table: {
      margin: 'auto',
    marginBottom: '5rem',
    
    width: '80%',
    
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
    head: {
    backgroundColor: '#fafafa',
  },
  cell: {
    padding: '16px',
  },
}));

function YourComment({ data }) {
    
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState(data.comment);
  const [checkboxValue, setCheckboxValue] = useState( data.value);


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      setCheckboxValue('false');
    // submit the comment and do any necessary processing here
  };

  return (
    <div>
      {checkboxValue ? (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <TextField
            className={classes.formInput}
            label="Comment"
            value={comment}
            onChange={handleCommentChange}
            multiline
          />
          <Button className={classes.formButton} variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.cell}>{comment }</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default YourComment;
