import React, { useEffect, useState, useCallback } from 'react';
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
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

const ImageContainer = styled(Box)({
  width: '100%',
  height: 70,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ProjectImage = styled('img')({
  width: 100,
  height: 70,
  objectFit: 'cover',
  borderRadius: 4,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

const DescriptionPreview = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: 1.5,
  maxWidth: '400px'
}));

const DateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5)
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  minHeight: 400,
  '& .MuiTable-root': {
    tableLayout: 'fixed',
  },
  '& .image-cell': {
    width: 120,
    padding: theme.spacing(1),
  }
}));

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    location: '',
    duration: '',
    budget: '',
    partners: [],
    progress: 0,
    impact: [],
    objectives: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [inputStates, setInputStates] = useState({
    partners: '',
    impact: '',
    objectives: ''
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/projects');
      const sortedProjects = response.data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(project => ({
          ...project,
          partners: project.partners ? 
            (typeof project.partners === 'string' ? JSON.parse(project.partners) : project.partners) : [],
          impact: project.impact ? 
            (typeof project.impact === 'string' ? JSON.parse(project.impact) : project.impact) : [],
          objectives: project.objectives ? 
            (typeof project.objectives === 'string' ? JSON.parse(project.objectives) : project.objectives) : []
        }));
      setProjects(sortedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to fetch projects');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = useCallback((project = null) => {
    if (project) {
      setIsEditing(true);
      const partners = project.partners ? 
        (typeof project.partners === 'string' ? JSON.parse(project.partners) : project.partners) : [];
      const impact = project.impact ? 
        (typeof project.impact === 'string' ? JSON.parse(project.impact) : project.impact) : [];
      const objectives = project.objectives ? 
        (typeof project.objectives === 'string' ? JSON.parse(project.objectives) : project.objectives) : [];

      setCurrentProject({
        ...project,
        partners: partners,
        impact: impact,
        objectives: objectives
      });

      // Set input states
      setInputStates({
        partners: partners.join(', '),
        impact: impact.join(', '),
        objectives: objectives.join(', ')
      });

      setSelectedImage(null);
    } else {
      setCurrentProject({
        title: '',
        category: '',
        description: '',
        image: '',
        location: '',
        duration: '',
        budget: '',
        partners: [],
        progress: 0,
        impact: [],
        objectives: []
      });
      setInputStates({
        partners: '',
        impact: '',
        objectives: ''
      });
      setIsEditing(false);
      setSelectedImage(null);
    }
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setIsEditing(false);
    setSelectedImage(null);
    setCurrentProject({
      title: '',
      category: '',
      description: '',
      image: '',
      location: '',
      duration: '',
      budget: '',
      partners: [],
      progress: 0,
      impact: [],
      objectives: []
    });
    setInputStates({
      partners: '',
      impact: '',
      objectives: ''
    });
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setCurrentProject({ ...currentProject, image: file });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentProject.title || !currentProject.category) {
      setSnackbarMessage('Title and Category are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', currentProject.title);
    formData.append('description', currentProject.description || '');
    formData.append('category', currentProject.category);
    formData.append('location', currentProject.location || '');
    formData.append('duration', currentProject.duration || '');
    formData.append('budget', currentProject.budget || '');
    formData.append('partners', JSON.stringify(currentProject.partners || []));
    formData.append('progress', currentProject.progress || 0);
    formData.append('impact', JSON.stringify(currentProject.impact || []));
    formData.append('objectives', JSON.stringify(currentProject.objectives || []));

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.post(`/projects/${currentProject.id}?_method=PUT`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post('/projects', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      const savedProject = {
        ...response.data,
        image: response.data.image ? `http://localhost:8000/storage/${response.data.image}` : null
      };
      
      setSnackbarMessage(isEditing ? 'Project updated successfully!' : 'Project added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchProjects();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving project:', error);
      setSnackbarMessage('Failed to save the project.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const deleteProject = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this project?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/projects/${id}`);
      fetchProjects();
      setSnackbarMessage('Project deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error deleting project.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const categories = ['ongoing', 'completed', 'upcoming'];

  if (loading) {
    return <NecSooLoader size="small" />;
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              color: '#111827',
              mb: 1
            }}
          >
            Project Management
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6B7280',
              maxWidth: 600
            }}
          >
            Manage your organization's projects. Add new projects, edit existing ones, or remove outdated projects.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem'
          }}
        >
          Add New Project
        </Button>
      </Box>

      <StyledPaper>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Title & Description</TableHeaderCell>
                <TableHeaderCell className="image-cell" align="center">Image</TableHeaderCell>
                <TableHeaderCell align="center">Category</TableHeaderCell>
                <TableHeaderCell align="center">Details</TableHeaderCell>
                <TableHeaderCell align="center">Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : projects
              ).map((project) => (
                <TableRow 
                  key={project.id}
                  sx={{ '&:hover': { backgroundColor: '#F9FAFB' } }}
                >
                  <TableBodyCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {project.title}
                    </Typography>
                    <DescriptionPreview>
                      {project.description}
                    </DescriptionPreview>
                    <DateText>
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </DateText>
                  </TableBodyCell>
                  <TableBodyCell className="image-cell" align="center">
                    <ImageContainer>
                      {project.image ? (
                        <ProjectImage
                          src={`http://localhost:8000/storage/${project.image}`}
                          alt={project.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No image
                        </Typography>
                      )}
                    </ImageContainer>
                  </TableBodyCell>
                  <TableBodyCell align="center">
                    <Chip 
                      label={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      color={
                        project.category === 'ongoing' ? 'primary' :
                        project.category === 'completed' ? 'success' :
                        'warning'
                      }
                      size="small"
                    />
                  </TableBodyCell>
                  <TableBodyCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2">{project.location}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon fontSize="small" color="action" />
                        <Typography variant="body2">{project.duration}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimelineIcon fontSize="small" color="action" />
                        <Typography variant="body2">{project.progress}% Complete</Typography>
                      </Box>
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton 
                          color="primary" 
                          onClick={() => handleOpenDialog(project)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          color="error" 
                          onClick={() => deleteProject(project.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableBodyCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableBodyCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Typography variant="body1" color="textSecondary">
                      No projects found.
                    </Typography>
                  </TableBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <TablePagination
          component="div"
          count={projects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </StyledPaper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={currentProject.title}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentProject.category}
                  label="Category"
                  onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={currentProject.location}
                onChange={(e) => setCurrentProject({ ...currentProject, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration"
                value={currentProject.duration}
                onChange={(e) => setCurrentProject({ ...currentProject, duration: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budget"
                value={currentProject.budget}
                onChange={(e) => setCurrentProject({ ...currentProject, budget: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Partners (comma-separated)"
                multiline
                rows={2}
                value={inputStates.partners}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputStates(prev => ({ ...prev, partners: value }));
                  setCurrentProject(prev => ({
                    ...prev,
                    partners: value ? value.split(',').map(p => p.trim()).filter(p => p.length > 0) : []
                  }));
                }}
                helperText="Type partner names separated by commas. Spaces are allowed in names."
                placeholder="Partner One, Partner Two, Partner Three"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Impact Points (comma-separated)"
                multiline
                rows={2}
                value={inputStates.impact}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputStates(prev => ({ ...prev, impact: value }));
                  setCurrentProject(prev => ({
                    ...prev,
                    impact: value ? value.split(',').map(i => i.trim()).filter(i => i.length > 0) : []
                  }));
                }}
                helperText="Type impact points separated by commas. Spaces are allowed in text."
                placeholder="First Impact Point, Second Impact Point"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Objectives (comma-separated)"
                multiline
                rows={2}
                value={inputStates.objectives}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputStates(prev => ({ ...prev, objectives: value }));
                  setCurrentProject(prev => ({
                    ...prev,
                    objectives: value ? value.split(',').map(o => o.trim()).filter(o => o.length > 0) : []
                  }));
                }}
                helperText="Type objectives separated by commas. Spaces are allowed in text."
                placeholder="First Objective, Second Objective"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Progress (%)"
                value={currentProject.progress}
                onChange={(e) => setCurrentProject({ 
                  ...currentProject, 
                  progress: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                })}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 1 }}
              >
                Upload New Image
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {selectedImage && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  Selected: {selectedImage.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
          >
            {isEditing ? 'Save Changes' : 'Add Project'}
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
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectManagement;
