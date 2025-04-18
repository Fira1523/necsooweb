import React from 'react';
import { Box, Typography, Container, Grid, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#1B2B4B', // Dark navy blue color
  color: '#fff',  // Light text for better readability
  padding: theme.spacing(4, 0), // Added more padding for spacious look
  marginTop: theme.spacing(5),
  borderTop: `2px solid ${theme.palette.primary.main}`, // Added border for separation
  '& a': {
    color: '#fff',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',  // White text color for links
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.main, // Highlight color on hover
  },
}));

const SocialMediaIcon = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  margin: theme.spacing(0, 1),
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          '&:hover img': {
            transform: 'scale(1.05)',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
          }
        }}>
          <Link href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo-necsoo.png"
              alt="NeCSOO Logo"
              style={{
                height: '75px',
                width: 'auto',
                marginRight: '15px',
                transition: 'all 0.3s ease',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <Typography variant="h5" sx={{ 
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '0.5px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              NeCSOO
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={3}> {/* Adjusted spacing for better separation */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              We are dedicated to making a positive impact in our community through various initiatives and programs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              Quick Links
            </Typography>
            <FooterLink href="/">Home</FooterLink><br />
            <FooterLink href="/about">About</FooterLink><br />
            <FooterLink href="/gallery">Gallery</FooterLink><br />
            <FooterLink href="/portfolio">Portfolio</FooterLink><br />
            <FooterLink href="/blog">Blog</FooterLink><br />
            <FooterLink href="/contact">Contact</FooterLink>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Email: info@necsoo.org<br />
              Phone: +251 123 456 789
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}> {/* Increased top margin for spacing */}
          <SocialMediaIcon href="https://facebook.com" target="_blank">
            <FacebookIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href="https://twitter.com" target="_blank">
            <TwitterIcon />
          </SocialMediaIcon>
          <SocialMediaIcon href="https://instagram.com" target="_blank">
            <InstagramIcon />
          </SocialMediaIcon>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, opacity: 0.7 }}>
          {new Date().getFullYear()} NeCSOO. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
