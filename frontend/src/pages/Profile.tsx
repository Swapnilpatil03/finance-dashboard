import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Card, CardContent, Divider, TextField, Button, InputAdornment
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    id: 'user_001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2024-01-01',
    avatar: 'https://thispersondoesnotexist.com/',
    totalTransactions: 300,
    income: 546408.25,
    expenses: 128000.75
  });

  const [editUser, setEditUser] = useState({ ...user });
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });

  const handleProfileChange = (field: string, value: string) => {
    setEditUser({ ...editUser, [field]: value });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords({ ...passwords, [field]: value });
  };

  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Profile</Typography>

      <Card sx={{ bgcolor: '#1E1E2F', p: 3, borderRadius: 2, mb: 4 }}>
        {/* Profile Overview */}
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

        {/* Edit Form */}
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
          <Button variant="contained" color="success" sx={{ mt: 2, alignSelf: 'flex-start' }}>
            Save Changes
          </Button>
        </Box>
      </Card>

      {/* Password Update Section */}
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
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Password
          </Button>
        </Box>
      </Card>

      {/* Activity History */}
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
