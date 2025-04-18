import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom'; // Import NavLink
import FavoriteIcon from '@mui/icons-material/Favorite';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is small

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Gallery', path: '/gallery' },
    { text: 'Portfolio', path: '/portfolio' },
    { text: 'Blog', path: '/blog' },
    { text: 'Contact', path: '/contact' },
  ];

  // Toggle Drawer on mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Donate button component
  const DonateButton = () => (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<FavoriteIcon />}
      component={NavLink} // Ensure NavLink is used here
      to="/donate" // Ensure the path is correct
      sx={{
        borderRadius: '20px',
        px: 3,
        py: 1,
        textTransform: 'none',
        fontWeight: 600,
        backgroundColor: '#e74c3c',
        '&:hover': {
          backgroundColor: '#c0392b',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      Donate
    </Button>
  );

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          component={NavLink} // Use NavLink instead of Link
          to={item.path} 
          key={item.text}
          onClick={handleDrawerToggle}
          sx={{
            '&.active': {
              fontWeight: 'bold',
              color: theme.palette.primary.main, // Style for active link
            },
          }}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
        <DonateButton />
      </ListItem>
    </List>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo/Brand */}
          <Box sx={{ 
            flexGrow: 0, 
            display: 'flex', 
            alignItems: 'center', 
            ml: 2,
            padding: '8px'
          }}>
            <NavLink to="/" style={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none'
            }}>
              <img 
                src="/logo-necsoo.png" 
                alt="NeCSOO Logo" 
                style={{ 
                  height: '75px',
                  width: 'auto',
                  marginRight: '15px',
                  transition: 'all 0.3s ease',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
                  }
                }}
              />
              <Box
                component="span"
                sx={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  display: { xs: 'none', md: 'block' },
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                NeCSOO
              </Box>
            </NavLink>
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2 
            }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={NavLink} // Use NavLink instead of Link
                  to={item.path}
                  sx={{
                    color: 'text.primary',
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    // Active link styling with the 'active' class
                    '&.active': {
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Donate Button (Desktop) */}
          {!isMobile && (
            <Box sx={{ flexGrow: 0, ml: 2 }}>
              <DonateButton />
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu" 
              onClick={handleDrawerToggle}
              sx={{
                ml: 'auto',
                color: 'text.primary', // Set color of MenuIcon to match theme
              }}
            >
              <MenuIcon sx={{ color: '#333' }} /> {/* Set the color of MenuIcon */}
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
          }
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          {drawer}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
