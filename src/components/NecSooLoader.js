import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoaderWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  zIndex: 9999,
  animation: `${fadeIn} 0.3s ease-in-out`,
}));

const DotsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  marginBottom: theme.spacing(2),
}));

const Dot = styled('div')(({ delay, size = 'medium' }) => ({
  width: size === 'small' ? '8px' : size === 'large' ? '16px' : '12px',
  height: size === 'small' ? '8px' : size === 'large' ? '16px' : '12px',
  backgroundColor: '#1976d2',
  borderRadius: '50%',
  animation: `${bounce} 1.4s infinite ease-in-out both`,
  animationDelay: delay,
}));

const LoadingText = styled(Typography)(({ theme, size = 'medium' }) => ({
  fontSize: size === 'small' ? '1rem' : size === 'large' ? '1.5rem' : '1.25rem',
  fontWeight: 500,
  color: '#1976d2',
  letterSpacing: '0.1em',
  marginTop: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
  textTransform: 'none',
  opacity: 0.9,
}));

const NecSooLoader = ({ size = 'medium' }) => {
  return (
    <LoaderWrapper>
      <DotsWrapper>
        <Dot delay="0s" size={size} />
        <Dot delay="0.2s" size={size} />
        <Dot delay="0.4s" size={size} />
      </DotsWrapper>
      <LoadingText variant="h6" size={size}>
        NeCSOO
      </LoadingText>
    </LoaderWrapper>
  );
};

export default NecSooLoader;
