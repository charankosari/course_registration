import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Modal, TextField, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AdminCourse() {
  const [courses, setCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:9999/course-details');
      if (response.status === 200) {
        setCourses(response.data);
      } else {
        alert('There is a problem in your network. Please check it.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('An error occurred while fetching courses. Please try again later.');
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9999/courses/${id}`);
      if (response.status === 200) {
        fetchCourses();
      } else {
        alert('Failed to delete course. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('An error occurred while deleting course. Please try again later.');
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9999/courses', newCourse);
      if (response.status === 201) {
        fetchCourses();
        setShowAddCourseModal(false);
        setNewCourse({ name: '', description: '', image: '' });
      } else {
        alert('Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('An error occurred while adding course. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Admin - Manage Courses</h2>
      <Button variant="contained" color="primary" onClick={() => setShowAddCourseModal(true)}>Add Course</Button>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card variant="outlined">   
              <CardContent>
                <Typography variant="h5" component="h2">{course.name}</Typography>
               <div style={{objectFit:'cover'}}> <img src={course.image} alt={course.name} style={{ width: 'clamp(300px,8vw,350px)',aspectRatio:'auto ',height:'clamp(200px,8vw,300px)', marginTop: '10px' }} /></div>
                <Button variant="contained" color="error" onClick={() => deleteCourse(course._id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={showAddCourseModal} onClose={() => setShowAddCourseModal(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setShowAddCourseModal(false)}><CloseIcon /></IconButton>
          <Typography variant="h6" component="h3" style={{ marginBottom: '20px' }}>Add New Course</Typography>
          <form onSubmit={handleAddCourse}>
            <TextField label="Name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} fullWidth margin="normal" />
            <TextField label="Description" multiline rows={4} value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} fullWidth margin="normal" />
            <TextField label="Image URL" value={newCourse.image} onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>Add</Button>
            <Button variant="contained" onClick={() => setShowAddCourseModal(false)}>Cancel</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AdminCourse;
