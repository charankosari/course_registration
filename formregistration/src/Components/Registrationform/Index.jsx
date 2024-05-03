import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Index.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility
 const [gender, setGender] = useState(''); // State for gender
  const [dob, setDob] = useState(''); // State for date of birth
  const [address, setAddress] = useState(''); // State for address
  const [pincode, setPincode] = useState(''); // State for pincode
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:9999/course-register', {
        name: user.name,
        roll: user.roll,
        CourseName: courseN.name,
        College: user.college,
        email: user.email,
        phone: user.phone,
        birthday: dob,
        gender: gender,
        address: address,
        pincode: pincode
      });

      console.log('Course registered successfully:', response);

      setTimeout(() => {
        setIsLoading(false); // Deactivate loader after registration process
        navigate('/')
      }, 2000);

      toast.success(`course registration success`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error registering user:', error.response);

      toast.warn(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const user = location.state && location.state.key1;
  const courseN = location.state && location.state.key;

  return (
    <div className="registration-form-container">
      {/* Loader component */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <div style={{ color: 'white' }}>Registering...</div>
        </div>
      )}

      <h2 className="form-title">Registration Form</h2>
      <p className="course-info">Course: {courseN.name}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label">Name:</label>
          <input type="text" id="name" name="name" defaultValue={user.name} className="input" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input type="email" id="email" name="email" defaultValue={user.email} className="input" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="roll" className="label">Roll:</label>
          <input type="text" id="roll" name="roll" defaultValue={user.roll} className="input" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="college" className="label">College:</label>
          <input type="text" id="college" name="college" defaultValue={user.college} className="input" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="number" className="label">Mobile number</label>
          <input type="number" id="number" name="course" defaultValue={user.phone} className="input" disabled />
        </div>
        <div className="form-group">
        <label htmlFor="gender" className="label">Gender:</label>
        <select id="gender" name="gender" required value={gender} onChange={(e) => setGender(e.target.value)} className="input">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dob" className="label" >Date of Birth:</label>
        <input type="date" id="dob" name="dob" required value={dob} onChange={(e) => setDob(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="label">Address:</label>
        <textarea id="address" name="address" required value={address} onChange={(e) => setAddress(e.target.value)} className="input"></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="pincode" className="label">Pincode:</label>
        <input type="text" id="pincode" name="pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} className="input" />
      </div>
        <div className="form-group">
          <label htmlFor="course" className="label">Course Name:</label>
          <input type="text" id="course" name="course" required defaultValue={courseN.name} className="input" disabled />
        </div>
        <button type="submit" className="submit-btn">Register Now</button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default RegistrationForm;
