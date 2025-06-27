import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Grid, Paper, Snackbar, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Custom styled components
const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  backgroundColor: theme?.palette?.background?.paper || '#fff', // Fallback color
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)',
  },
}));

const Dashboard = () => {
  const [currentQueue, setCurrentQueue] = useState([]); 
  const [waitTimeData, setWaitTimeData] = useState([]);
  const [avgWaitTime, setAvgWaitTime] = useState(0);
  const [fullCounterMessage, setFullCounterMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Calculate the average wait time safely
  const calculateAvgWaitTime = () => {
    if (!Array.isArray(currentQueue)) return 0;
    return Math.max(5, Math.round(currentQueue.length * 2)); 
  };

  // Update wait time data
  useEffect(() => {
    const newAvgWaitTime = calculateAvgWaitTime();
    setAvgWaitTime(newAvgWaitTime);

    const updatedWaitTimeData = Array.from({ length: 12 }, (_, index) => ({
      time: `${(index + 8).toString().padStart(2, '0')}:00`,
      waitTime: newAvgWaitTime + Math.floor(Math.random() * 5),
    }));
    setWaitTimeData(updatedWaitTimeData);
  }, [currentQueue.length]);

  // Post office queue services breakdown (randomized data)
  const getQueueStatus = () => {
    const services = {
      mailPickup: Math.floor(Math.random() * 10),
      packageDropOff: Math.floor(Math.random() * 10),
      billPayment: Math.floor(Math.random() * 5),
      passportIDServices: Math.floor(Math.random() * 3),
      postalInquiry: Math.floor(Math.random() * 4),
    };

    const total = Object.values(services).reduce((sum, val) => sum + val, 0);
    return { services, total };
  };

  const { services, total } = getQueueStatus();

  return (
    <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'linear-gradient(135deg, #f0f4f8, #e3f2fd)' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '24px' }}>
        Post Office Monitor
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Current Queue</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '8px 0' }}>
              {total}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={Math.min((total / 50) * 100, 100)} 
              sx={{ margin: '10px 0' }} 
            />
            <Typography variant="body2" color="textSecondary">
              ↔ {total > 0 ? `${Math.round(((total - 1) / total) * 100)}%` : "No data"}
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Avg. Wait Time</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '8px 0' }}>
              {avgWaitTime} min
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ↔ {avgWaitTime - 2} min increase
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Service Completion</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '8px 0' }}>
              94%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Within time standards
            </Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Active Clients (Only Show if Queue > 0) */}
      {total > 0 && (
        <Box sx={{ marginBottom: '24px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Active Clients
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(services).map((service) => (
              <Grid item xs={6} md={3} key={service}>
                <StatCard>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {service.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '8px 0' }}>
                    {services[service]}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min((services[service] / 10) * 100, 100)} 
                    sx={{ margin: '10px 0' }} 
                  />
                </StatCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Wait Time Trend */}
      <Box sx={{ marginBottom: '24px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Wait Time Trend
        </Typography>
        <Paper sx={{ padding: '16px', borderRadius: '12px', height: '300px', background: '#ffffff' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={waitTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="waitTime" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Snackbar to show when a counter is full */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={fullCounterMessage}
      />
    </Box>
  );
};

export default Dashboard;
