import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Bookings from './components/Bookings';
import Trips from './components/Trips';
import History from './pages/History';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Admin from './components/Admin';
import PendingTrips from './pages/PendingTrips';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginToken, setLoginToken] = useState('')
  const [userData, setUserData] = useState('')
  const [bookConfirm, setBookConfirm] = useState(false)


  return (
    <main className='relative h-screen bg-gray-50 dark:bg-gray-900'>
      <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoginToken={setLoginToken} userData={userData} />
        <Routes>
          <Route
            exact path='/'
            element={
                isLoggedIn ? 
                <Home
                userData={userData}
                loginToken={loginToken}
                />
              : <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setLoginToken={setLoginToken}
                setUserData={setUserData}
                />
            } />
          <Route path='admin' element={<Admin />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='bookings' element={<Bookings />}></Route>
          <Route path='trips' element={<Trips />}></Route>
          <Route path='pending_trips' 
                  element={<PendingTrips 
                  loginToken={loginToken} 
                  userData={userData}
                  bookConfirm={bookConfirm}
                  setBookConfirm={setBookConfirm} />}></Route>
          <Route path='history' element={<History loginToken={loginToken} userData={userData} />}></Route>
          <Route path='settings' element={<Settings loginToken={loginToken} userData={userData} setUserData={setUserData} />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
