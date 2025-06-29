import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Avatar, Card, CardContent, Divider,
  TextField, Button, InputAdornment, CircularProgress
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [editUser, setEditUser] = useState<any>(null);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(true);

 const fetchProfile = async () => {
  try {
    console.log("📡 Fetching profile...");

    const res = await axios.get('https://finance-dashboard-zdik.onrender.com/user/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    console.log("✅ Fetched profile data:", res.data);

    setUser(res.data);
    setEditUser(res.data);
  } catch (err: any) {
    console.error('❌ Failed to fetch profile:', err.response?.data || err.message);
  } finally {
    setLoading(false); // ⬅️ CRUCIAL: Ensure this runs even on error
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setEditUser({ ...editUser, [field]: value });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords({ ...passwords, [field]: value });
  };

const handleSaveChanges = async () => {
  try {
    console.log('📤 Sending to /user/profile:', editUser);

    const res = await axios.put('https://finance-dashboard-zdik.onrender.com/user/profile', editUser, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

    setUser(res.data);
    alert('Profile updated successfully');
  } catch (err: any) {
    console.error('❌ Update failed:', err.response?.data || err.message);
    alert(`Failed to update profile: ${err.response?.data?.message || 'Unknown error'}`);
  }
};


  const handlePasswordUpdate = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords don't match");
      return;
    }

    try {
      await axios.put('https://finance-dashboard-zdik.onrender.com/user/update-password', passwords, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Password updated');
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err) {
      console.error('Password update failed:', err);
      alert('Failed to update password');
    }
  };

  if (loading || !editUser) return <Box p={4}><CircularProgress /></Box>;

  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Profile</Typography>

      <Card sx={{ bgcolor: '#1E1E2F', p: 3, borderRadius: 2, mb: 4 }}>
        <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
          <Avatar src={editUser.avatar} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography fontSize={20} fontWeight={600}>{editUser.name}</Typography>
            <Typography fontSize={14} color="gray">{editUser.email}</Typography>
            <Typography fontSize={14} color="gray">User ID: {editUser.id}</Typography>
            <Typography fontSize={14} color="gray">Joined: {editUser.joinDate}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3, bgcolor: '#2B2D3C' }} />

        <Typography fontWeight={500} mb={2}>Edit Profile</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Name"
            value={editUser.name}
            onChange={(e) => handleProfileChange('name', e.target.value)}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
            sx={{ bgcolor: '#2B2D3C', borderRadius: 1, input: { color: '#fff' } }}
          />
          <TextField
            label="Email"
            value={editUser.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
            sx={{ bgcolor: '#2B2D3C', borderRadius: 1, input: { color: '#fff' } }}
          />
          <TextField
            label="Avatar URL"
            value={editUser.avatar}
            onChange={(e) => handleProfileChange('avatar', e.target.value)}
            fullWidth
            sx={{ bgcolor: '#2B2D3C', borderRadius: 1, input: { color: '#fff' } }}
          />
          <Button variant="contained" color="success" sx={{ mt: 2, alignSelf: 'flex-start' }} onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Box>
      </Card>

      <Card sx={{ bgcolor: '#1E1E2F', p: 3, borderRadius: 2, mb: 4 }}>
        <Typography fontWeight={500} mb={2}>Change Password</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Old Password"
            type="password"
            value={passwords.old}
            onChange={(e) => handlePasswordChange('old', e.target.value)}
            fullWidth
            InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment> }}
            sx={{ bgcolor: '#2B2D3C', borderRadius: 1, input: { color: '#fff' } }}
          />
          <TextField
            label="New Password"
            type="password"
            value={passwords.new}
            onChange={(e) => handlePasswordChange('new', e.target.value)}
            fullWidth
            sx={{ bgcolor: '#2B2D3C', borderRadius: 1, input: { color: '#fff' } }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
            fullWidth
            sx={{ bgcolor: '#2B2D3C', borderRadius: 1, input: { color: '#fff' } }}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePasswordUpdate}>
            Update Password
          </Button>
        </Box>
      </Card>

      <Card sx={{ bgcolor: '#1E1E2F', p: 3, borderRadius: 2 }}>
        <Typography fontWeight={500} mb={2}><HistoryIcon sx={{ mr: 1 }} />Activity History</Typography>
        <Box pl={1}>
          <Typography fontSize={14}>🟢 Logged in on 2024-06-26 10:12 AM</Typography>
          <Typography fontSize={14}>🟢 Viewed Wallet on 2024-06-26 10:15 AM</Typography>
          <Typography fontSize={14}>🔴 Updated profile info</Typography>
          <Typography fontSize={14}>🟢 Downloaded transaction CSV</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Profile;
