import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import {
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArticleIcon from '@mui/icons-material/Article';
import NecSooLoader from '../../components/NecSooLoader';

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(2),
}));

const TableBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.875rem',
  padding: theme.spacing(2),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CategoryChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const ContentPreview = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  lineHeight: 1.5,
  maxWidth: '400px'
}));

const DateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5)
}));

const AdminBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState({ title: '', content: '', category: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [cachedPosts, setCachedPosts] = useState({});

  useEffect(() => {
    fetchBlogPosts();
  }, [page, rowsPerPage]);

  const fetchBlogPosts = async () => {
    // Don't show loading indicator on page changes if we have cached data
    if (!initialLoad) {
      if (cachedPosts[page]) {
        setBlogPosts(cachedPosts[page]);
        return;
      }
    }

    setLoading(true);
    try {
      const response = await axios.get(`/blogs?page=${page}&per_page=${rowsPerPage}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      const sortedPosts = response.data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      // Cache the sorted posts for this page
      setCachedPosts(prev => ({
        ...prev,
        [page]: sortedPosts
      }));

      setBlogPosts(sortedPosts);
      setTotalPosts(response.data.length);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setSnackbarMessage('Error loading blog posts');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const clearCache = () => {
    setCachedPosts({});
  };

  const handleOpenDialog = (post = { title: '', content: '', category: '', image: '' }) => {
    setCurrentPost(post);
    setIsEditing(!!post.id);
    setOpenDialog(true);
    setSelectedImage(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPost({ title: '', content: '', category: '', image: '' });
    setSelectedImage(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentPost({ ...currentPost, image: file });
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentPost.title || !currentPost.content || !currentPost.category) {
      setSnackbarMessage('Title, Content, and Category are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', currentPost.title);
    formData.append('content', currentPost.content);
    formData.append('category', currentPost.category);
    if (currentPost.image instanceof File) {
      formData.append('image', currentPost.image);
    }

    try {
      if (isEditing) {
        await axios.post(`/blogs/${currentPost.id}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setSnackbarMessage('Blog post updated successfully!');
      } else {
        await axios.post('/blogs', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setSnackbarMessage('Blog post added successfully!');
      }
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      clearCache(); // Clear cache when post is added/edited
      fetchBlogPosts();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving blog post:', error);
      setSnackbarMessage('Failed to save the blog post.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const deleteBlogPost = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      clearCache(); // Clear cache when post is deleted
      fetchBlogPosts();
      setSnackbarMessage('Blog post deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error deleting blog post.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page
  };

  const categories = ['News', 'Events', 'Updates', 'Articles'];

  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedPosts = blogPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(blogPosts.length / rowsPerPage);

  if (loading) {
    return <NecSooLoader size="small" />;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#F9FAFB', minHeight: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#111827', mb: 1 }}>
            Blog Management
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', maxWidth: 600 }}>
            Create and manage your blog posts. Share updates, news, and articles with your audience.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2, px: 3, py: 1.5, textTransform: 'none', fontSize: '0.95rem' }}
        >
          Add New Post
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Typography variant="body1" sx={{ color: '#374151' }}>
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          size="small"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
        <Typography variant="body2" sx={{ color: '#6B7280', ml: 2 }}>
          Total Posts: {totalPosts}
        </Typography>
      </Box>

      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Title & Preview</TableHeaderCell>
                <TableHeaderCell align="center">Category</TableHeaderCell>
                <TableHeaderCell align="center">Date</TableHeaderCell>
                <TableHeaderCell align="center">Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <TableRow key={post.id} sx={{ '&:hover': { backgroundColor: '#F9FAFB' } }}>
                    <TableBodyCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={`http://localhost:8000/storage/${post.image}`}
                          alt={post.title}
                          sx={{
                            width: 60,
                            height: 60,
                            objectFit: 'cover',
                            borderRadius: 1,
                            mr: 2
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                            {post.title}
                          </Typography>
                          <ContentPreview>{post.content}</ContentPreview>
                        </Box>
                      </Box>
                    </TableBodyCell>
                    <TableBodyCell align="center">
                      <CategoryChip label={post.category} />
                    </TableBodyCell>
                    <TableBodyCell align="center">
                      <DateText>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </DateText>
                    </TableBodyCell>
                    <TableBodyCell align="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleOpenDialog(post)} sx={{ mr: 1 }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => deleteBlogPost(post.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableBodyCell colSpan={4} align="center" sx={{ py: 8 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ArticleIcon sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary">
                        No blog posts found. Create your first post to get started.
                      </Typography>
                    </Box>
                  </TableBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <TablePagination
            component="div"
            count={totalPosts}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            sx={{
              '.MuiTablePagination-selectLabel': { 
                marginBottom: '0',
                marginTop: '0',
              },
              '.MuiTablePagination-displayedRows': {
                marginBottom: '0',
                marginTop: '0',
              },
              '.MuiTablePagination-select': {
                display: 'none'
              },
              '.MuiTablePagination-selectLabel': {
                display: 'none'
              },
            }}
          />
        </Box>
      </StyledPaper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, '& .MuiTypography-root': { fontWeight: 600, color: '#111827' } }}>
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Title"
                fullWidth
                variant="outlined"
                value={currentPost.title}
                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentPost.category}
                  onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={currentPost.content}
                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload Cover Image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {selectedImage && (
                  <Box
                    component="img"
                    src={selectedImage}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                      borderRadius: 1,
                      mt: 2
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#6B7280', '&:hover': { backgroundColor: '#F3F4F6' } }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ px: 3, borderRadius: 1, textTransform: 'none' }}
          >
            {isEditing ? 'Save Changes' : 'Publish Post'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminBlogPage;
