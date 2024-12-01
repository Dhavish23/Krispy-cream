'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function Login() {
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log("Logging in with:");
    console.log("Email:", email);
    console.log("Password:", password);

    // Call the API
    try {
      const res = await fetch(`http://localhost:3000/api/login?email=${email}&password=${password}`);
      const data = await res.json();


      console.log(data.data)
      if (data.data == true) {
        console.log("Login successful!");
        router.push('/'); // Redirect to homepage
      } else {
        console.log("Invalid login credentials.");
        alert("Invalid login credentials.");
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
