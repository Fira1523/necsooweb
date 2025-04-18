import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NecSooLoader from '../../components/NecSooLoader';
import axios from '../../axios';

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[3],
    '& .icon': {
      transform: 'scale(1.1)',
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF',
    },
  },
}));

const IconWrapper = styled(Avatar)(({ theme }) => ({
  width: 52,
  height: 52,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease-in-out',
}));

const DashboardWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[1],
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

const LoadingWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: 300,
});

const Dashboard = () => {
  const [stats, setStats] = useState({
    gallery: { count: 0, loading: true, error: null },
    blog: { count: 0, loading: true, error: null },
    projects: { count: 0, loading: true, error: null }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, blogRes, projectsRes] = await Promise.all([
          axios.get('/gallery', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get('/blogs', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get('/projects', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        ]);
        
        setStats({
          gallery: { count: galleryRes.data.length, loading: false, error: null },
          blog: { count: blogRes.data.length, loading: false, error: null },
          projects: { count: projectsRes.data.length, loading: false, error: null }
        });
      } catch (error) {
        setStats(prev => ({
          gallery: { ...prev.gallery, loading: false, error: 'Failed to load data' },
          blog: { ...prev.blog, loading: false, error: 'Failed to load data' },
          projects: { ...prev.projects, loading: false, error: 'Failed to load data' }
        }));
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Gallery Items',
      count: stats.gallery.count,
      loading: stats.gallery.loading,
      error: stats.gallery.error,
      icon: <PhotoLibraryIcon />,
      description: 'Total media items in gallery',
      color: '#2196F3'
    },
    {
      title: 'Blog Posts',
      count: stats.blog.count,
      loading: stats.blog.loading,
      error: stats.blog.error,
      icon: <ArticleIcon />,
      description: 'Total published articles',
      color: '#4CAF50'
    },
    {
      title: 'Projects',
      count: stats.projects.count,
      loading: stats.projects.loading,
      error: stats.projects.error,
      icon: <FolderIcon />,
      description: 'Total active projects',
      color: '#FF9800'
    }
  ];

  if (stats.gallery.loading || stats.blog.loading || stats.projects.loading) {
    return <NecSooLoader size="small" />;
  }

  return (
    <DashboardWrapper>
      <HeaderPaper elevation={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DashboardIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>
              Monitor and manage your organization's digital content. View real-time statistics of your gallery items, blog posts, and active projects.
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StatsCard>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h3" sx={{ 
                        fontWeight: 600, 
                        mb: 1,
                        color: card.error ? 'error.main' : 'text.primary',
                        fontSize: '2.5rem'
                      }}>
                        {card.error ? '—' : card.count.toLocaleString()}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 500,
                        letterSpacing: '0.5px'
                      }}>
                        {card.title}
                      </Typography>
                    </Box>
                    <IconWrapper 
                      className="icon" 
                      sx={{ 
                        bgcolor: `${card.color}15`,
                        color: card.color
                      }}
                    >
                      {card.icon}
                    </IconWrapper>
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.875rem',
                      opacity: 0.8
                    }}
                  >
                    {card.error ? 'Failed to load data' : card.description}
                  </Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          ))}
        </Grid>
      </HeaderPaper>
    </DashboardWrapper>
  );
};

export default Dashboard;
