import React, { useState } from 'react';
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  TextField,
  Paper,
  Grow,
  Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: string;
  time: string;
}

interface User {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  messages: Message[];
}

const dummyUsers: User[] = [
  {
    id: 1,
    name: 'user_001',
    message: 'Hey, how are you?',
    time: '10:15 AM',
    avatar: 'https://i.pravatar.cc/150?img=5',
    messages: [
      { id: 1, text: 'Hey, how are you?', sender: 'user_001', time: '10:15 AM' },
      { id: 2, text: 'Doing good! What about you?', sender: 'me', time: '10:16 AM' },
      { id: 3, text: 'Same here, working on dashboard design.', sender: 'user_001', time: '10:17 AM' },
    ],
  },
  {
    id: 2,
    name: 'user_002',
    message: 'Your account is ready!',
    time: '09:00 AM',
    avatar: 'https://i.pravatar.cc/150?img=15',
    messages: [],
  },
];

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() && selectedUser) {
      const newMsg: Message = {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const updatedUser: User = {
        ...selectedUser,
        messages: [...selectedUser.messages, newMsg],
      };
      setSelectedUser(updatedUser);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#0f172a' }}>
      {!selectedUser && (
        <Box sx={{ width: 350, bgcolor: '#1e293b', color: '#fff', p: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Conversations
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: '#334155' }} />
          <List>
            {dummyUsers.map((user) => (
              <ListItem
                key={user.id}
                alignItems="flex-start"
                onClick={() => setSelectedUser({ ...user })}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  mb: 2,
                  px: 2.5,
                  py: 1.5,
                  transition: '0.3s',
                  bgcolor: (selectedUser as User | null)?.id === user.id ? '#334155' : 'inherit',
                  '&:hover': { bgcolor: '#475569' },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography fontWeight={600}>{user.name}</Typography>}
                  secondary={<Typography variant="caption" color="gray">{user.message}</Typography>}
                />
                <Typography variant="caption" sx={{ color: '#94a3b8', ml: 1 }}>
                  {user.time}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Grow in={!!selectedUser}>
        <Box
          sx={{
            flex: 1,
            maxWidth: '1000px',
            width: '100%',
            bgcolor: '#1e1e2f',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid #334155',
            px: 5,
            py: 4,
            mx: 'auto',
          }}
        >
          {selectedUser ? (
            <>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => setSelectedUser(null)}>
                  <ArrowBackIcon sx={{ color: '#fff' }} />
                </IconButton>
                <Avatar src={selectedUser.avatar} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                    {selectedUser.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                    Online
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  pb: 3,
                }}
              >
                {selectedUser.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                      backgroundColor: msg.sender === 'me' ? '#10b981' : '#334155',
                      color: '#fff',
                      padding: '12px 16px',
                      borderRadius: 18,
                      maxWidth: '75%',
                      boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography variant="caption" sx={{ fontSize: '10px', color: '#d1d5db' }}>
                      {msg.time}
                    </Typography>
                  </motion.div>
                ))}
              </Box>

              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 6,
                  px: 3,
                  py: 2,
                  mt: 2,
                  bgcolor: '#2c2f48',
                }}
                elevation={4}
              >
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="standard"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  InputProps={{ disableUnderline: true, style: { color: '#fff' } }}
                />
                <IconButton onClick={handleSend}>
                  <SendIcon sx={{ color: '#3b82f6' }} />
                </IconButton>
              </Paper>
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#9ca3af',
              }}
            >
              <Typography variant="h6">Select a chat to start messaging</Typography>
            </Box>
          )}
        </Box>
      </Grow>
    </Box>
  );
};

export default Messages;
