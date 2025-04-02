// src/components/AttendanceFilters.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AttendanceFilters = ({ onApply }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    onApply({ startDate, endDate });
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <TextField
        label="Start Date"
        type="date"
        variant="outlined"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ width: '48%', mr: 1 }}
      />
      <TextField
        label="End Date"
        type="date"
        variant="outlined"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ width: '48%', ml: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleApply} sx={{ ml: 1 }}>
        Apply Filter
      </Button>
    </Box>
  );
};

export default AttendanceFilters;
