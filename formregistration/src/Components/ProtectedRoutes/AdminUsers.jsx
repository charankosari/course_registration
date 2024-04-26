import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wholecss.css'; // Import CSS file for styling

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users data when the component mounts
        axios.get('http://localhost:9999/every-detail')
            .then(response => {
                setUsers(response.data); // Set the users state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="admin-users-container">
            
            <div style={{display:'flex',justifyContent:'center'}}>
               <h1> Users</h1>
               </div>
            <div className="users-grid">
                {users.map((user, index) => (
                    <div key={index} className="user-card">
                        <p><strong>Student name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>College Name:</strong> {user.college}</p>
                        <p><strong>Roll:</strong> {user.roll}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Role:</strong> {user.role || 'User'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminUsers;
