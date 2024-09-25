import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { 
  doSignInWithEmailAndPassword, 
  doCreateUserWithEmailAndPassword, 
  doSignInWithGoogle 
} from '../firebase/auth';
import { AuthContext }  from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); 

  // Handle login for existing users
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      // Update global login state
      setUser(userCredential.user);

      alert('Login successful!');
      navigate('/calendar'); 
    } catch (err) {
      console.log(err.message);
      setError("Login failed, try again!");
    }
  };

  // Handle sign up for new users
  const handleSignUp = async () => {
    setError('');
    
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      alert('Sign-up successful! Now Login with your credentials.');
    } 
      catch (err) {
      console.log(err.message);
      setError("Sign-up failed, try again later");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await doSignInWithGoogle();
      setUser(userCredential.user); // Store the user in context

      alert('Login with Google successful!');
      navigate('/calendar'); 
    } 
      catch (err) {
        console.log(err.message);
        setError("Sign in failed, try again later");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>

        {/* Sign Up Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>

        {/* Google Sign-In Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
