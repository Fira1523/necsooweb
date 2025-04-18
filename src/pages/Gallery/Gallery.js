import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Dialog,
  DialogContent,
  Chip,
  Stack,
  Divider,
  Pagination,
} from '@mui/material';
import {
  styled
} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import axios from '../../axios';
import NecSooLoader from '../../components/NecSooLoader';

// Styled components
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

const ImageCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-4px)',
    '& .zoom-overlay': {
      opacity: 1,
    },
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
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  '& .MuiDialogContent-root': {
    padding: 0,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ZoomOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  '& .MuiSvgIcon-root': {
    color: '#FFFFFF',
    fontSize: '2rem',
  },
}));

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setPage(1); // Reset to first page when filter changes
  }, [filter]);

  // Updated categories
  const categories = [
    { label: 'All', value: 'all', icon: <PhotoLibraryIcon /> },
    { label: 'Events', value: 'events', icon: <EventIcon /> },
    { label: 'Training', value: 'training', icon: <SchoolIcon /> },
    { label: 'Community', value: 'community', icon: <GroupsIcon /> },
  ];

  // Gallery statistics
  const stats = [
    { number: '1000+', label: 'Photos Captured' },
    { label: 'Years of Memories', number: '14' },
    { number: '50+', label: 'Events Documented' },
    { number: '100+', label: 'Success Stories' },
  ];

  // Fetch gallery items from the API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('/gallery'); // Adjust the endpoint as necessary
        setGalleryItems(response.data); // Assuming the response data is an array of gallery items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const filteredItems = galleryItems
    .filter(item => filter === 'all' || item.category === filter)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const displayedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <NecSooLoader />;
  }

  return (
    <Box sx={{ mt: '64px' }}>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
              fontWeight: 700,
              letterSpacing: '-0.02em',
              mb: 1,
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            Photo Gallery
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              maxWidth: '800px',
              mb: 2,
              textAlign: 'center',
              mx: 'auto',
              color: 'white',
              fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
            }}
          >
            Capturing moments of impact and transformation across our network
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        {/* Statistics Section */}
        <Box sx={{ my: 4 }}>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Card elevation={1} sx={{ padding: 2, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, borderRadius: 2 }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: '#1E88E5',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Add a small divider or spacing */}
        <Divider sx={{ my: 4 }} />

        {/* Filter Section */}
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          sx={{ mb: 4 }}
          flexWrap="wrap"
        >
          {categories.map((category) => (
            <CategoryChip
              key={category.value}
              icon={category.icon}
              label={category.label}
              onClick={() => setFilter(category.value)}
              className={filter === category.value ? "active" : ""}
              sx={{ 
                px: 2, 
                py: 2.5,
                fontSize: '0.9rem',
                fontWeight: filter === category.value ? 600 : 400,
              }}
            />
          ))}
        </Stack>

        {/* Main Gallery Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {displayedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ImageCard onClick={() => setSelectedImage(item)}>
                <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:8000/storage/${item.image}`}
                    alt={item.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <ZoomOverlay className="zoom-overlay">
                    <ZoomInIcon />
                  </ZoomOverlay>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography 
                    variant="subtitle1"
                    sx={{ 
                      fontWeight: 600,
                      color: '#111827',
                      mb: 1,
                      fontSize: '1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Typography 
                      variant="caption"
                      sx={{ 
                        color: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        backgroundColor: '#F3F4F6',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                      }}
                    >
                      <EventIcon sx={{ fontSize: '0.9rem' }} />
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <CategoryChip
                      label={item.category}
                      size="small"
                      sx={{ 
                        height: 24,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                </CardContent>
              </ImageCard>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 8 }}>
            <Pagination 
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1rem',
                },
                '& .Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Image Dialog */}
        <StyledDialog
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          maxWidth={false}
        >
          <DialogContent>
            {selectedImage && (
              <>
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <IconButton
                    onClick={() => setSelectedImage(null)}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                      zIndex: 1,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={`http://localhost:8000/storage/${selectedImage.image}`}
                      alt={selectedImage.title}
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: '#FFFFFF',
                      p: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {selectedImage.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                        }}
                      >
                        <EventIcon sx={{ fontSize: '1.1rem' }} />
                        Published: {new Date(selectedImage.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                      <CategoryChip
                        label={selectedImage.category}
                        size="small"
                        sx={{ 
                          height: 24,
                          fontSize: '0.75rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: '#FFFFFF',
                        }}
                      />
                    </Box>
                    {selectedImage.description && (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mt: 1,
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {selectedImage.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
        </StyledDialog>
      </Container>
    </Box>
  );
};

export default Gallery; 