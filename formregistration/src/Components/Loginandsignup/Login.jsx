import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:9999/login', {
        email: email,
        password: password
      });
  
      console.log('User logged successfully:', response.data);
      localStorage.setItem("user",response.data.user._id)
      navigate('/')
      // Do any additional handling here, such as redirecting the user
    } catch (error) {
      console.error('Error  user login:', error);
      // Handle any errors, such as displaying an error message to the user
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
    <div className="con">
      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <p>didnt had an account.? <Link to="/signup"  className='link'>Signup</Link></p>
        
        <button type="submit">Login</button>
      </form>

      <style>
        {`
        .link{
          text-decoration:none;
          color:#007bff;

        }
        .link:hover{
          text-decoration:underline;
        }
       body {
       
        background-image: radial-gradient(circle at 11% 37%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 50%,transparent 50%, transparent 56%,transparent 56%, transparent 100%),radial-gradient(circle at 82% 7%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 46%,transparent 46%, transparent 88%,transparent 88%, transparent 100%),radial-gradient(circle at 81% 79%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 33%,transparent 33%, transparent 89%,transparent 89%, transparent 100%),radial-gradient(circle at 68% 96%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 8%,transparent 8%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 69% 20%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 84%,transparent 84%, transparent 86%,transparent 86%, transparent 100%),radial-gradient(circle at 49% 22%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 71%,transparent 71%, transparent 78%,transparent 78%, transparent 100%),radial-gradient(circle at 23% 60%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 6%,transparent 6%, transparent 40%,transparent 40%, transparent 100%),radial-gradient(circle at 86% 33%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 13%,transparent 13%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 38% 60%, hsla(251,0%,28%,0.05) 0%, hsla(251,0%,28%,0.05) 15%,transparent 15%, transparent 61%,transparent 61%, transparent 100%),linear-gradient(0deg, hsl(167,0%,6%),hsl(167,0%,6%));
        background-repeat: no-repeat;
        background-size: cover;
      }
      
          
          .con {
            background-color:#f4f4f4;
            max-width: 500px;
            margin: 0 ;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 5px;
          }

          input {
            padding: 10px;
            width: 100%;

            border-radius: 5px;
            border: 1px solid #ccc;
          }

          button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
    </div>
  );
};

export default LoginPage;
