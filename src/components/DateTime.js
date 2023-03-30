import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

export default function DateTime() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      Collection Date: <br/><DatePicker />
      <TextField
        label="Wooooo it works"
        InputLabelProps={{
            shrink: true
        }}
        />

    </LocalizationProvider>
  );
}
