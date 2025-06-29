import React from 'react';
import {
  Box, Typography, Card, Button, Divider, Switch, FormControlLabel
} from '@mui/material';
import axios from 'axios';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const handleLogoutAll = async () => {
    try {
      await axios.post(`http://localhost:5000/user/logout-all`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert("Logged out from all devices.");
    } catch (err) {
      alert("Logout all failed.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/user/delete`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      localStorage.clear();
      window.location.href = '/login';
    } catch (err) {
      alert("Failed to delete account.");
    }
  };

  const handleThemeToggle = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setDarkMode(!darkMode);
    window.location.reload(); // or trigger context update
  };

  const handleDownloadData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "user_profile_data.json";
      a.click();
    } catch (err) {
      alert("Failed to download data.");
    }
  };

  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Settings</Typography>

      <Card sx={{ bgcolor: '#1E1E2F', p: 3, borderRadius: 2, mb: 3 }}>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleThemeToggle} />}
          label="Dark Mode"
        />
      </Card>

      <Card sx={{ bgcolor: '#1E1E2F', p: 3, borderRadius: 2, mb: 3 }}>
        <Typography fontWeight={500} mb={2}>Security</Typography>
        <Button variant="contained" color="warning" onClick={handleLogoutAll}>Logout from all devices</Button>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="info" onClick={handleDownloadData}>Download My Data</Button>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="error" onClick={handleDeleteAccount}>Delete Account</Button>
      </Card>
    </Box>
  );
};

export default Settings;
