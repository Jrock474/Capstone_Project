import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css'

import MyNavbar from './components/TopNavbar'
import Login from './components/Login'
import News from './components/News'
import AboutUs from './components/AboutUs'
import Home from './components/Home';
import Registration from './components/Registration';

function App() {
  

  return (
    <>
      <div>
      <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          
          <Route path="/Login" element={<Login />} />
         
          <Route path="/News" element={<News />} />
        
          <Route path="/AboutUs" element={<AboutUs />} />

          <Route path="/Registration" element={<Registration />} />

          <Route path="/Login" element={<Login />} />
        
        </Routes>
     
      </div>
      
    </>
  )
}

export default App