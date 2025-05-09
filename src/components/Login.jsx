import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(auth.currentUser);
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onLogin(auth.currentUser);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <Paper elevation={4} sx={{ padding: 4, width: 400, backgroundColor: 'white' }}>
        <Typography variant="h5" mb={2}>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="primary"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>

          <Button variant="text" onClick={() => setIsRegistering((prev) => !prev)}>
            {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;



