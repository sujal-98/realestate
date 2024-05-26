import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigation } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Userpage from './pages/userpage';


function App() {
  
  const {authenticate,setAuthenticate}=useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userpage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
