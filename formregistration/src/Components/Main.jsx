import React, { useState, useEffect } from 'react';
import '../Styles/Main.css';
import NavBar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EngineeringCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:9999/course-details');
        if (response.status === 200) {
          setCourses(response.data);
          console.log(response);
        } else {
          alert('There is a problem in your network. Please check it.');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('An error occurred while fetching courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="container">
        <h2>Engineering Courses</h2>
        <div className="grid-container">
          {courses.map(course => (
            <div key={course._id} className="course-box"  onClick={() => navigate('/course', { state: { key: course } })}>
              <img src={course.image} alt={course.name} />
              <p>{course.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineeringCourses;
