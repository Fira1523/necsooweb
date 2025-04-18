import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // Logo blue
      light: '#64B5F6',
      dark: '#1976D2',
    },
    secondary: {
      main: '#4CAF50', // Logo green accent
    },
    error: {
      main: '#E53935', // Logo red accent
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
});

export default theme; 