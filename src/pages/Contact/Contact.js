import React from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Container,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #01B7EA 0%, #0288D1 100%)',
  color: '#FFFFFF',
  padding: theme.spacing(8, 2),
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: '64px',
  marginBottom: theme.spacing(4),
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

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: 'none',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
  },
}));

const MapContainer = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '400px',
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#01B7EA',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#01B7EA',
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#01B7EA',
  },
}));

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+251111262279';
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: 'Our Location',
      details: 'Fresh Corner Building, Gurdshola, Addis Ababa, Ethiopia',
      action: null,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: 'Phone Number',
      details: '+251 11 126 2279',
      action: handlePhoneClick,
    },
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: 'Email Address',
      details: 'info@necsoo.org',
      action: null,
    },
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Get in Touch
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              maxWidth: '600px',
              mx: 'auto',
              opacity: 0.9,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 400,
            }}
          >
            Have questions or want to collaborate? We'd love to hear from you.
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ContactCard>
                <IconButton
                  onClick={info.action}
                  sx={{
                    backgroundColor: 'rgba(1, 183, 234, 0.1)',
                    color: '#01B7EA',
                    p: 1.5,
                    cursor: info.action ? 'pointer' : 'default',
                    '&:hover': {
                      backgroundColor: info.action ? 'rgba(1, 183, 234, 0.2)' : 'rgba(1, 183, 234, 0.1)',
                    },
                  }}
                >
                  {info.icon}
                </IconButton>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: '#111827',
                      mb: 0.5,
                    }}
                  >
                    {info.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      cursor: info.action ? 'pointer' : 'default',
                      '&:hover': {
                        color: info.action ? '#01B7EA' : '#6B7280',
                      },
                    }}
                  >
                    {info.details}
                  </Typography>
                </Box>
              </ContactCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: '#111827',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: '#01B7EA',
                },
              }}
            >
              Send us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField 
                    fullWidth 
                    label="Full Name" 
                    variant="outlined" 
                    required 
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField 
                    fullWidth 
                    label="Email Address" 
                    type="email" 
                    variant="outlined" 
                    required 
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField 
                    fullWidth 
                    label="Phone Number" 
                    type="tel" 
                    variant="outlined" 
                    required 
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField 
                    fullWidth 
                    label="Message" 
                    variant="outlined" 
                    multiline 
                    rows={3}
                    required 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    endIcon={<SendIcon />}
                    sx={{
                      bgcolor: '#01B7EA',
                      color: '#FFFFFF',
                      py: 1,
                      px: 3,
                      borderRadius: 1,
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: '#0288D1',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: '#111827',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  borderRadius: 1.5,
                  backgroundColor: '#01B7EA',
                },
              }}
            >
              Visit Our Office
            </Typography>
            <MapContainer
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.485318144877!2d38.813496173528314!3d9.019414689141994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85000dcfb3e5%3A0x3a90eb94ef9dfa1c!2sFresh%20corner%20Gurdshola!5e0!3m2!1sen!2set!4v1740931919331!5m2!1sen!2set"
              allowFullScreen
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
