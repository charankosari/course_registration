import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Main'
import LoginPage from './Components/Loginandsignup/Login';
import SignupPage from './Components/Loginandsignup/Signuppage';
import CourseDetails from './Components/View/CourseDetails';
import CourseRegister from './Components/Registrationform/Index';
import Adminpage from './Components/ProtectedRoutes/Adminpage';
import RequireAuth from './RequireAuth'
import Unauthorized from './Unauthorized';
import AdminUsers from './Components/ProtectedRoutes/AdminUsers';
import AdminForms from './Components/ProtectedRoutes/AdminForms';
import AdminCourse from './Components/ProtectedRoutes/AdminCourse';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/course" element={<CourseDetails/>} />
        <Route path="/registration-form" element={<CourseRegister/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Adminpage />} />
            <Route path="/admin-users" element={<AdminUsers />} />
            <Route path="/admin-forms" element={<AdminForms />} /> 
            <Route path="/add-courses" element={<AdminCourse />} /> 
       
          </Route>
      </Routes>
    </Router>
  );
};

export default App;
