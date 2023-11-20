import React, { useState } from 'react'
import { Link } from 'react-router-dom'; // Import the Link component from 'react-router-dom'
import './App.css'

function NavBar() {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility

  const handleButtonClick = () => {
      setIsVisible(!isVisible); // Toggle the visibility
  };

  const [isVisible2, setIsVisible2] = useState(false); // State to control visibility

  const handleButtonClick2 = () => {
      setIsVisible2(!isVisible2); // Toggle the visibility
  };


  return (
    <>
    <div className='w-100 d-flex shadow justify-content-between align-items-center px-lg-5 px-3' style={{height: '80px'}}>

        <div className=' d-flex p-lg-3'>
        <img src="logo.png" alt="" style={{width: '150px'}} />
        </div>

        <div className='d-lg-flex d-none h-100 justify-content-center align-items-center gap-4 p-3'>

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

        {/** Mid Screen View  */}
        <div className='d-lg-none d-md-flex d-none gap-2'>
        <div>
          <Link to='heatmap' className='btn btn-primary ' style={{textDecoration: 'none', color: 'white'}} >Sign up</Link>
        </div>

        <div>
          <Link to='heatmap' className='btn btn-outline-primary' style={{textDecoration: 'none'}} >Sign in</Link>
        </div>

        <div onClick={handleButtonClick}>
          <Link to='' className='btn btn-outline-primary' style={{textDecoration: 'none'}} ><i className='bi-list'></i></Link>
        </div>

        </div>

            {/** Small Screen View  */}
            <div className='d-lg-none d-md-none d-flex gap-2'>

        <div onClick={handleButtonClick2}>
          <Link to='' className='btn btn-outline-primary' style={{textDecoration: 'none'}} ><i className='bi-list'></i></Link>
        </div>

        </div>

    </div>

    {isVisible && ( 
    <div className='position-fixed w-25 d-flex justify-content-center align-items-center p-2' style={{zIndex: '99999', right: '0'}}>
        <div className='d-flex bg-light w-100 d-flex justify-content-center text-center align-items-center rounded p-3'>
        <div className='d-flex flex-column gap-3 '>
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
        </div>

        </div>
    </div>
    )}

{isVisible2 && ( 
    <div className='w-100 d-flex justify-content-center align-items-center' style={{zIndex: '99999'}}>
        <div className='d-flex bg-light w-100 d-flex justify-content-center text-center align-items-center p-3'>
        <div className='d-flex flex-column gap-3 '>
          
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

        <div className='d-flex  gap-2'>
        <div>
          <Link to='heatmap' className='btn btn-primary ' style={{textDecoration: 'none', color: 'white'}} >Sign up</Link>
        </div>

        <div>
          <Link to='heatmap' className='btn btn-outline-primary' style={{textDecoration: 'none'}} >Sign in</Link>
        </div>
        </div>
        </div>

        </div>
    </div>
    )}
    </>
  )
}

export default NavBar