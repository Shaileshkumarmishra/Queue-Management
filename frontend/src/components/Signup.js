import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, username, password });
      console.log('Signup response:', response.data);
      onSignup(); // Switch to login after successful signup
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Signup error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Error during sign up');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '80%' }}>
      <div style={{ maxWidth: '350px', background: '#f8f9fd', padding: '25px 35px', borderRadius: '40px', boxShadow: '0px 30px 30px -20px rgba(133, 189, 215, 0.878)', margin: '20px', width: '100%' }}>
        <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '30px', color: 'rgb(16, 137, 211)' }}>Sign Up</div>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input
            required
            style={{ width: '100%', padding: '15px 20px', borderRadius: '20px', marginTop: '15px', border: 'none', boxShadow: '#cff0ff 0px 10px 10px -5px' }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            style={{ width: '100%', padding: '15px 20px', borderRadius: '20px', marginTop: '15px', border: 'none', boxShadow: '#cff0ff 0px 10px 10px -5px' }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            style={{ width: '100%', padding: '15px 20px', borderRadius: '20px', marginTop: '15px', border: 'none', boxShadow: '#cff0ff 0px 10px 10px -5px' }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
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
            value="Sign Up"
          />
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>Already have an account? </span>
          <button
            style={{
              background: 'transparent',
              color: 'rgb(16, 137, 211)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
