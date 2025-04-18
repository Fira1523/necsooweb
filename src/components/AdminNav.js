import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button color="inherit" component={Link} to="/admin/users">Users</Button>
        <Button color="inherit" component={Link} to="/admin/blog">Blogs</Button>
        <Button color="inherit" component={Link} to="/admin/gallery">Gallery</Button>
        <Button color="inherit" component={Link} to="/admin/portfolio">Portfolio</Button>
        <Button color="inherit" component={Link} to="/admin/projects">Projects</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNav;