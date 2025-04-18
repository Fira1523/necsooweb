import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import NecSooLoader from '../../components/NecSooLoader';

import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  CircularProgress,
  TablePagination,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({ title: '', category: '', description: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/gallery', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Sort items by created_at in descending order (latest first)
      const sortedItems = response.data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setGalleryItems(sortedItems);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setSnackbarMessage('Error loading gallery items');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = { title: '', category: '', description: '', image: '' }) => {
    setCurrentItem(item);
    setIsEditing(!!item.id);
    setOpenDialog(true);
    setSelectedImage(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem({ title: '', category: '', description: '', image: '' });
    setSelectedImage(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentItem({ ...currentItem, image: file });
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentItem.title || !currentItem.category || (!isEditing && !currentItem.image)) {
      setSnackbarMessage('Title, Category, and Image are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', currentItem.title);
    formData.append('category', currentItem.category);
    formData.append('description', currentItem.description || '');
    if (currentItem.image instanceof File) {
      formData.append('image', currentItem.image);
    }

    try {
      if (isEditing) {
        await axios.post(`/gallery/${currentItem.id}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setSnackbarMessage('Gallery item updated successfully!');
      } else {
        if (!currentItem.image) {
          throw new Error('Image is required when adding a new gallery item');
        }
        const response = await axios.post('/gallery', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Server response:', response.data);
        setSnackbarMessage('Gallery item added successfully!');
      }
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchGalleryItems();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving gallery item:', error.response?.data || error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || 'Failed to save the gallery item.';
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const deleteGalleryItem = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/gallery/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchGalleryItems();
      setSnackbarMessage('Gallery item deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error deleting gallery item.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Match the categories with your Laravel validation
  const categories = ['events', 'training', 'community'];

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page
  };

  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedItems = galleryItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(galleryItems.length / rowsPerPage);

  if (loading) {
    return <NecSooLoader size="small" />;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#F9FAFB', minHeight: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#111827', mb: 1 }}>
            Gallery Management
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', maxWidth: 600 }}>
            Manage your gallery items. Add, edit, or remove images to showcase your organization's work.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2, px: 3, py: 1.5, textTransform: 'none', fontSize: '0.95rem' }}
        >
          Add New Image
        </Button>
      </Box>

      {/* Rows per page selector */}
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
          Total Items: {galleryItems.length}
        </Typography>
      </Box>

      <StyledPaper>
        {/* Pagination Controls - Moved to top */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2, 
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          backgroundColor: '#f8fafc'
        }}>
          <TablePagination
            component="div"
            count={galleryItems.length}
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell align="center">Image</TableHeaderCell>
                <TableHeaderCell align="center">Category</TableHeaderCell>
                <TableHeaderCell align="center">Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <TableRow key={item.id} sx={{ '&:hover': { backgroundColor: '#F9FAFB' } }}>
                    <TableBodyCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
                        {item.title}
                      </Typography>
                      {item.description && (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                          {item.description}
                        </Typography>
                      )}
                    </TableBodyCell>
                    <TableBodyCell align="center">
                      <Box
                        component="img"
                        src={`http://localhost:8000/storage/${item.image}`}
                        alt={item.title}
                        sx={{
                          width: 120,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 1,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                    </TableBodyCell>
                    <TableBodyCell align="center">
                      <CategoryChip label={item.category} />
                    </TableBodyCell>
                    <TableBodyCell align="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleOpenDialog(item)} sx={{ mr: 1 }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => deleteGalleryItem(item.id)}>
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
                      <AddPhotoAlternateIcon sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
                      <Typography variant="body1" color="textSecondary">
                        No gallery items found. Add your first image to get started.
                      </Typography>
                    </Box>
                  </TableBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
          {isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Title"
                fullWidth
                variant="outlined"
                value={currentItem.title}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentItem.category}
                  onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
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
                label="Description"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={currentItem.description || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
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
                  Upload Image
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
            {isEditing ? 'Save Changes' : 'Add Image'}
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

export default GalleryManagement;
