import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Box, Button, Avatar, CssBaseline, AppBar, Toolbar, Typography, Container, Menu, MenuItem, IconButton } from '@mui/material';
import axios from 'axios';
import { Dashboard as DashboardIcon, Queue as QueueIcon, Feedback as FeedbackIcon, BarChart as AnalyticsIcon, DashboardOutlined as RealTimeIcon, Settings as SettingsIcon, ExitToApp as LogoutIcon, AccountCircle as LoginIcon } from '@mui/icons-material';
import Dashboard from './components/Dashboard';
import QueueManagement from './components/QueueManagement';
import Analytics from './components/Analytics';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import SettingsPage from './components/SettingsPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfileCard from './components/ProfileCard';
import QueueDashboard from './components/QueueDashboard';
import StickyHeader from './components/header'; // Imported your new header
import FeedbackForm from './components/form'; // Imported your new feedback form
import Submissions from './components/submissions'; // Imported your new submissions component
import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // Token and counter management
  const [tokenCount, setTokenCount] = useState(1);
  const [counters, setCounters] = useState([[]]);

  const navigate = useNavigate();

  // Dropdown menu open/close handling
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout handling
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername('');
    setIsLoggedIn(false);
    navigate('/login');
    handleMenuClose();
  };

  // Handle token issue (counter management)
  const handleIssueToken = () => {
    let newToken = tokenCount;
    
    setCounters((prevCounters) => {
      let updatedCounters = [...prevCounters];
      let lastCounterIndex = updatedCounters.length - 1;

      if (updatedCounters[lastCounterIndex].length >= 15) {
        updatedCounters.push([]);
        lastCounterIndex += 1;
      }

      updatedCounters[lastCounterIndex].push(newToken);

      return updatedCounters;
    });

    setTokenCount((prev) => prev + 1);
  };

  // Fetch profile data (Auto-login and authentication)
  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUsername(response.data.username);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  // Handle login logic
  const handleLogin = (username, token) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUsername(response.data.username);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex' }}>
      <CssBaseline />

      {/* App Bar / Header */}
      <AppBar position="fixed" style={{ backgroundColor: '#00008B' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Post Office Service Monitoring Dashboard
          </Typography>
          {isLoggedIn && (
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleMenuOpen} style={{ padding: 0 }}>
                <Avatar style={{ marginRight: '20px', cursor: 'pointer' }} />
              </IconButton>
              <Typography variant="body1" style={{ cursor: 'pointer' }} onClick={handleMenuOpen}>
                {username}
              </Typography>

              {/* Feedback Icon */}
              <IconButton onClick={() => navigate('/submissions')} style={{ padding: 0, marginLeft: '20px' }}>
                <FeedbackIcon style={{ color: 'white' }} />
              </IconButton>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <ProfileCard username={username} />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Button variant="contained" color="secondary" startIcon={<LogoutIcon />}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          )}
          {!isLoggedIn && (
            <Button color="inherit" onClick={() => navigate('/login')} startIcon={<LoginIcon />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar (Full height on left side) */}
      {isLoggedIn && (
        <Box
          sx={{
            width: '250px',
            height: '100vh',
            backgroundColor: '#00008B',
            padding: '20px',
            position: 'fixed',
            top: '64px',
            left: 0,
            boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            color: 'white',
          }}
        >
          <Button onClick={() => navigate('/')} variant="text" startIcon={<DashboardIcon />} sx={{ marginBottom: '20px', color: 'white' }}>
            Dashboard
          </Button>
          <Button onClick={() => navigate('/queue')} variant="text" startIcon={<QueueIcon />} sx={{ marginBottom: '20px', color: 'white' }}>
            Queue Management
          </Button>
          <Button onClick={() => navigate('/analytics')} variant="text" startIcon={<AnalyticsIcon />} sx={{ marginBottom: '20px', color: 'white' }}>
            Analytics
          </Button>
          <Button onClick={() => navigate('/real-time')} variant="text" startIcon={<RealTimeIcon />} sx={{ marginBottom: '20px', color: 'white' }}>
            Real-Time Monitoring
          </Button>
          <Button onClick={() => navigate('/settings')} variant="text" startIcon={<SettingsIcon />} sx={{ marginBottom: '20px', color: 'white' }}>
            Settings
          </Button>
          {/* Feedback Menu Item */}
          <Button onClick={() => navigate('/feedback')} variant="text" startIcon={<FeedbackIcon />} sx={{ marginBottom: '20px', color: 'white' }}>
            Feedback
          </Button>
        </Box>
      )}

      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '250px',
          marginTop: '70px',
          paddingLeft: '20px',
        }}
      >
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/queue" element={isLoggedIn ? <QueueDashboard tokenCount={tokenCount} counters={counters} handleIssueToken={handleIssueToken} /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/login" />} />
            <Route path="/real-time" element={isLoggedIn ? <RealTimeMonitoring /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLoggedIn ? <SettingsPage /> : <Navigate to="/login" />} />
            <Route path="/feedback" element={isLoggedIn ? <FeedbackForm /> : <Navigate to="/login" />} />
            <Route path="/submissions" element={isLoggedIn ? <Submissions /> : <Navigate to="/login" />} />
            <Route path="/submission/:id" element={isLoggedIn ? <Submissions /> : <Navigate to="/login" />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          </Routes>
        </Container>
      </Box>
    </div>
  );
}

export default App;
