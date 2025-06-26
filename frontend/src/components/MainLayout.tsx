
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: '250px',
          width: 'calc(100% - 250px)',
          minHeight: '100vh',
          backgroundColor: '#121212',
          color: 'white',
          p: 3
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
