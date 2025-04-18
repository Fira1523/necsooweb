import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import BlogCard from './BlogCard';
import NecSooLoader from '../../components/NecSooLoader';
import {
  Grid,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Pagination,
  Chip,
  Avatar,
  Button,
  InputAdornment,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #01B7EA 0%, #0288D1 100%)', // New blue color scheme
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 0,
  backgroundColor: '#fff',
  boxShadow: 'none',
  maxWidth: '1000px',
  margin: '0 auto',
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: alpha(theme.palette.common.white, 0.95),
    transition: theme.transitions.create(['box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: '0 0 0 2px rgba(1, 183, 234, 0.2)', // New blue color scheme
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
    backgroundColor: '#01B7EA', // New blue color scheme
    color: '#fff',
    fontWeight: 500,
    border: 'none',
  },
  '&:hover': {
    backgroundColor: '#E1F5FE', // New blue color scheme
  },
}));

const FeaturedPost = styled(Paper)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#fff',
  color: '#fff',
  height: '600px',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'flex-end',
  borderRadius: 0,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  maxWidth: '1400px',
  margin: '0 auto',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '90vw',
    height: '85vh',
    margin: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.18)',
  },
  '& .MuiDialogContent-root': {
    padding: 0,
    display: 'flex',
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}));

const ContentTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: '#374151',
  fontFamily: theme.typography.fontFamily,
  '& p': {
    marginBottom: theme.spacing(1.5),
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 8;
  const categories = [
    { value: 'news', label: 'News', icon: CategoryIcon },
    { value: 'events', label: 'Events', icon: CalendarTodayIcon },
    { value: 'success-stories', label: 'Success Stories', icon: PersonIcon },
    { value: 'updates', label: 'Updates', icon: AccessTimeIcon },
  ];

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('/blogs');
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setBlogPosts(sortedPosts);
      setFilteredPosts(sortedPosts);
      // Set the most recent post as featured
      setFeaturedPost(sortedPosts[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterPosts(event.target.value, category);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setCategory(category === '' ? '' : category);
    filterPosts(searchTerm, category === '' ? '' : category);
    setCurrentPage(1);
  };

  const filterPosts = (search, category) => {
    let filtered = blogPosts;

    if (search) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((post) => post.category === category);
    }

    setFilteredPosts(filtered);
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleShare = (post, platform) => {
    // Implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share?url=${window.location.href}&title=${post.title}`, '_blank');
          break;
        default:
          break;
      }
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <NecSooLoader />;
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <HeroSection>
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              letterSpacing: '-0.01em',
              mb: 3,
              position: 'relative',
              color: 'white',
            }}
          >
            Latest Updates & Impact Stories
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: '600px',
              mb: 3,
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              opacity: 0.95,
              position: 'relative',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Discover how we're making a difference in communities across Oromia
          </Typography>
        </Box>
      </HeroSection>

      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, sm: 4, md: 6 }, 
        pb: 12,
        '& .MuiPaginationItem-root': {
          borderRadius: 1,
        },
      }}>
        <Box sx={{ 
          mb: 6,
          pb: 4,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}>
          <Grid container spacing={4} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <SearchTextField
                fullWidth
                placeholder="Search our impact stories..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap', 
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
              }}>
                <CategoryChip
                  label="All Stories"
                  onClick={() => handleCategoryChange('')}
                  className={category === '' ? 'active' : ''}
                />
                {categories.map((cat) => (
                  <CategoryChip
                    key={cat.value}
                    label={cat.label}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={category === cat.value ? 'active' : ''}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post)}
                readingTime={calculateReadingTime(post.content)}
              />
            ))
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 12,
              backgroundColor: '#F9F9F9',
              borderRadius: 1,
              border: '1px solid rgba(0, 0, 0, 0.08)',
            }}>
              <Typography
                variant="h6"
                sx={{ 
                  mb: 1,
                  color: 'text.primary',
                  fontWeight: 500
                }}
              >
                No stories found
              </Typography>
              <Typography 
                color="text.secondary"
                sx={{ fontSize: '1rem' }}
              >
                Please try adjusting your search criteria
              </Typography>
            </Box>
          )}
        </Box>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '0.9rem',
                  minWidth: '36px',
                  height: '36px',
                  borderRadius: 1,
                },
              }}
            />
          </Box>
        )}
      </Box>

      <StyledDialog
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        maxWidth={false}
        fullWidth
      >
        {selectedPost && (
          <>
            <DialogTitle sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton 
                  onClick={() => setSelectedPost(null)}
                  sx={{ color: '#4B5563' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box 
                sx={{ 
                  width: '45%',
                  position: 'relative',
                  bgcolor: '#f3f4f6',
                  borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  py: 4,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    position: 'relative',
                    mx: 4,
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <Box
                    component="img"
                    src={`http://localhost:8000/storage/${selectedPost.image}`}
                    alt={selectedPost.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Box>

              <Box 
                sx={{ 
                  width: '55%',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: '#FFFFFF',
                }}
              >
                <Box>
                  <CategoryChip
                    label={selectedPost.category}
                    sx={{ 
                      mb: 2,
                      backgroundColor: '#E1F5FE',
                      color: '#01B7EA',
                      fontWeight: 500,
                      fontSize: '0.8125rem',
                      height: 28,
                      '& .MuiChip-label': {
                        px: 1.5,
                      },
                    }}
                  />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#111827',
                      mb: 2.5,
                      lineHeight: 1.2,
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {selectedPost.title}
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 3, 
                    mb: 3,
                    color: '#6B7280',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon 
                        sx={{ 
                          fontSize: '0.875rem',
                          mr: 0.75,
                          color: '#01B7EA',
                        }}
                      />
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: '#6B7280',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        {new Date(selectedPost.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon 
                        sx={{ 
                          fontSize: '0.875rem',
                          mr: 0.75,
                          color: '#01B7EA',
                        }}
                      />
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: '#6B7280',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                        }}
                      >
                        {calculateReadingTime(selectedPost.content)} min read
                      </Typography>
                    </Box>
                  </Box>

                  <Divider 
                    sx={{ 
                      mb: 3,
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                    }} 
                  />

                  <ContentTypography>
                    {selectedPost.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </ContentTypography>

                  <Box sx={{ 
                    mt: 3, 
                    pt: 3, 
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#111827',
                        fontSize: '0.875rem',
                      }}
                    >
                      Share this story
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleShare(selectedPost, 'facebook')}
                        sx={{ 
                          color: '#01B7EA',
                          '&:hover': {
                            backgroundColor: '#E1F5FE',
                          },
                          padding: 1,
                        }}
                      >
                        <FacebookIcon sx={{ fontSize: '1.125rem' }} />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleShare(selectedPost, 'twitter')}
                        sx={{ 
                          color: '#01B7EA',
                          '&:hover': {
                            backgroundColor: '#E1F5FE',
                          },
                          padding: 1,
                        }}
                      >
                        <TwitterIcon sx={{ fontSize: '1.125rem' }} />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleShare(selectedPost, 'linkedin')}
                        sx={{ 
                          color: '#01B7EA',
                          '&:hover': {
                            backgroundColor: '#E1F5FE',
                          },
                          padding: 1,
                        }}
                      >
                        <LinkedInIcon sx={{ fontSize: '1.125rem' }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </StyledDialog>
    </Box>
  );
};

export default Blog;
