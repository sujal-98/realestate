import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigation } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Userpage from './pages/userpage';
import { AuthProvider } from './context/authcon';
import Protexted from './routes/protexted';


function App() {
  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Protexted>
          <Userpage></Userpage>
        </Protexted>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
