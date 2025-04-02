// src/components/Feedback.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle feedback submission (e.g., send to API)
    console.log(feedback);
  };

  return (
    <Box mt={3}>
      <TextField
        label="Your Feedback"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit Feedback
      </Button>
    </Box>
  );
};

export default Feedback;
