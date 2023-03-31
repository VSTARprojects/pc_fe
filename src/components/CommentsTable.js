import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';

const styles = {
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
};

const CommentsTable = ({ data, classes }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={`${classes.cell} ${classes.head}`}>Username</TableCell>
          <TableCell className={`${classes.cell} ${classes.head}`}>Comment</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, username, comment }) => (
          <TableRow key={id}>
            <TableCell className={classes.cell}>{username}</TableCell>
            <TableCell className={classes.cell}>{comment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(CommentsTable);
