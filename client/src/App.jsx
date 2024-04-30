import React, { useState } from 'react'
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import {
  Route, Routes, BrowserRouter as Router
} from 'react-router-dom'
import Signin from './components/userauth/Signin';
import Signup from './components/userauth/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Feed from './components/feed/Feed';
import PartnerProfile from './components/profiles/PartnerProfile';

function App() {
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/partner/:id" element={<PartnerProfile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
