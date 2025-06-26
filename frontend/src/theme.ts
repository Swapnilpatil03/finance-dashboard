import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1C1D21',
      paper: '#25262B',
    },
    primary: {
      main: '#00C853', // green
    },
    secondary: {
      main: '#FFAB00', // orange
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9E9E9E',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default darkTheme;
