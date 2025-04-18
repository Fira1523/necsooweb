import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderIcon from '@mui/icons-material/Folder';
import NecSooLoader from './NecSooLoader';

const drawerWidth = 220;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const MenuItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1.5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  backgroundColor: active ? theme.palette.primary.light : 'transparent',
  color: active ? theme.palette.primary.main : '#6B7280',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.main : '#9CA3AF',
    minWidth: '40px',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#FFFFFF',
  minHeight: '100vh',
  position: 'relative',
}));

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Gallery', icon: <PhotoLibraryIcon />, path: '/admin/gallery' },
    { text: 'Blog', icon: <ArticleIcon />, path: '/admin/blog' },
    { text: 'Projects', icon: <FolderIcon />, path: '/admin/projects' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <NecSooLoader />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StyledDrawer variant="permanent">
        <Logo>
          <img src="/logo.png" alt="NECSOO Logo" style={{ height: 32 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', fontSize: '1rem' }}>
            NECSOO
          </Typography>
        </Logo>
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item.text}
              button
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontSize: '0.875rem',
                }} 
              />
            </MenuItem>
          ))}
        </List>
        <List>
          <MenuItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                fontSize: '0.875rem',
              }} 
            />
          </MenuItem>
        </List>
      </StyledDrawer>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Box>
  );
};

export default AdminLayout;
