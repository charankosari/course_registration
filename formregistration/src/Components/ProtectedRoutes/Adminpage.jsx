import React from 'react';
import { Link } from 'react-router-dom';
import './Wholecss.css';

function AdminPage() {
    return (
        <div className="container">
            <h1>Admin Page</h1>
            <div className="options">
                <ul>
                    <li>
                        <Link to="/admin-users" className="button primary">View Users</Link>
                    </li>
                    <li>
                        <Link to="/add-courses" className="button secondary">Add Courses / Remove Courses</Link>
                    </li>
                    <li>
                        <Link to="/admin-forms" className="button danger">Registered courses</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminPage;
