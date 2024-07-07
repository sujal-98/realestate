import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Userpage from './pages/userpage';
import Protexted from './routes/protexted';
import Account from './pages/account';
import Tc from './pages/tc';
import Sell from './pages/sell';
import Buy from './pages/buy';

function App() {
  const [userId, setUserId] = useState('');

  const handleChild = (dataFromChild) => {
    setUserId(dataFromChild);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/profile/:userId`} element={<Protexted>
          <Userpage props={userId} />
        </Protexted>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login onChildClick={handleChild} />} />
        <Route path="/account/:userId" element={<Protexted><Account /></Protexted>} />
        <Route path="/termsconditions" element={<Protexted><Tc /></Protexted>} />
        <Route path="/profile/sell/:userId" element={<Protexted><Sell /></Protexted>} />
        <Route path="/profile/buy/:userId" element={<Protexted><Buy props={userId} /></Protexted>} />
      </Routes>
    </Router>
  );
}

export default App;
