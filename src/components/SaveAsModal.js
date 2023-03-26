import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

export default function SaveAsModal(props) {
  const [fileName, setFileName] = useState('');

  const handleFileNameChange = (event) => {
    const fileName = event.target.value
    setFileName(fileName);
  };

  const handleSave = () => {
    props.onSave(fileName);
    setFileName('');
  };

  const handleCancel = () => {
    props.onCancel();
    setFileName('');
  };

  return (
    <Dialog open={props.open} onClose={handleCancel} aria-labelledby="save-as-dialog-title">
      <DialogTitle id="save-as-dialog-title">Save As</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="File Name" value={fileName} onChange={handleFileNameChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" disabled={!fileName}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
