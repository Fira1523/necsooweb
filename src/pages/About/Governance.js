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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

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
  '& svg': {
    fontSize: 32,
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
  '& .MuiListItemText-secondary': {
    color: '#4B5563',
    marginTop: theme.spacing(0.5),
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  '& .MuiTableCell-head': {
    backgroundColor: '#01B7EA',
    color: '#FFFFFF',
    fontWeight: 600,
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    '&:last-child': {
      borderRight: 'none'
    }
  },
  '& .MuiTableCell-root': {
    padding: theme.spacing(2),
    borderRight: '1px solid rgba(224, 224, 224, 1)',
    '&:last-child': {
      borderRight: 'none'
    }
  },
  '& .MuiTableRow-root:nth-of-type(even)': {
    backgroundColor: '#F9FAFB',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: 'rgba(1, 183, 234, 0.04)',
  },
  '& .MuiTable-root': {
    borderCollapse: 'separate',
    borderSpacing: 0,
  }
}));

const Governance = () => {
  const governanceStructure = [
    {
      title: "General Assembly",
      description: "The highest echelon of the governance structure and makes the supreme decision-making body of the Network.",
      icon: <GroupsIcon />,
      responsibilities: [
        "Supreme decision-making authority",
        "Composed of representatives from all member organizations",
        "Elects the Board of Directors",
        "Makes major organizational decisions"
      ]
    },
    {
      title: "Board of Directors",
      description: "Five-member board elected from member organizations that sets and oversees the strategic direction of the Network and the NeCSOO Secretariat.",
      icon: <AccountBalanceIcon />,
      responsibilities: [
        "Sets strategic direction",
        "Oversees Network operations",
        "Supervises the Secretariat",
        "Ensures organizational compliance"
      ]
    },
    {
      title: "NeCSOO Secretariat",
      description: "Led by the Executive Director, responsible for implementation of organizational plans and day-to-day operations.",
      icon: <PersonIcon />,
      responsibilities: [
        "Implements organizational plans",
        "Manages daily operations",
        "Realizes Network's vision and mission",
        "Achieves strategic objectives"
      ]
    }
  ];

  const membershipInfo = {
    currentMembers: "73 member organizations engaged in humanitarian and development activities",
    eligibility: "Open to CSOs operating in any region of the country, provided they have at least one project in Oromia",
    composition: "Members include organizations operating exclusively in Oromia National Regional State (ONRS) as well as those operating in multiple regions"
  };

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
            Governance Structure & Members
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
            A three-tier governance structure ensuring effective leadership and inclusive membership
          </Typography>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <Section>
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
            Governance Structure
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4B5563',
              mb: 6,
              lineHeight: 1.7,
              fontSize: '1.1rem'
            }}
          >
            NeCSOO has a three-tier governance structure consisting of the General Assembly, the Board, and the NeCSOO Secretariat. This structure ensures effective leadership and decision-making at all levels of the organization.
          </Typography>
          <Grid container spacing={4}>
            {governanceStructure.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledCard>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <IconWrapper sx={{ margin: '0 auto', mb: 2 }}>
                        {item.icon}
                      </IconWrapper>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: '#111827',
                          fontWeight: 600,
                          mb: 2
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#4B5563',
                          mb: 3
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <List disablePadding>
                      {item.responsibilities.map((responsibility, respIndex) => (
                        <StyledListItem key={respIndex}>
                          <ListItemIcon>
                            <StarIcon sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText primary={responsibility} />
                        </StyledListItem>
                      ))}
                    </List>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section>
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
            Members and Membership
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4B5563',
              mb: 6,
              lineHeight: 1.7,
              fontSize: '1.1rem'
            }}
          >
            NeCSOO continues to grow its network of member organizations, fostering collaboration and development across the region.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StyledCard>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <IconWrapper sx={{ margin: '0 auto' }}>
                    <GroupsIcon />
                  </IconWrapper>
                  <Typography variant="h3" sx={{ color: '#01B7EA', fontWeight: 700, mb: 2 }}>
                    73
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#111827', mb: 2 }}>
                    Member Organizations
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#4B5563' }}>
                    Active in humanitarian and development activities
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={8}>
              <StyledCard>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ color: '#111827', fontWeight: 600, mb: 3 }}>
                    Membership Criteria
                  </Typography>
                  <List disablePadding>
                    <StyledListItem>
                      <ListItemIcon>
                        <CircleIcon sx={{ fontSize: 8 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Regional Flexibility" 
                        secondary="Open to CSOs operating in any region of Ethiopia, with the requirement of having at least one project in Oromia"
                      />
                    </StyledListItem>
                    <StyledListItem>
                      <ListItemIcon>
                        <CircleIcon sx={{ fontSize: 8 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Diverse Membership" 
                        secondary="Members include organizations operating exclusively in Oromia as well as those with multi-regional presence"
                      />
                    </StyledListItem>
                    <StyledListItem>
                      <ListItemIcon>
                        <CircleIcon sx={{ fontSize: 8 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Growing Network" 
                        secondary="Actively accepting new member applications from qualified organizations"
                      />
                    </StyledListItem>
                  </List>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Section>

        <Section>
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
            Membership Criteria and Process of Facilitating Membership Admission*** to NeCSOO
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4B5563',
              mb: 6,
              lineHeight: 1.7,
              fontSize: '1.1rem'
            }}
          >
            Requirements and verification process for NeCSOO membership admission
          </Typography>
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: '5%' }}>S/N</TableCell>
                  <TableCell sx={{ width: '25%' }}>Criteria/Requirement</TableCell>
                  <TableCell sx={{ width: '35%' }}>Method of Presentation</TableCell>
                  <TableCell align="center" sx={{ width: '25%' }}>
                    Verification** (Fulfilled or Not)
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                      <Box sx={{ mr: 4 }}>Yes (✓)</Box>
                      <Box>No (✗)</Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: '10%' }}>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell>Having a legal personality</TableCell>
                  <TableCell>Attaching a new or renewed hard copy of the Legal Certificate to the Membership Application Form</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">2</TableCell>
                  <TableCell>Having an organizational bylaw/memorandum of association (MoA)</TableCell>
                  <TableCell>Attaching the organizational bylaw/MoA</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">3</TableCell>
                  <TableCell>Operating in the Oromia National Regional State at least with a one-year implementation of legally signed project with any government Office in the region</TableCell>
                  <TableCell>Attaching the signed project agreement</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">4</TableCell>
                  <TableCell>Submission of the latest year's external annual audit report</TableCell>
                  <TableCell>Attaching the latest year's external audit report</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">5</TableCell>
                  <TableCell>Accepting objectives of the Network</TableCell>
                  <TableCell>To be stated in the Covering Letter</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">6</TableCell>
                  <TableCell>Accepting the Code of Conduct (CoC) of NeCSOO and confirming observance of the same</TableCell>
                  <TableCell>To be stated in the Covering Letter</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">7</TableCell>
                  <TableCell>Readiness to pay membership fee regularly and on time</TableCell>
                  <TableCell>To be stated in the Covering Letter</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">8</TableCell>
                  <TableCell>Has the will to provide professional service to the Network, when required</TableCell>
                  <TableCell>To be stated in the Covering Letter</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">9</TableCell>
                  <TableCell>Filling of NeCSOO Membership Application Form</TableCell>
                  <TableCell>Submitting the filled Membership Application Form with Covering Letter and the required attachments, either in person or electronically through address indicated at the last page of the Membership Application Form</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
          <Box sx={{ mt: 3, color: '#4B5563' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              * Any CSO/NGO operating in the Oromia National Regional State (ONRS) at least with one project can apply for NeCSOO membership.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ** Verification will be made upon submission both by the NeCSOO staff and the representative of the applying CSO/NGO for the subsequent facilitation of the membership acceptance; or for the fulfillment of the remaining requirements. Upon the fulfillment of the requirements, NeCSOO Membership Committee might visit the Office of the applicant to make office-level physical verifications.
            </Typography>
            <Typography variant="body2">
              *** Membership admission will eventually be approved by the NeCSOO Board and the General Assembly and the NeCSOO Secretariat will facilitate the process of membership admission to.
            </Typography>
          </Box>
        </Section>
      </Container>
    </Box>
  );
};

export default Governance;
