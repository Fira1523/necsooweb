import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Collapse,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

const ValueCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  background: '#FFFFFF',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s ease-in-out',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-4px)',
    '& .icon': {
      color: '#01B7EA',
      transform: 'scale(1.1)',
    },
  },
  '& .icon': {
    transition: 'all 0.3s ease-in-out',
    color: '#9CA3AF',
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  background: '#FFFFFF',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-4px)',
    '& .member-image': {
      transform: 'scale(1.05)',
    },
  },
  '& .member-image': {
    transition: 'transform 0.3s ease-in-out',
  },
}));

const About = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Core values data
  const coreValues = [
    "Integrity and Transparency",
    "Collaboration and Partnership",
    "Innovation and Excellence",
    "Community-Driven Impact",
    "Inclusivity and Diversity",
    "Sustainable Development"
  ];

  // Team members data
  const teamMembers = [
    {
      name: "John Doe",
      position: "Executive Director",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Jane Smith",
      position: "Program Manager",
      image: "/images/team2.jpg"
    },
    {
      name: "David Wilson",
      position: "Community Relations",
      image: "/images/team3.jpg"
    },
    {
      name: "Sarah Johnson",
      position: "Operations Director",
      image: "/images/team4.jpg"
    }
  ];

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <div>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
                fontWeight: 700,
                letterSpacing: '-0.02em',
                mb: 1,
                pt: 1,
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              Our Story
            </Typography>
            <Typography 
              variant="h5"
              sx={{ 
                maxWidth: '800px',
                mb: 3,
                textAlign: 'center',
                mx: 'auto',
                color: 'white',
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
              }}
            >
              Empowering civil society organizations since 2009
            </Typography>
          </div>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* About Section */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: '#111827',
                  fontWeight: 700,
                  mb: 3,
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
                About NeCSOO
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.1rem',
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 3,
                }}
              >
                Established in November 2009, Network of Civil Society Organizations in Oromia (NeCSOO) 
                is the regional consortium of civil society organizations operating in the Oromia National 
                Regional state. The Network currently comprises 73 member organizations engaged in various 
                development and humanitarian response activities.
              </Typography>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    fontSize: '1.1rem',
                    color: '#4B5563',
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  Since its establishment, NeCSOO has been operating in Oromia, making its voice heard 
                  in promoting enabling CSO space, policy influencing, peace-building, good governance, 
                  partnership building, human rights, and related CSO-proper advocacy activities.
                </Typography>
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    fontSize: '1.1rem',
                    color: '#4B5563',
                    lineHeight: 1.8,
                  }}
                >
                  As a Network of civil society organizations, NeCSOO works on various CSO network-proper 
                  activities, including promotion of enabling CSOs' operation space, peace and peaceful 
                  coexistence, good governance, and inclusive development processes.
                </Typography>
              </Collapse>
              <Button
                onClick={handleExpandClick}
                endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                sx={{ 
                  mt: 2,
                  color: '#01B7EA',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(1, 183, 234, 0.04)',
                  }
                }}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </Button>
            </Box>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {[
                { 
                  number: '73+', 
                  label: 'Member Organizations',
                  icon: <GroupsIcon sx={{ fontSize: 40, color: '#01B7EA', mb: 2 }} />
                },
                { 
                  number: '14', 
                  label: 'Years of Impact',
                  icon: <HistoryEduIcon sx={{ fontSize: 40, color: '#01B7EA', mb: 2 }} />
                },
                { 
                  number: '100+', 
                  label: 'Projects Completed',
                  icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#01B7EA', mb: 2 }} />
                },
                { 
                  number: '500K+', 
                  label: 'Lives Impacted',
                  icon: <TrackChangesIcon sx={{ fontSize: 40, color: '#01B7EA', mb: 2 }} />
                },
              ].map((stat, index) => (
                <Grid item xs={6} key={index}>
                  <StyledCard>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      {stat.icon}
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#111827',
                          mb: 1,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: '#6B7280',
                          fontSize: '0.875rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Core Values Section */}
        <Section>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              color: '#111827',
              fontWeight: 700,
              mb: 4,
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
          <Grid container spacing={3}>
            {coreValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ValueCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircleIcon className="icon" sx={{ fontSize: 24, mr: 1 }} />
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 600,
                        color: '#111827',
                      }}
                    >
                      {value}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: '#6B7280',
                      lineHeight: 1.6,
                    }}
                  >
                    We are committed to upholding the highest standards of {value.toLowerCase()} 
                    in all our operations and interactions.
                  </Typography>
                </ValueCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Mission & Vision Section */}
        <Section>
          <Grid container spacing={6}>
            {/* Mission */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#111827',
                        fontWeight: 700,
                        mb: 3,
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
                      Our Mission
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1.1rem',
                        color: '#4B5563',
                        lineHeight: 1.8,
                      }}
                    >
                      To strengthen and promote civil society organizations in Oromia through networking, 
                      capacity building, and advocacy, fostering sustainable development and positive social change 
                      in our communities.
                    </Typography>
                  </Box>
                  <List>
                    {[
                      'Facilitate collaboration among member organizations',
                      'Advocate for enabling environment for CSOs',
                      'Build capacity of member organizations',
                      'Promote good governance and accountability'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon sx={{ color: '#01B7EA' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          sx={{ 
                            '& .MuiListItemText-primary': { 
                              color: '#4B5563',
                              fontSize: '1rem',
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Vision */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: '#111827',
                        fontWeight: 700,
                        mb: 3,
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
                      Our Vision
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: '1.1rem',
                        color: '#4B5563',
                        lineHeight: 1.8,
                      }}
                    >
                      To see a vibrant civil society sector in Oromia that effectively contributes to 
                      sustainable development, good governance, and the well-being of communities.
                    </Typography>
                  </Box>
                  <List>
                    {[
                      'Empowered and effective civil society organizations',
                      'Transparent and accountable governance',
                      'Sustainable community development',
                      'Inclusive and participatory decision-making'
                    ].map((item, index) => (
                      <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon sx={{ color: '#01B7EA' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item} 
                          sx={{ 
                            '& .MuiListItemText-primary': { 
                              color: '#4B5563',
                              fontSize: '1rem',
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Section>

        {/* Team Section */}
        <Section>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              color: '#111827',
              fontWeight: 700,
              mb: 4,
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
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <TeamMemberCard>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      paddingTop: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      className="member-image"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 600,
                        color: '#111827',
                        mb: 0.5,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: '#6B7280',
                        fontSize: '0.875rem',
                      }}
                    >
                      {member.position}
                    </Typography>
                  </CardContent>
                </TeamMemberCard>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Container>
    </Box>
  );
};

export default About; 
