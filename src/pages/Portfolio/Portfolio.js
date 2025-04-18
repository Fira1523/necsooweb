import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Divider,
  CircularProgress,
  List,
  ListItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import TimelineIcon from '@mui/icons-material/Timeline';
import NecSooLoader from '../../components/NecSooLoader';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #01B7EA 0%, #0288D1 100%)',
  color: '#FFFFFF',
  padding: theme.spacing(15, 4),
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: '64px',
  marginBottom: theme.spacing(8),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
  },
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-4px)',
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  backgroundColor: '#f5f5f5',
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  '&.active': {
    backgroundColor: '#01B7EA',
    color: '#fff',
    fontWeight: 500,
    border: 'none',
  },
  '&:hover': {
    backgroundColor: '#E1F5FE',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '90vw',
    maxHeight: '90vh',
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: '#FFFFFF',
    boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.18)',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.03)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.15)',
      borderRadius: '4px',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.25)',
      },
    },
  }
}));

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: 'none',
  backgroundColor: '#FFFFFF',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  },
}));

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Project categories
  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/projects');
      // Sort by created_at in descending order and process data
      const sortedProjects = response.data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(project => ({
          ...project,
          image: project.image ? `http://localhost:8000/storage/${project.image}` : '/placeholder-image.jpg',
          partners: typeof project.partners === 'string' ? JSON.parse(project.partners || '[]') : (project.partners || []),
          impact: typeof project.impact === 'string' ? JSON.parse(project.impact || '[]') : (project.impact || []),
          objectives: typeof project.objectives === 'string' ? JSON.parse(project.objectives || '[]') : (project.objectives || [])
        }));
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' ? true : project.category === filter
  );

  if (loading) {
    return <NecSooLoader />;
  }

  return (
    <>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Our Projects
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
            Discover our initiatives and contributions to civil society development in Oromia
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: 1 }}
          >
            {categories.map((category) => (
              <CategoryChip
                key={category.value}
                label={category.label}
                onClick={() => setFilter(category.value)}
                className={filter === category.value ? 'active' : ''}
              />
            ))}
          </Stack>
        </Box>

        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <ProjectCard
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={project.image || '/placeholder-image.jpg'}
                  alt={project.title}
                  sx={{ 
                    objectFit: 'cover',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      color={
                        project.category === 'ongoing' ? 'primary' :
                        project.category === 'completed' ? 'success' :
                        'warning'
                      }
                      size="small"
                    />
                    <Button
                      size="small"
                      onClick={() => setSelectedProject(project)}
                      sx={{ textTransform: 'none' }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>

        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No projects found in this category.
            </Typography>
          </Box>
        )}
      </Container>

      <StyledDialog
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        fullWidth
        maxWidth="lg"
        scroll="paper"
      >
        {selectedProject && (
          <>
            <DialogTitle>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                py: 0.5
              }}>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {selectedProject.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {selectedProject.category}
                  </Typography>
                </Box>
                <IconButton
                  aria-label="close"
                  onClick={() => setSelectedProject(null)}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'text.primary' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ px: 3, py: 3, bgcolor: '#FAFAFA' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      position: 'sticky',
                      top: 24,
                    }}
                  >
                    <Box
                      component="img"
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      sx={{
                        width: '100%',
                        height: 350,
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Stack spacing={2.5}>
                    <Box sx={{ bgcolor: '#FFFFFF', p: 2.5, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                      <Typography variant="h6" gutterBottom sx={{ 
                        fontWeight: 600,
                        color: 'text.primary',
                        fontSize: '1.1rem',
                        mb: 1.5
                      }}>
                        Description
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.secondary',
                          whiteSpace: 'pre-line',
                          lineHeight: 1.6
                        }}
                      >
                        {selectedProject.description}
                      </Typography>
                    </Box>

                    <Box sx={{ bgcolor: '#FFFFFF', p: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          Project Status:
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={selectedProject.progress || 0}
                            sx={{ 
                              height: 6, 
                              borderRadius: 2,
                              bgcolor: 'rgba(0, 0, 0, 0.04)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 2,
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, minWidth: 45 }}>
                          {selectedProject.progress || 0}%
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                      {selectedProject.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                          <Typography variant="body2">{selectedProject.location}</Typography>
                        </Box>
                      )}

                      {selectedProject.duration && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon color="primary" sx={{ fontSize: '1.2rem' }} />
                          <Typography variant="body2">{selectedProject.duration}</Typography>
                        </Box>
                      )}

                      {selectedProject.budget && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            Budget:
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                            {selectedProject.budget}
                          </Typography>
                        </Box>
                      )}
                    </Stack>

                    {selectedProject.partners && selectedProject.partners.length > 0 && (
                      <Box sx={{ bgcolor: '#FFFFFF', p: 2.5, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          mb: 1.5
                        }}>
                          Project Partners
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                          {selectedProject.partners.map((partner, index) => (
                            <Chip
                              key={index}
                              label={partner}
                              size="small"
                              icon={<GroupsIcon />}
                              sx={{ 
                                bgcolor: 'background.default',
                                border: '1px solid',
                                borderColor: 'primary.light',
                                color: 'text.primary',
                                '& .MuiChip-icon': {
                                  color: 'primary.main',
                                  fontSize: '1.1rem'
                                }
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {selectedProject.objectives && selectedProject.objectives.length > 0 && (
                      <Box sx={{ bgcolor: '#FFFFFF', p: 2.5, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ 
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          mb: 1.5
                        }}>
                          Project Objectives
                        </Typography>
                        <List sx={{ pl: 2, pt: 0 }}>
                          {selectedProject.objectives.map((objective, index) => (
                            <ListItem 
                              key={index} 
                              sx={{ 
                                display: 'list-item',
                                listStyleType: 'disc',
                                pl: 1,
                                py: 0.5
                              }}
                            >
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ lineHeight: 1.6 }}
                              >
                                {objective}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {selectedProject.impact && selectedProject.impact.length > 0 && (
                      <Box sx={{ bgcolor: '#FFFFFF', p: 2.5, borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ 
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          mb: 1.5
                        }}>
                          Project Impact
                        </Typography>
                        <List sx={{ pl: 2, pt: 0 }}>
                          {selectedProject.impact.map((impact, index) => (
                            <ListItem 
                              key={index} 
                              sx={{ 
                                display: 'list-item',
                                listStyleType: 'disc',
                                pl: 1,
                                py: 0.5
                              }}
                            >
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ lineHeight: 1.6 }}
                              >
                                {impact}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      Created: {new Date(selectedProject.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </StyledDialog>
    </>
  );
};

export default Portfolio;
