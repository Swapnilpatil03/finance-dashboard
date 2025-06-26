import React from 'react';
import { Box, InputBase, Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Topbar: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: '#25262B',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >

      <Box display="flex" alignItems="center" bgcolor="#1C1D21" borderRadius={2} px={2}>
        <SearchIcon sx={{ color: '#9E9E9E' }} />
        <InputBase
          placeholder="Search..."
          sx={{ ml: 1, color: '#fff', fontSize: 14 }}
        />
      </Box>

    
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton>
          <NotificationsNoneIcon sx={{ color: '#9E9E9E' }} />
        </IconButton>
        <Avatar src="https://thispersondoesnotexist.com/" sx={{ width: 36, height: 36 }} />
      </Box>
    </Box>
  );
};

export default Topbar;
