import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(1, 183, 234, 0.95) 0%, rgba(2, 136, 209, 0.95) 100%), url("/images/donate-hero.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'multiply',
  color: 'white',
  padding: theme.spacing(15, 4),
  position: 'relative',
  marginTop: '64px',
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: '#FFFFFF',
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

const DonationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: 'none',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  backgroundColor: '#FFFFFF',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #01B7EA 0%, #0288D1 100%)',
    borderRadius: '8px 8px 0 0',
  },
}));

const ImpactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    '& .icon': {
      color: '#01B7EA',
      transform: 'scale(1.1)',
    },
  },
}));

const AmountButton = styled(Button)(({ theme, selected }) => ({
  minWidth: '120px',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1),
  border: '1px solid',
  borderColor: selected ? '#01B7EA' : 'rgba(0, 0, 0, 0.12)',
  backgroundColor: selected ? 'rgba(1, 183, 234, 0.08)' : 'transparent',
  color: selected ? '#01B7EA' : '#6B7280',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(1, 183, 234, 0.08)',
    borderColor: '#01B7EA',
  },
}));

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [
    { value: 100, label: '100 ETB' },
    { value: 500, label: '500 ETB' },
    { value: 1000, label: '1000 ETB' },
    { value: 5000, label: '5000 ETB' },
  ];

  const impactAreas = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} className="icon" />,
      title: 'Community Development',
      description: 'Support local initiatives and empower communities to thrive.',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} className="icon" />,
      title: 'Education',
      description: 'Help provide quality education and learning resources.',
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} className="icon" />,
      title: 'Healthcare',
      description: 'Improve access to healthcare services and facilities.',
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} className="icon" />,
      title: 'Emergency Relief',
      description: 'Provide immediate assistance during crises and disasters.',
    },
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
    setSelectedAmount(null);
  };

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <IconButton
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                mb: 3,
                p: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <FavoriteIcon sx={{ fontSize: 40, color: '#FF4B4B' }} />
            </IconButton>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Make a Difference Today
            </Typography>
            <Typography 
              variant="h5"
              sx={{ 
                maxWidth: '800px',
                mx: 'auto',
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 400,
                mb: 3,
              }}
            >
              Your generous donation helps us empower communities and create lasting change.
            </Typography>
            <Chip 
              label="Secure Donation" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 500,
              }} 
            />
          </Box>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <DonationCard>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4,
                  fontWeight: 700,
                  color: '#111827',
                  textAlign: 'center',
                }}
              >
                Choose Your Donation Amount
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                  {predefinedAmounts.map((amount) => (
                    <Grid item key={amount.value}>
                      <AmountButton
                        selected={selectedAmount === amount.value}
                        onClick={() => handleAmountSelect(amount.value)}
                      >
                        {amount.label}
                      </AmountButton>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 2,
                    color: '#6B7280',
                    textAlign: 'center',
                  }}
                >
                  Or enter a custom amount
                </Typography>
                <StyledTextField
                  fullWidth
                  label="Custom Amount (ETB)"
                  variant="outlined"
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  inputProps={{ min: 50 }}
                />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Message (Optional)"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<VolunteerActivismIcon />}
                    sx={{
                      bgcolor: '#01B7EA',
                      color: '#FFFFFF',
                      py: 2,
                      borderRadius: 1,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#0288D1',
                      },
                    }}
                  >
                    Complete Donation
                  </Button>
                </Grid>
              </Grid>
            </DonationCard>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                fontWeight: 700,
                color: '#111827',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#01B7EA',
                },
              }}
            >
              Your Impact
            </Typography>

            <Grid container spacing={3}>
              {impactAreas.map((area, index) => (
                <Grid item xs={12} key={index}>
                  <ImpactCard>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <IconButton
                          sx={{
                            backgroundColor: 'rgba(1, 183, 234, 0.1)',
                            color: '#9CA3AF',
                            p: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(1, 183, 234, 0.1)',
                            },
                          }}
                        >
                          {area.icon}
                        </IconButton>
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              color: '#111827',
                              mb: 0.5,
                            }}
                          >
                            {area.title}
                          </Typography>
                          <Typography 
                            variant="body2"
                            sx={{ 
                              color: '#6B7280',
                              lineHeight: 1.6,
                            }}
                          >
                            {area.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </ImpactCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Donate;