import React from 'react'
import { Link } from 'react-router-dom'; // Import the Link component from 'react-router-dom'
import './App.css'

function NavBar() {
  return (
    <>
    <div className='w-100 d-flex shadow justify-content-between align-items-center px-5' style={{height: '80px'}}>

        <div className=' d-flex p-3'>
        <img src="logo.png" alt="" style={{width: '150px'}} />
        </div>

        <div className='d-flex  h-100 justify-content-center align-items-center gap-4 p-3'>

        <div className='' >
        <Link to='/' style={{textDecoration: 'none', color: 'black'}}>Route</Link>
        </div>

        <div>
        <Link to='heatmap' style={{textDecoration: 'none', color: 'black'}} >Heatmap</Link>
        </div>

        <div>
        <Link to='heatmap' style={{textDecoration: 'none', color: 'black'}} >About</Link>
        </div>

        <div>
        <Link to='heatmap' style={{textDecoration: 'none', color: 'black'}} >Help</Link>
        </div>

        <div className='d-flex gap-2'>
        <div>
          <Link to='heatmap' className='btn btn-primary ' style={{textDecoration: 'none', color: 'white'}} >Sign up</Link>
        </div>

        <div>
          <Link to='heatmap sign-in' className='btn btn-outline-primary' style={{textDecoration: 'none'}} >Sign in</Link>
        </div>

        </div>



        </div>

    </div>
    </>
  )
}

export default NavBar