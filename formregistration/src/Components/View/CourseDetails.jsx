// CourseDetails.jsx

import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './CourseDetails.css'; // Import the CSS file for styling
import NavBar from '../Navbar/Navbar';
import requestDetails from '../../Helper';

const CourseDetails = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const course = location.state && location.state.key;

  if (!course) {
    return <div>No course data found</div>;
  }
  
  const validator = async () => {
    try {
        const response = await requestDetails();
        if (response.status === 200) {
            // Navigate to the registration form with course data
            navigate('/registration-form', { state: { key: course,key1: response.data, } });
        } else {
            // Navigate to the login page
            navigate('/login');
        }
    } catch (error) {
        // Log the error
        console.error('Error:', error);
        // Navigate to the login page if an error occurs
        navigate('/login');
    }
};
  return (
    <div >
       <NavBar/>
    <div className="course-details-container">
      <div className="course-details-header">
        <h2>Course Details</h2>
      </div>
      <div className="course-details-content" >
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <img className="course-details-image" src={course.image} alt={course.name} />
        <button id="button" onClick={() => validator()}>
    <span id="button_lg">
        <span id="button_sl"></span>
        <span id="button_text">Register Now</span>
    </span>
</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <h3 className="course-details-title">{course.name}</h3>
          <p className="course-details-description">{course.description}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseDetails;


