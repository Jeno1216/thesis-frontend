import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';

function Register() {

    const [officerID, setOfficerID] = useState();
    const [officerName, setOfficerName] = useState("");
    const [officerPosition, setOfficerPosition] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = { officer_id: officerID, officer_name: officerName, officer_position: officerPosition, username: username, password: password };
      const response = await axios.post('http://localhost:8000/register', data);
      
      if (response.data.result == "User Exists."){
        toast.error('User already exists.', {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
      }
      else if(response.data.result == "User Registered."){
        toast.success('User registered.', {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
        window.location.href = "/login";

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
                            <i className="bi-person-badge text-light-emphasis" style={{position: 'absolute', top: '10px', left: '10px', fontWeight: '300'}}></i>
                            <input style={{width: '100%', outline: 'none', fontSize: '16px', fontWeight: '300', paddingLeft: '30px'}} className='border rounded-5 py-2 px-5' type="text" value={officerID} onChange={e => setOfficerID(e.target.value)}  placeholder="Officer ID" />
                        </div>

                        <div style={{position: 'relative'}} className='w-100 mt-2'>
                            <i className="bi-person-add text-light-emphasis" style={{position: 'absolute', top: '10px', left: '10px', fontWeight: '300'}}></i>
                            <input style={{width: '100%', outline: 'none', fontSize: '16px', fontWeight: '300', paddingLeft: '30px'}} className='border rounded-5 py-2 px-5' type="text" value={officerName} onChange={e => setOfficerName(e.target.value)}  placeholder="Officer Name" />
                        </div>

                        <div style={{position: 'relative'}} className='w-100 mt-2'>
                            <i className="bi-diagram-2 text-light-emphasis" style={{position: 'absolute', top: '10px', left: '10px', fontWeight: '300'}}></i>
                            <input style={{width: '100%', outline: 'none', fontSize: '16px', fontWeight: '300', paddingLeft: '30px'}} className='border rounded-5 py-2 px-5' type="text" value={officerPosition} onChange={e => setOfficerPosition(e.target.value)}  placeholder="Officer Position" />
                        </div>

                        <div style={{position: 'relative'}} className='w-100 mt-2'>
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
                            <Link to="/login" className='p-0 text-decoration-none text-dark' style={{fontSize: '12px'}}>Already have an account?</Link>
                            <p className='p-0' style={{fontSize: '12px'}}></p>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Register