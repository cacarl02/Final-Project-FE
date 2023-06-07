import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBusAlt } from 'react-icons/fa';

function Navbar(props) {
  const { isLoggedIn, setIsLoggedIn, setLoginToken, userData } = props
  const navigate = useNavigate();
  const logout = async () => {
    try{
      await fetch('https://para-app-fe.onrender.com/logout', {
        method : "POST",
        headers : {"Content-type": "application/json"}
      })
      setLoginToken('')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      navigate('/')
    }
    catch(error){
      console.error(error)
    }
    setIsLoggedIn(false)
  }
  const Nav = () => {
    return ( isLoggedIn ?
    <nav className='flex items-center justify-between p-4 bg-blue-500'>
      <div className='flex items-center space-x-4'>
          <Link to='/' className='text-red-500 text-3xl mr-10'><FaBusAlt /></Link>
          {
            (userData.role && userData.is_verified) && userData.role != 'admin' &&
            <>
              <Link to="/pending_trips" className='text-white hover:text-gray-200'>Pending Trips</Link>
              <Link to="/history" className='text-white hover:text-gray-200'>History</Link>      
            </>
          }
      </div>
      <div className='flex items-center space-x-4'>
          <Link to="/settings" className='text-white hover:text-gray-200'>Settings</Link>
          <button onClick={logout} className='text-white hover:text-gray-200'>Logout</button>
      </div>
    </nav> : <></>
  )}
  return (
    <>
      <Nav />
    </>
  );
}

export default Navbar;
