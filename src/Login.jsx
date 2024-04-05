import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

// Function to set item with expiry in localStorage
function setWithExpiry(key, value, expiryInMinutes) {
    const now = new Date();
    const expiry = now.getTime() + expiryInMinutes * 60 * 1000; // Convert minutes to milliseconds
    const item = {
        value: value,
        expiry: expiry,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Function to get item and check its expiry
function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

function Login() {

    const key = 'officer_position';
    const value = getWithExpiry(key);

    console.log(value)
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Create a new FormData instance
      const formData = new FormData();
    
      // Append the username and password
      formData.append('username', username);
      formData.append('password', password);
    
      // Send the request
      const response = await axios.post('https://thesis-backend-41ta.onrender.com/login', formData);
      
      // Check if the response is successful
      if (response.data.access_token) {

        // Decode the token to get the user data
        const decodedToken = jwtDecode(response.data.access_token);
        const expiryInMinutes = 60; // Set your desired expiry time in minutes

        // Store the token in local storage with a 1 hour expiry
        setWithExpiry('token', response.data.access_token, expiryInMinutes);

        // Store the userdata from backend to local storage
        setWithExpiry('officer_id', decodedToken.officer_id, expiryInMinutes);
        setWithExpiry('officer_name', decodedToken.officer_name, expiryInMinutes);
        setWithExpiry('officer_position', decodedToken.officer_position, expiryInMinutes);
        setWithExpiry('username', decodedToken.username, expiryInMinutes);
        
        console.log(response.data.access_token)

        toast.success('Login Successfully.', {
            position: toast.POSITION.BOTTOM_CENTER // Change position here
          });
  

        // Redirect to the "/" page
        window.location.href = "/dashboard";

      } else {
        console.log('Failed to log in');
        toast.error('Unauthorized.', {
            position: toast.POSITION.BOTTOM_CENTER // Change position here
          });
  
      }
    }
  
  return (
    <>
    <div className=' d-flex' style={{height: '100vh', backgroundImage: 'url("bg.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className='w-100 d-flex justify-content-center align-items-start' style={{marginTop: '100px'}}>
            <div className=' container d-flex justify-content-center'>
                <div style={{backdropFilter: 'blur(10px)'}} className='row col-12 d-flex justify-content-center align-items-center'>
                    <form onSubmit={handleSubmit} className='col-lg-4 col-md-8 col-12 border rounded d-flex flex-column justify-content-center align-items-center'>
                        <div className='d-flex justify-content-center w-100'>
                            <img src="logo.png" style={{width: '200px'}} alt="" />
                        </div>
                        <div style={{position: 'relative'}} className='w-100'>
                            <i className="bi bi-person text-light-emphasis" style={{position: 'absolute', top: '10px', left: '10px', fontWeight: '300'}}></i>
                            <input style={{width: '100%', outline: 'none', fontSize: '16px', fontWeight: '300', paddingLeft: '30px'}} className='border rounded-5 py-2 px-5' type="text" value={username} onChange={e => setUsername(e.target.value)}  placeholder="Username" />
                        </div>
                        <div style={{position: 'relative'}} className='mt-2 w-100'>
                            <i className="bi-lock text-light-emphasis" style={{position: 'absolute', top: '10px', left: '10px', fontWeight: '300'}}></i>
                            <input style={{width: '100%', outline: 'none', fontSize: '16px', fontWeight: '300', paddingLeft: '30px'}} className='border rounded-5 py-2 px-5' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <div className='w-100 d-flex justify-content-center'>
                        <input type="submit" value="Submit" className='btn btn-primary rounded-5 px-5 py-2 mt-5 w-100' />
                        </div>

                        <div className='mt-2 w-100 d-flex justify-content-between'>
                            <Link to="/register" className='p-0 text-decoration-none text-dark' style={{fontSize: '12px'}}>Create Account</Link>
                            <p className='p-0' style={{fontSize: '12px'}}>Forgot Password?</p>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Login