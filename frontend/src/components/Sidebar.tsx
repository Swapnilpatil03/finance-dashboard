import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';

const PentaLogo = () => (
  <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M21.6016 5.17785H10.0906V0.294373L26.4851 0.294373V16.6889H21.6016V5.17785Z" fill="#FFC01E"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.6101 14.8951C11.8643 14.3968 10.9876 14.1309 10.0907 14.1309V9.24741C11.9535 9.24741 13.7744 9.79977 15.3232 10.8346C16.872 11.8695 18.0791 13.3404 18.792 15.0614C19.5048 16.7823 19.6913 18.676 19.3279 20.5029C18.9645 22.3299 18.0675 24.008 16.7504 25.3252C15.4332 26.6423 13.7551 27.5393 11.9281 27.9027C10.1012 28.2661 8.20751 28.0796 6.48657 27.3668C4.76563 26.6539 3.29472 25.4468 2.25984 23.898C1.22496 22.3492 0.672604 20.5283 0.672607 18.6655L5.55609 18.6655C5.55608 19.5624 5.82204 20.4391 6.32031 21.1849C6.81858 21.9306 7.5268 22.5118 8.3554 22.855C9.184 23.1982 10.0958 23.288 10.9754 23.1131C11.855 22.9381 12.663 22.5062 13.2972 21.872C13.9314 21.2379 14.3633 20.4299 14.5383 19.5502C14.7132 18.6706 14.6234 17.7588 14.2802 16.9302C13.937 16.1016 13.3558 15.3934 12.6101 14.8951Z" fill="#1FCB4F"/>
  </svg>
);

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Transactions', icon: <CreditCardIcon />, path: '/transactions' },
  { text: 'Wallet', icon: <AccountBalanceWalletIcon />, path: '/wallet' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Personal', icon: <PersonIcon />, path: '/profile' },
  { text: 'Message', icon: <MessageIcon />, path: '/messages' },
  { text: 'Setting', icon: <SettingsIcon />, path: '/settings' }
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 250,
        height: '100vh',
        background: '#1A1C22',
        color: 'white',
        px: 2,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        boxShadow: '2px 0 5px rgba(0,0,0,0.2)'
      }}
    >
      <Box display="flex" alignItems="center" gap={1.5} mb={4}>
        <PentaLogo />
        <Typography variant="h6" fontWeight="bold">
          Penta
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              mb: 1,
              px: 2,
              py: 1.5,
              borderRadius: 2,
              color: 'white',
              textDecoration: 'none',
              '&.active': {
                backgroundColor: '#1e1e2f',
                color:'#1FCB4F'
              },
              '&:hover': {
                backgroundColor: '#2a2d3e',
                color:'#1FCB4F'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 32 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}

        <ListItemButton
          onClick={handleLogout}
          sx={{
            mt: 2,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            color: 'white',
            '&:hover': {
              backgroundColor: '#2a2d3e',
              color: '#1FCB4F'
            }
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 32 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      <Box mt={3}>
        <Divider sx={{ bgcolor: '#333', my: 2 }} />
        <Typography variant="caption" color="gray" align="center" display="block">
          © 2025 Penta Inc.
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
