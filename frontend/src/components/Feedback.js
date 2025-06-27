import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Snackbar, Container, Grid, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [allFeedback, setAllFeedback] = useState([]);
  const [showFeedbackList, setShowFeedbackList] = useState(false); // To toggle visibility of feedback list

  // Handle feedback change
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle submit feedback
  const handleSubmit = async () => {
    if (feedback.trim()) {
      try {
        // Send feedback to API endpoint
        const response = await axios.post('/api/feedback', { feedback });

        if (response.status === 200) {
          setSnackbarMessage('Thank you for your feedback!');
          setOpenSnackbar(true);
          setFeedback('');
        }
      } catch (error) {
        setSnackbarMessage('Something went wrong. Please try again.');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage('Feedback cannot be empty.');
      setOpenSnackbar(true);
    }
  };

  // Fetch all feedback
  const fetchAllFeedback = async () => {
    try {
      const response = await axios.get('/api/feedback');

      if (response.status === 200 && response.data.length > 0) {
        setAllFeedback(response.data); // Assuming response.data contains an array of feedback
      } else {
        const randomFeedback = [
          { feedback: 'Great service! Will definitely return.' },
          { feedback: 'The experience was amazing, highly recommend!' },
          { feedback: 'Friendly staff and good atmosphere.' },
          { feedback: 'Good value for money. Could improve the waiting time.' },
          { feedback: 'It was okay, not the best but decent.' },
          { feedback: 'I had an amazing experience, 5 stars from me!' }
        ];
        setAllFeedback(randomFeedback);
      }

      setShowFeedbackList(true); // Show the feedback list after fetching
    } catch (error) {
      setSnackbarMessage('Failed to load feedback. Please try again.');
      setOpenSnackbar(true);

      // Simulate random feedback if API call fails
      const randomFeedback = [
        { feedback: 'Great service! Will definitely return.' },
        { feedback: 'The experience was amazing, highly recommend!' },
        { feedback: 'Friendly staff and good atmosphere.' },
        { feedback: 'Good value for money. Could improve the waiting time.' },
        { feedback: 'It was okay, not the best but decent.' },
        { feedback: 'I had an amazing experience, 5 stars from me!' }
      ];
      setAllFeedback(randomFeedback);
      setShowFeedbackList(true); // Show feedback list after failure too
    }
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Customer Feedback
      </Typography>

      <Card elevation={5} style={{ borderRadius: '12px' }}>
        <CardContent>
          <Typography variant="h5" component="div" align="center" gutterBottom>
            Share Your Feedback
          </Typography>

          <TextField
            label="Your Feedback"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={handleFeedbackChange}
            style={{ marginBottom: '20px' }}
            InputLabelProps={{
              style: { color: '#1976d2' }
            }}
          />

          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ padding: '10px 20px' }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={fetchAllFeedback}
                style={{ padding: '10px 20px' }}
              >
                View All Feedback
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {/* Display feedback list at the bottom when "View All Feedback" is clicked */}
      {showFeedbackList && (
        <div style={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            All Customer Feedback
          </Typography>
          <List>
            {allFeedback.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.feedback} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
};

export default Feedback;
