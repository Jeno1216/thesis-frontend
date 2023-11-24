import React from 'react'

function Login() {
  return (
    <>
    <div className='border d-flex' style={{height: '90vh'}}>
        <div className='w-100 d-flex justify-content-center align-items-center'>
            
            <div className='container border'>
                <div className='border col-12 row d-flex'>
                    <div className='col-6'>
                        <div>
                            <h1 style={{fontWeight: '900'}}>Log in</h1>
                            <p className='my-3' style={{fontWeight: 'normal'}}>Welcome. Enter your credentials.</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login