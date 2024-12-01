'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Home() {
  const handleSubmit = (event) => {
    console.log("Handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let pass = data.get('pass');
    console.log("Sent email:", email);
    console.log("Sent pass:", pass);
    runDBCallAsync(`http://localhost:3000/api/newregister?email=${email}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.data === "valid") {
      console.log("Registration successful!");
    } else {
      console.log("Registration failed");
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
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
            name="pass"
            label="Pass"
            type="pass"
            id="pass"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
