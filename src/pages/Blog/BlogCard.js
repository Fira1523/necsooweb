// src/components/BlogCard.js

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  display: 'flex',
  height: '320px',
  boxShadow: 'none',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    '& .card-media': {
      transform: 'scale(1.03)',
    },
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '40%',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[100],
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#E1F5FE',
  color: '#01B7EA',
  fontWeight: 500,
  fontSize: '0.75rem',
  height: 24,
  borderRadius: theme.spacing(0.5),
  border: '1px solid #4FC3F7',
  '& .MuiChip-label': {
    padding: '0 10px',
  },
}));

const MetadataBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  '& .MuiSvgIcon-root': {
    fontSize: '0.875rem',
  },
}));

const BlogCard = ({ post, onClick, readingTime }) => {
  return (
    <StyledCard>
      <ImageWrapper>
        <StyledCardMedia
          className="card-media"
          component="img"
          image={`http://localhost:8000/storage/${post.image}`}
          alt={post.title}
          sx={{
            objectFit: 'cover',
          }}
        />
      </ImageWrapper>

      <CardContent sx={{ p: 3, width: '60%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2.5 }}>
          <CategoryChip
            label={post.category}
            size="small"
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.5,
            color: '#1F2937',
            fontSize: '1.125rem',
            letterSpacing: '-0.01em',
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.6,
            color: '#4B5563',
            fontSize: '0.875rem',
          }}
        >
          {post.content}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2.5,
            mt: 2.5,
            pt: 2.5,
            borderTop: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.06)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <MetadataBox>
              <CalendarTodayIcon />
              <Typography variant="caption" sx={{ fontWeight: 500, color: '#4B5563' }}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Typography>
            </MetadataBox>
            <MetadataBox>
              <AccessTimeIcon />
              <Typography variant="caption" sx={{ fontWeight: 500, color: '#4B5563' }}>
                {readingTime} min read
              </Typography>
            </MetadataBox>
          </Box>
          
          <Button
            onClick={onClick}
            sx={{
              minWidth: 'auto',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#01B7EA',
              '&:hover': {
                backgroundColor: '#E1F5FE',
              },
              textTransform: 'none',
            }}
          >
            Read More
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default BlogCard;
