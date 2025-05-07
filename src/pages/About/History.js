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

const History = () => {
  const milestones = [
    {
      year: "2008",
      title: "Initial Formation",
      description: "19 strong civil society organizations came together to establish NeCSOO, recognizing the importance of collective engagement."
    },
    {
      year: "2009",
      title: "Official Registration",
      description: "NeCSOO was officially registered at the Oromia Justice Bureau on November 17, becoming the largest non-thematic consortium of CSOs in Oromia."
    },
    {
      year: "Present",
      title: "Growing Network",
      description: "NeCSOO has expanded to 73 CSO member organizations, with more applicants seeking membership."
    }
  ];

  const engagementAreas = [
    "Promotion of peace and peaceful coexistence",
    "Good governance and public service-delivery",
    "Inclusive reform and participatory development",
    "Nation building processes",
    "Enhancing GO-CSO/NGOs' development partnership",
    "Promoting CSOs' and private sector organizations' partnership",
    "Promoting CSOs' enabling operation space",
    "Enhancing members' and partners' technical capacities"
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
            Our Background History
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
            The journey of NeCSOO as the largest non-thematic consortium of civil society organizations in Oromia.
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Section>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
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
                Our Foundation Story
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                Established in November 2009, Network of Civil Society Organizations in Oromia (NeCSOO) is the largest non-thematic consortium of civil society organizations in Oromia. The initiative for the formation of NeCSOO had come first from 19 strong civil society organizations (CSOs) that were and still are making substantial contributions for the wellbeing and development of the people in the Oromia National Regional State.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                This group, well visualizing the importance of collective engagements beyond individual CSOs' contributions, came together and founded NeCSOO in May 2008 for its eventual registration at the then Oromia Justice Bureau; on November 17, 2009.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 3
                }}
              >
                The Network, at the moment has 73 CSO member organizations and a number of membership applicants; all of which have engaged in different development and humanitarian response activities in Oromia as well as in other regions of the country. Since its establishment, NeCSOO has been operating in Oromia and accordingly, the Region has become its domain of operation.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#01B7EA',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Regional Impact
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#4B5563',
                    lineHeight: 1.7,
                    mb: 2
                  }}
                >
                  Oromia National Regional State (ONRS), with a total land area of 353,690 square km and an estimated population of over forty million (as per CSA's 2018 estimate), is the largest Regional State in Ethiopia providing a wide range of engagement opportunities for civil society organizations.
                </Typography>
              </StyledCard>
            </Grid>
          </Grid>
        </Section>

        <Section>
          <Typography 
            variant="h4" 
            align="center"
            sx={{ 
              fontWeight: 700,
              mb: 6,
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
            Our Journey & Growth
          </Typography>
          <Grid container spacing={4}>
            {milestones.map((milestone, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledCard>
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#01B7EA',
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {milestone.year}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#111827',
                        fontWeight: 600,
                        mb: 2
                      }}
                    >
                      {milestone.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#4B5563',
                        lineHeight: 1.7
                      }}
                    >
                      {milestone.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  mb: 4,
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
                Our Engagement & Approach
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 4
                }}
              >
                As a Network of civil society organizations, NeCSOO engages in various CSO network-proper activities. We are best known for our evidence-based policy dialogue and advocacy activities on issues of interest to the vulnerable section of the population, the public, the region, and the country at large.
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 4
                }}
              >
                NeCSOO upholds constructive engagement and strongly applies informed engagements where it convenes and organizes research-based policy dialogues, panel discussions, high-level meetings and workshops to strengthen and encourage sound policies and also to pinpoint policy gaps for improvements.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#4B5563',
                  lineHeight: 1.8,
                  mb: 4,
                  fontStyle: 'italic'
                }}
              >
                NeCSOO vehemently believes that development and nation-building endeavors hardly attain their purposes in a sustainable manner without the true participation and contribution of all. Hence, it firmly promotes principle-based partnerships between and among all possible state and non-state actors of different categories at all levels.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <StyledCard sx={{ mt: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#111827',
                      fontWeight: 600,
                      mb: 3
                    }}
                  >
                    Key Areas of Engagement
                  </Typography>
                  <Grid container spacing={2}>
                    {engagementAreas.map((area, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: '#01B7EA',
                              flexShrink: 0
                            }}
                          />
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: '#4B5563',
                              lineHeight: 1.7
                            }}
                          >
                            {area}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Section>
      </Container>
    </Box>
  );
};

export default History;
