import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import StarIcon from '@mui/icons-material/Star';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  '&:nth-of-type(even)': {
    backgroundColor: '#F9FAFB',
  },
}));

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

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: '#FFFFFF',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-4px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  background: 'rgba(1, 183, 234, 0.1)',
  color: '#01B7EA',
  transition: 'all 0.3s ease',
  '& svg': {
    fontSize: 32,
  },
  '.MuiCard-root:hover &': {
    transform: 'scale(1.1)',
    background: '#01B7EA',
    color: '#FFFFFF',
  },
}));

const Vision = () => {
  const values = [
    {
      title: "Integrity & Impartiality",
      description: "We maintain the highest standards of integrity and impartiality in all our operations and decisions."
    },
    {
      title: "Justice & Equity",
      description: "We are committed to promoting justice and equity in all our activities and engagements."
    },
    {
      title: "Transparency & Accountability",
      description: "We uphold complete transparency and remain accountable to our stakeholders and communities."
    },
    {
      title: "Poverty Alleviation",
      description: "We are dedicated to initiatives and programs that contribute to poverty alleviation in our communities."
    },
    {
      title: "Gender Equality",
      description: "We actively promote and support gender equality across all our programs and operations."
    },
    {
      title: "Non-Partisan Engagement",
      description: "We maintain a strictly non-partisan approach in all our undertakings and engagement modalities."
    }
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
              fontWeight: 700,
              letterSpacing: '-0.02em',
              mb: 3
            }}
          >
            Vision, Mission & Values
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.9,
              lineHeight: 1.6
            }}
          >
            The guiding principles that shape our network and drive our impact in Oromia
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Section>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LightbulbIcon sx={{ fontSize: 40, color: '#01B7EA', mr: 2 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#4B5563',
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                  }}
                >
                  NeCSOO aspires to see vibrant and value-driven civil society organizations (CSOs) in Oromia.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TrackChangesIcon sx={{ fontSize: 40, color: '#01B7EA', mr: 2 }} />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#111827',
                    }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#4B5563',
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                  }}
                >
                  NeCSOO as a network of CSOs in Oromia facilitates an enabling environment for its members for the delivery of quality and responsive services and initiatives to and with the people in Oromia.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Typography 
            variant="h4" 
            align="center"
            sx={{ 
              fontWeight: 700,
              mb: 3,
              color: '#111827',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#01B7EA',
              },
            }}
          >
            Our Core Values
          </Typography>
          <Typography 
            variant="body1" 
            align="center"
            sx={{ 
              color: '#4B5563',
              lineHeight: 1.8,
              maxWidth: '800px',
              margin: '0 auto',
              mb: 6
            }}
          >
            NeCSOO highly values and lives for integrity, impartiality, justice and equity, transparency and accountability, commitment to poverty alleviation, gender equality, and being non-partisan in all its undertakings and engagement modalities.
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconWrapper>
                      <StarIcon />
                    </IconWrapper>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#111827',
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#4B5563',
                        lineHeight: 1.7
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Container>
    </Box>
  );
};

export default Vision;
