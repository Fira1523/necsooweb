import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  TextField,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { 
  Timeline, 
  TimelineItem, 
  TimelineContent, 
  TimelineSeparator, 
  TimelineDot 
} from '@mui/lab';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PeopleIcon from '@mui/icons-material/People';
import NecSooLoader from '../../components/NecSooLoader';

// First install: npm install aos framer-motion

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: '#FFFFFF',
  color: '#1E88E5',
  padding: theme.spacing(1),
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'flex-start',
  textAlign: 'center',
  marginTop: '64px',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
}));

// Add these new styled components
const NewsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const ContactForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Footer = styled(Box)(({ theme }) => ({
  background: '#1E88E5',
  color: 'white',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    // Simulate loading time for animations to be ready
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Give enough time for assets to load

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <NecSooLoader size="large" />;
  }

  const features = [
    {
      title: "Capacity Building",
      description: "Strengthening organizations through professional development and resources",
      number: "01",
    },
    {
      title: "Networking",
      description: "Creating valuable connections between civil society organizations",
      number: "02",
    },
    {
      title: "Advocacy",
      description: "Promoting positive change through collective action and engagement",
      number: "03",
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh', // This ensures the footer stays at the bottom
    }}>
      <HeroSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 1,
                pt: 1,
                textAlign: 'center',
                color: '#1E88E5',
              }}
            >
              Network of Civil Society<br />
              Organizations in Oromia
            </Typography>

            <Typography 
              variant="h5"
              sx={{ 
                maxWidth: '800px',
                mb: 1,
                textAlign: 'center',
                mx: 'auto',
                color: 'black',
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
              }}
            >
              Empowering civil society organizations to create lasting positive change
              in our communities.
            </Typography>

            <Box 
              component="img"
              src="/images/geometric-handshake.png"
              alt="Geometric handshake illustration"
              sx={{
                width: '100%',
                maxWidth: '1000px',
                height: 'auto',
                maxHeight: '45vh',
                objectFit: 'contain',
                mx: 'auto',
                my: 1,
                display: 'block',
              }}
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ 
                justifyContent: 'center',
                mt: 1,
              }}
            >
              <Button 
                variant="contained"
                size="large"
                sx={{ 
                  py: 1,
                  px: 3,
                  fontSize: '1rem',
                  backgroundColor: '#1E88E5',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#1976D2',
                  }
                }}
              >
                Join Our Network
              </Button>
              <Button 
                variant="outlined"
                size="large"
                sx={{ 
                  py: 1,
                  px: 3,
                  fontSize: '1rem',
                  borderRadius: '4px',
                  borderColor: '#1E88E5',
                  color: '#1E88E5',
                  '&:hover': {
                    borderColor: '#1976D2',
                    color: '#1976D2',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  }
                }}
              >
                Learn More
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </HeroSection>

      <Section sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <div data-aos="fade-up" data-aos-delay={index * 100}>
                  <StyledCard>
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          color: 'primary.main',
                          opacity: 0.1,
                          fontSize: '6rem',
                          position: 'absolute',
                        }}
                      >
                        {feature.number}
                      </Typography>
                      <Box sx={{ position: 'relative' }}>
                        <Typography 
                          variant="h5" 
                          gutterBottom
                          sx={{ 
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: 'text.secondary',
                            lineHeight: 1.7,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section sx={{ 
        bgcolor: '#1E88E5',
        color: 'white',
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <div data-aos="fade-right">
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Our Impact
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                  Through collaboration and dedication, we've made significant 
                  strides in strengthening civil society organizations across Oromia.
                </Typography>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    borderRadius: '8px',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  View Our Projects
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {[ 
                  { number: '200+', label: 'Member Organizations' }, 
                  { number: '500+', label: 'Projects Completed' }, 
                  { number: '50K+', label: 'People Impacted' }, 
                  { number: '100+', label: 'Training Sessions' }, 
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <div data-aos="fade-up" data-aos-delay={index * 100}>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        {stat.label}
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Latest News & Updates Section */}
      <Section sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Latest News & Updates
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Community Outreach Program",
                date: "March 15, 2024",
                description: "Launching new initiatives to strengthen community engagement.",
                image: "/images/news1.jpg"
              },
              {
                title: "Annual Conference 2024",
                date: "March 10, 2024",
                description: "Join us for our upcoming annual conference focusing on sustainable development.",
                image: "/images/news2.jpg"
              },
              {
                title: "New Partnership Announcement",
                date: "March 5, 2024",
                description: "Strategic partnership to enhance capacity building programs.",
                image: "/images/news3.jpg"
              }
            ].map((news, index) => (
              <Grid item xs={12} md={4} key={index}>
                <div data-aos="fade-up" data-aos-delay={index * 100}>
                  <NewsCard>
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${news.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="caption" 
                        color="primary"
                        sx={{ mb: 1, display: 'block' }}
                      >
                        {news.date}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {news.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {news.description}
                      </Typography>
                    </CardContent>
                  </NewsCard>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Programs Timeline Section */}
      <Section sx={{ bgcolor: 'grey.100' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            textAlign="center" 
            gutterBottom
            sx={{ mb: 8, fontWeight: 600 }}
          >
            Our Programs
          </Typography>
          <Timeline position="alternate">
            {[
              {
                title: "Capacity Building Workshops",
                description: "Monthly training sessions for member organizations",
                icon: <PeopleIcon />,
                color: "#2196f3"
              },
              {
                title: "Resource Center",
                description: "Access to digital and physical resources",
                icon: <ArticleIcon />,
                color: "#ff9800"
              },
              {
                title: "Community Projects",
                description: "Collaborative initiatives with local communities",
                icon: <PhotoLibraryIcon />,
                color: "#4caf50"
              },
              {
                title: "Advocacy Programs",
                description: "Promoting policy changes and social development",
                icon: <EmailIcon />,
                color: "#9c27b0"
              }
            ].map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot sx={{ 
                    bgcolor: index === 0 ? '#1E88E5' :
                             index === 1 ? '#4CAF50' :
                             index === 2 ? '#E53935' :
                             '#1E88E5'
                  }}>
                    {item.icon}
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <div data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
                    <Typography variant="h6" component="span">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <div data-aos="fade-right">
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Get in Touch
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Have questions about our programs or want to become a member?
                  Reach out to us!
                </Typography>
                <ContactForm>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                    }}
                  >
                    Send Message
                  </Button>
                </ContactForm>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div data-aos="fade-left">
                <Box sx={{ p: 4, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    Office Location
                  </Typography>
                  <Typography variant="body1" paragraph>
                    123 Main Street, Addis Ababa, Ethiopia
                  </Typography>
                  
                  <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                    Contact Information
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Email: info@necsoo.org<br />
                    Phone: +251 123 456 789<br />
                    Hours: Monday - Friday, 9:00 AM - 5:00 PM
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Partnerships Section */}
      <Section sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            textAlign="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              mb: 4 
            }}
          >
            Our Partners
          </Typography>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              color: 'text.secondary'
            }}
          >
            We collaborate with leading organizations to create lasting positive impact in our communities
          </Typography>
          <Box
            component="img"
            src="/images/partnerships.png"
            alt="Our Partnership Network"
            sx={{
              width: '100%',
              maxWidth: '1000px',
              height: 'auto',
              mx: 'auto',
              display: 'block',
              filter: 'grayscale(0.2)',
              transition: 'filter 0.3s ease',
              '&:hover': {
                filter: 'grayscale(0)',
              }
            }}
          />
        </Container>
      </Section>
    </Box>
  );
};

export default Home;
