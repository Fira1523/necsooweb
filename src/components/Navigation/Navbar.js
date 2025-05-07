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
  Container,
  Menu,
  MenuItem,
  Typography,
  Collapse
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom'; 
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  const aboutMenuItems = [
    { text: 'Background History', path: '/about/history' },
    { text: 'Vision, Mission & Values', path: '/about/vision' },
    { text: 'Organizational Objectives & Engagement Areas', path: '/about/objectives' },
    { text: 'Governance Structure, Members & Membership Criteria', path: '/about/governance' },
  ];

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Gallery', path: '/gallery' },
    { text: 'Portfolio', path: '/portfolio' },
    { text: 'Blog', path: '/blog' },
    { text: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAboutMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAboutMenuClose = () => {
    setAnchorEl(null);
  };

  const DonateButton = () => (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<FavoriteIcon />}
      component={NavLink} 
      to="/donate" 
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
        <Toolbar 
          disableGutters 
          sx={{ 
            minHeight: { xs: '64px', md: '70px' },
            py: { xs: 0.5, md: 0.75 }
          }}
        >
          {/* Logo Section */}
          <Box sx={{ 
            flexGrow: 0, 
            display: 'flex', 
            alignItems: 'center',
            mr: { xs: 1, md: 3 }
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
                  height: '50px',
                  width: 'auto',
                  marginRight: '10px',
                  transition: 'transform 0.3s ease',
                }}
              />
              <Box
                component="span"
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  display: { xs: 'none', md: 'block' },
                  letterSpacing: '0.5px',
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
              gap: 1
            }}>
              <Button
                component={NavLink}
                to="/"
                sx={{
                  color: 'text.primary',
                  px: 1.5,
                  '&.active': {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Home
              </Button>
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleAboutMenuOpen}
                sx={{
                  color: 'text.primary',
                  px: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                About
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAboutMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'about-button',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    minWidth: 220,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {aboutMenuItems.map((item) => (
                  <MenuItem
                    key={item.text}
                    component={NavLink}
                    to={item.path}
                    onClick={handleAboutMenuClose}
                    sx={{
                      py: 1,
                      '&.active': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
              {menuItems.slice(1).map((item) => (
                <Button
                  key={item.text}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: 'text.primary',
                    px: 1.5,
                    '&.active': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
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
            <Box sx={{ flexGrow: 0 }}>
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
                color: 'text.primary',
              }}
            >
              <MenuIcon /> 
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
            width: 260,
            pt: 1,
          }
        }}
      >
        <Box
          sx={{ width: 260 }}
          role="presentation"
        >
          <List>
            <ListItem 
              button 
              component={NavLink}
              to="/"
              onClick={handleDrawerToggle}
              sx={{
                py: 1,
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  '& .MuiListItemText-primary': {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemText primary="Home" />
            </ListItem>
            {/* About section with collapse */}
            <ListItem 
              button 
              onClick={() => setAboutOpen(!aboutOpen)}
              sx={{
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemText 
                primary="About"
                sx={{ 
                  '& .MuiTypography-root': {
                    color: aboutOpen ? theme.palette.primary.main : 'inherit',
                    fontWeight: aboutOpen ? 600 : 'inherit',
                  }
                }} 
              />
              {aboutOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={aboutOpen} timeout="auto" unmountOnClose>
              <List component="div" disablePadding>
                {aboutMenuItems.map((item) => (
                  <ListItem 
                    button 
                    component={NavLink}
                    to={item.path} 
                    key={item.text}
                    onClick={handleDrawerToggle}
                    sx={{
                      pl: 3,
                      py: 0.75,
                      '&.active': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        '& .MuiListItemText-primary': {
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        },
                      },
                    }}
                  >
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        style: { 
                          fontSize: '0.9rem',
                          fontWeight: 'inherit',
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            {menuItems.slice(1).map((item) => (
              <ListItem 
                button 
                component={NavLink}
                to={item.path} 
                key={item.text}
                onClick={handleDrawerToggle}
                sx={{
                  py: 1,
                  '&.active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem sx={{ justifyContent: 'center', mt: 1, mb: 1 }}>
              <DonateButton />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
