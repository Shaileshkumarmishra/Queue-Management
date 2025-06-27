import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, FormControlLabel, Paper, Checkbox, Grid, Snackbar, Alert } from '@mui/material';

const SettingsPage = ({ username, profilePicUrl }) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : '';
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSaveChanges = () => {
    // Logic to save changes
    // For now, we simulate a successful save
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', padding: '30px' }}>
      {/* Profile section */}
      <Box display="flex" alignItems="center" marginBottom="30px">
        <Avatar 
          sx={{ marginRight: '20px', width: 90, height: 90, fontSize: '2rem', bgcolor: 'primary.main' }} 
          src={profilePicUrl || ''}
        >
          {!profilePicUrl && firstLetter}
        </Avatar>
        <Typography variant="h4" fontWeight="bold">{username}</Typography>
      </Box>

      {/* System Settings section */}
      <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>System Settings</Typography>

      {/* Camera Configuration */}
      <Paper elevation={4} sx={{ padding: '25px', marginBottom: '25px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: '600' }}>Camera Configuration</Typography>
        <FormControlLabel 
          control={<Checkbox color="primary" />} 
          label="Enable Camera Selection" 
          sx={{ display: 'block', marginBottom: '10px' }}
        />
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem' }}>
          Select your preferred camera from the available devices.
        </Typography>
      </Paper>

      {/* AI Detection Settings */}
      <Paper elevation={4} sx={{ padding: '25px', marginBottom: '25px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: '600' }}>AI Detection Settings</Typography>
        <FormControlLabel 
          control={<Checkbox color="primary" />} 
          label="Enable Queue Detection" 
          sx={{ display: 'block', marginBottom: '10px' }}
        />
        <FormControlLabel 
          control={<Checkbox color="primary" />} 
          label="Enable Service Time Monitoring" 
          sx={{ display: 'block', marginBottom: '10px' }}
        />
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem' }}>
          Enable AI features for advanced monitoring.
        </Typography>
      </Paper>

      {/* Notification Settings */}
      <Paper elevation={4} sx={{ padding: '25px', marginBottom: '25px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: '600' }}>Notification Settings</Typography>
        <FormControlLabel 
          control={<Checkbox color="primary" />} 
          label="Queue Length Alerts" 
          sx={{ display: 'block', marginBottom: '10px' }}
        />
        <FormControlLabel 
          control={<Checkbox color="primary" />} 
          label="Service Time Alerts" 
          sx={{ display: 'block', marginBottom: '10px' }}
        />
        <FormControlLabel 
          control={<Checkbox color="primary" />} 
          label="System Status Updates" 
          sx={{ display: 'block', marginBottom: '10px' }}
        />
        <TextField 
          label="Alert Recipients (Emails)" 
          variant="outlined" 
          fullWidth 
          sx={{ marginTop: '10px' }} 
        />
      </Paper>

      {/* Password Change section */}
      <Paper elevation={4} sx={{ padding: '25px', marginBottom: '30px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: '600' }}>Change Password</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="New Password" 
              variant="outlined" 
              fullWidth 
              sx={{ marginBottom: '15px' }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Confirm New Password" 
              variant="outlined" 
              fullWidth 
              sx={{ marginBottom: '15px' }} 
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem' }} onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Paper>

      {/* Snackbar for success message */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Changes saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
