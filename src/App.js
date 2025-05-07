import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import theme from './utils/theme';
import Navbar from './components/Navigation/Navbar';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import History from './pages/About/History';
import Vision from './pages/About/Vision';
import Objectives from './pages/About/Objectives';
import Governance from './pages/About/Governance';
import Gallery from './pages/Gallery/Gallery';
import Portfolio from './pages/Portfolio/Portfolio';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Admin/Dashboard';
import AdminBlogPage from './pages/Admin/AdminBlogPage';
import GalleryManagement from './pages/Admin/GalleryManagement';
import ProjectManagement from './pages/Admin/ProjectManagement';
import ScrollToTop from './components/ScrollToTop';
import Donate from './pages/Donate/Donate';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

// Styled Components
const Footer = styled(Box)(({ theme }) => ({
  background: '#1B2B4B',
  color: 'white',
  padding: theme.spacing(2, 0),
  marginTop: 'auto',
  '& .MuiTypography-h6': {
    marginBottom: theme.spacing(1.5)
  }
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
  display: 'block',
  padding: theme.spacing(0.5, 0),
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginTop: '64px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '56px',
  },
}));

const PublicLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Navbar />
      <MainContent component="main">
        {children}
      </MainContent>
      <ScrollToTop />
      <Footer>
        <Container maxWidth="lg" sx={{ py: isMobile ? 1.5 : 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: isMobile ? 2 : 2.5,
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
                  height: isMobile ? '60px' : '75px',
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
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                fontSize: isMobile ? '1.5rem' : '1.8rem'
              }}>
                NeCSOO
              </Typography>
            </Link>
          </Box>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontSize: isMobile ? '1.1rem' : '1.25rem', 
                fontWeight: 600, 
                mt: isMobile ? 1.5 : 0,
                mb: 1.5,
                color: '#fff' 
              }}>
                About NECSOO
              </Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.875rem' : '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                Network of Civil Society Organizations in Oromia (NECSOO) is dedicated to 
                strengthening civil society and promoting positive change in our communities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontSize: isMobile ? '1.1rem' : '1.25rem', 
                fontWeight: 600, 
                mt: isMobile ? 1.5 : 0,
                mb: 1.5,
                color: '#fff' 
              }}>
                Quick Links
              </Typography>
              <Stack spacing={isMobile ? 1 : 1.5} sx={{ 
                '& a': { 
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#fff',
                    textDecoration: 'underline'
                  }
                } 
              }}>
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about/history">About</FooterLink>
                <FooterLink href="/gallery">Gallery</FooterLink>
                <FooterLink href="/portfolio">Portfolio</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontSize: isMobile ? '1.1rem' : '1.25rem', 
                fontWeight: 600, 
                mt: isMobile ? 1.5 : 0,
                mb: 1.5,
                color: '#fff' 
              }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.875rem' : '1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.9)', mb: 2 }}>
                123 Main Street<br />
                Addis Ababa, Ethiopia<br />
                Email: info@necsoo.org<br />
                Phone: +251 123 456 789
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5,
                alignItems: 'center',
                mt: 1
              }}>
                <Typography variant="body2" sx={{ 
                  fontSize: isMobile ? '0.875rem' : '1rem', 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500
                }}>
                  Follow us:
                </Typography>
                <IconButton 
                  href="https://facebook.com/necsoo" 
                  target="_blank"
                  size="small"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    p: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#1877f2', // Facebook blue
                      transform: 'translateY(-3px)',
                      background: 'rgba(255, 255, 255, 0.15)'
                    }
                  }}
                >
                  <FacebookIcon sx={{ fontSize: isMobile ? 22 : 26 }} />
                </IconButton>
                <IconButton 
                  href="https://twitter.com/necsoo" 
                  target="_blank"
                  size="small"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    p: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#1da1f2', // Twitter blue
                      transform: 'translateY(-3px)',
                      background: 'rgba(255, 255, 255, 0.15)'
                    }
                  }}
                >
                  <TwitterIcon sx={{ fontSize: isMobile ? 22 : 26 }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ 
            mt: isMobile ? 2 : 3, 
            pt: isMobile ? 1 : 1.5, 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            textAlign: 'center' 
          }}>
            <Typography variant="body2" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              {new Date().getFullYear()} NECSOO. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Footer>
    </>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="/admin/gallery" element={<GalleryManagement />} />
          <Route path="/admin/projects" element={<ProjectManagement />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </AdminLayout>
    );
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/history" element={<History />} />
        <Route path="/about/vision" element={<Vision />} />
        <Route path="/about/objectives" element={<Objectives />} />
        <Route path="/about/governance" element={<Governance />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </PublicLayout>
  );
};

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;