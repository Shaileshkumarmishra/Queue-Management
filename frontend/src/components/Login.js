import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  // Local state for email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigating programmatically

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Make a POST request to the backend login API
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      
      // Store token, username, and role in localStorage for persistence
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role); // Store the user's role

      // Call onLogin prop to notify parent component about the logged-in user
      onLogin(response.data.username);

      // Redirect the user to the home page (or a dashboard page)
      navigate('/'); // Can change to another page if required
    } catch (err) {
      // Handle errors, like invalid credentials or server issues
      setError(err.response ? err.response.data.message : 'An error occurred during login');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '80%' }}>
      <div style={{ maxWidth: '350px', background: '#f8f9fd', padding: '25px 35px', borderRadius: '40px', boxShadow: '0px 30px 30px -20px rgba(133, 189, 215, 0.878)', margin: '20px', width: '100%' }}>
        <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '30px', color: 'rgb(16, 137, 211)' }}>Sign In</div>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          {/* Email input */}
          <input
            required
            style={{ width: '100%', padding: '15px 20px', borderRadius: '20px', marginTop: '15px', border: 'none', boxShadow: '#cff0ff 0px 10px 10px -5px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password input */}
          <input
            required
            style={{ width: '100%', padding: '15px 20px', borderRadius: '20px', marginTop: '15px', border: 'none', boxShadow: '#cff0ff 0px 10px 10px -5px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {/* Display error message if any */}
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

          {/* Submit button */}
          <input
            style={{
              display: 'block',
              width: '100%',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%)',
              color: 'white',
              paddingBlock: '15px',
              margin: '20px auto',
              borderRadius: '20px',
              border: 'none',
              boxShadow: 'rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px',
              transition: 'all 0.2s ease-in-out',
            }}
            type="submit"
            value="Sign In"
          />
        </form>

        {/* Link to the sign-up page */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>Don't have an account? </span>
          <button
            style={{
              background: 'transparent',
              color: 'rgb(16, 137, 211)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/signup')} // Navigate to the sign-up page
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
