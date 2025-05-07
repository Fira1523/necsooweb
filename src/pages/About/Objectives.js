import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GavelIcon from '@mui/icons-material/Gavel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(2, 0),
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(0, 3, 2),
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  marginBottom: theme.spacing(1.5),
  '& .MuiListItemIcon-root': {
    minWidth: 32,
    color: '#01B7EA',
  },
  '& .MuiListItemText-primary': {
    color: '#111827',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
}));

const Objectives = () => {
  const objectives = [
    "To promote an enabling environment for the holistic development interventions of NeCSOO members in the Oromia National Regional State",
    "To enhance the organizational capacities of member organizations for the social and economic development activities that they undertake",
    "To nurture and promote members' collective engagements for constructive policy dialogues as well as for voicing for the interest of the voiceless and the marginalized population",
    "To promote peace, human rights, and good governance activities in the Oromia National Regional State",
    "To promote the democratization process in the country in general and in the Oromia National Regional State in particular through coordination of members' engagements in the National/Regional election processes",
    "To enhance NeCSOO members' Ethical Standards and Code of Conduct",
    "To promote the development partnerships with the Regional Government of Oromia, pertinent Federal Government organs, and with other regional, national, and global CSO Networks and the private sector organizations"
  ];

  const engagementAreas = [
    {
      title: "Promoting Enabling Environment",
      content: "Promoting enabling environment for CSOs' holistic development contributions in Oromia through hardware and software interventions, as the third-sector entities."
    },
    {
      title: "Development Partnerships",
      content: "Advancing a true development partnership between CSOs and other development actors",
      list: [
        "The Government",
        "Donor Partners",
        "The Private Sector Organizations",
        "Faith-based/religious Organizations",
        "Indigenous Social Structures like with Abba Gadaas and Haadha Siiqqees",
        "The Media"
      ]
    },
    {
      title: "Supporting Marginalized Groups",
      content: "Voicing for the voiceless and the marginalized section of the population",
      list: [
        "Poor women and men",
        "Women suffering from the result of gender inequalities",
        "Destitute and neglected children",
        "The elderly",
        "Unemployed youth",
        "People with physical disabilities",
        "Ethnic minority",
        "Internally displaced people",
        "Refugees"
      ]
    },
    {
      title: "Peace Promotion",
      content: "Promoting peace and peaceful coexistence among ethnic groups and different social groups",
      list: [
        "Promoting intra-and inter-ethnic/social groups' peaceful co-existence",
        "Facilitating establishment of people-to-people peace-maintaining structures",
        "Complementing with and supporting the existing peace-building initiatives",
        "Using an indigenous conflict resolution, peace-building and peaceful co-existence mechanisms"
      ]
    },
    {
      title: "Supporting Democratization",
      content: "Supporting the democratization process and genuine participation of citizens",
      list: [
        "Supporting voters' education processes",
        "Supporting and mobilizing members and other CSOs in election observation",
        "Supporting and mobilizing members for election monitoring and evaluation"
      ]
    },
    {
      title: "Good Governance",
      content: "Promoting good governance and accountability in public service deliveries",
      list: [
        "Organizing evidence-based policy dialogues on quality of public service",
        "Organizing training programs for duty-bearers",
        "Organizing awareness-raising workshops for right-holders",
        "Facilitating informed engagements of members"
      ]
    },
    {
      title: "Coordination & Support",
      content: "Coordinating and supporting members' engagement in humanitarian response",
      list: [
        "Coordinating members' advocacy through thematic forums",
        "Members' capacity building",
        "Facilitating information and experience-sharing",
        "Provision of project funds through members"
      ]
    },
    {
      title: "Ethical Practices",
      content: "Enhancing ethical practices and accountabilities among members",
      list: [
        "Putting in place self-regulation mechanisms",
        "Establishing NeCSOO Code of Ethics implementation Committee",
        "Facilitating the functioning of the Committee",
        "Linking with CSOs' regulatory body"
      ]
    },
    {
      title: "Research & Studies",
      content: "Conducting/coordinating research and studies for evidence-based policy dialogues and advocacy activities"
    },
    {
      title: "Global Networking",
      content: "Networking with regional, national, and global CSO/NGO Networks",
      list: [
        "CSO/NGOs spaces",
        "Climate change and its consequences",
        "Human trafficking",
        "IDPs and refugees",
        "Gender inequalities",
        "Global development inequalities",
        "Ethnic-minority rights",
        "Globalization and cultural rights"
      ]
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
            Organizational Objectives & Engagement Areas
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
            Our strategic objectives and key areas of engagement for sustainable development in Oromia
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Section>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 6,
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
            Organizational Objectives
          </Typography>
          <List>
            {objectives.map((objective, index) => (
              <StyledListItem key={index}>
                <ListItemIcon>
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText primary={objective} />
              </StyledListItem>
            ))}
          </List>
        </Section>

        <Section>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 6,
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
            Engagement Areas
          </Typography>
          <Box>
            {engagementAreas.map((area, index) => (
              <StyledAccordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#01B7EA' }} />}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    {area.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#4B5563',
                      mb: area.list ? 2 : 0,
                      lineHeight: 1.7
                    }}
                  >
                    {area.content}
                  </Typography>
                  {area.list && (
                    <List disablePadding>
                      {area.list.map((item, itemIndex) => (
                        <StyledListItem key={itemIndex}>
                          <ListItemIcon>
                            <ArrowForwardIcon />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </StyledListItem>
                      ))}
                    </List>
                  )}
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default Objectives;
