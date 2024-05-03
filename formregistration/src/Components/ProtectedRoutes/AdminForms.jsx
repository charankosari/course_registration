import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wholecss.css'; // Import CSS file for styling

function AdminForms() {
    const [formDetails, setFormDetails] = useState([]);

    useEffect(() => {
        // Fetch form details data when the component mounts
        axios.get('http://localhost:9999/form-details')
            .then(response => {
                setFormDetails(response.data); // Set the form details state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching form details:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // Function to group form details by course name
    const groupByCourseName = () => {
        const groupedForms = {};
        formDetails.forEach(form => {
            if (!groupedForms[form.CourseName]) {
                groupedForms[form.CourseName] = [];
            }
            groupedForms[form.CourseName].push(form);
        });
        return groupedForms;
    };

    return (
        <div className="admin-forms-container">
             <div style={{display:'flex',justifyContent:'center'}}>
               <h1> Course Registered Forms</h1>
               </div>
            <div className="forms-container">
                {Object.entries(groupByCourseName()).map(([courseName, forms], index) => (
                    <div key={index} className="course-section">
                        <h2>{courseName}</h2>
                        <div className="forms-grid">
                        {forms.map((form, index) => (
    <div key={index} className="form-card">
        <p><strong>Student name:</strong> {form.name}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p><strong>Phone:</strong> {form.phone}</p>
        <p><strong>Roll:</strong> {form.roll}</p>
        <p><strong>College:</strong> {form.College}</p>
        <p><strong>Birthday:</strong> {form.birthday}</p>
        <p><strong>Gender:</strong> {form.gender}</p>
        <p><strong>Address:</strong> {form.address}</p>
        <p><strong>Pincode:</strong> {form.pincode}</p>
        <p><strong>Course Name:</strong> {form.CourseName}</p>
        <p><strong>Created At:</strong> {new Date(form.createdAt).toLocaleString()}</p>
    </div>
))}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminForms;
