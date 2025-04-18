import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Add responsive typography settings after theme creation
theme.typography = {
  ...theme.typography,
  h2: {
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
    },
  },
  h5: {
    fontWeight: 500,
  },
};

export default theme; 