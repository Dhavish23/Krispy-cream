'use client';

import React, { useEffect, useState } from 'react';
import './AppBarStyles.css';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function MyApp() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showShop, setShowShop] = useState(false); // State to manage Shop visibility
  const [weatherData, setWeatherData] = useState(null); // State for weather data
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch weather data when the component mounts
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/getWeather'); // Call the backend API
        const data = await res.json();
        setWeatherData(data.temp); // Set the temperature in the state
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  function runShowLogin() {
    setShowFirstPage(false);
    setShowLogin(true);
    setShowDash(false);
    setShowRegister(false);
    setShowShop(false);
  }

  function runShowDash() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true);
    setShowRegister(false);
    setShowShop(false);
  }

  function runShowFirst() {
    setShowFirstPage(true);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowShop(false);
  }

  function runShowRegister() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(true);
    setShowShop(false);
  }

  function runShowShop() {
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(false);
    setShowRegister(false);
    setShowShop(true);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="AppBar">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className="Typography">
            Krispy Kreme
          </Typography>
          <Button color="inherit" onClick={runShowFirst} className="Button">
            Home
          </Button>
          <Button color="inherit">
            <Link href="newlogin" className="Button">
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="dashboard" className="Button">
              Dashboard
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="register" className="Button">
              Register
            </Link>
          </Button>
          <Button color="inherit" onClick={runShowShop} className="Button">
            Shop
          </Button>
        </Toolbar>
      </AppBar>

      {showFirstPage && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography variant="h5">Welcome to the homepage of my Krispy Kreme Website!</Typography>
          {loading ? (
            <Typography>Loading weather data...</Typography>
          ) : weatherData ? (
            <Typography>Current Temperature: {weatherData}°C</Typography>
          ) : (
            <Typography>Failed to load weather data.</Typography>
          )}
        </Box>
      )}

      {showLogin && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography>This is the login page.</Typography>
        </Box>
      )}

      {showDash && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography>This is the dashboard.</Typography>
        </Box>
      )}

      {showRegister && (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Typography>This is the register page.</Typography>
        </Box>
      )}

      {showShop && (
        <Box component="section" sx={{ p: 2 }}>
          
        </Box>
      )}
    </Box>
  );
}
