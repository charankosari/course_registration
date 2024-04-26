import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import the converted CSS file

const Unauthorized = () => {
    return (
        <div className="unauthorized-container">
            <div className="unauthorized-content">
                <h1 className="unauthorized-title">Unauthorized Access</h1>
                <p className="unauthorized-message">You are not authorized to access this page.</p>
                <p className="unauthorized-message">Please <Link to="/" className="unauthorized-link">go back</Link> to the homepage.</p>
            </div>
        </div>
    );
};

export default Unauthorized;
