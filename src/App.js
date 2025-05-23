import './App.css';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Userpage from './pages/userpage';
import Protexted from './routes/protexted';
import Account from './pages/account';
import Tc from './pages/tc';
import Sell from './pages/sell';
import Buy from './pages/buy';
import Rent from './pages/rent';
import Saved from './pages/Saved';
import Listing from './pages/listing';
import SearchResults from './pages/search';
import PasswordResetPage from './pages/resetPage';

function App() {
  const [userId, setUserId] = useState('');

  const handleChild = (dataFromChild) => {
    setUserId(dataFromChild);
  };

  return (
    
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login onChildClick={handleChild} />} />
 
        <Route path={`/profile/:userId`} element={
          <Userpage props={userId} />
        } />
        <Route path="/search" element={<SearchResults key={location?.state?.key}  />} />
        <Route path="/account/:userId" element={<Account props={userId}/>} />
        <Route path="/termsconditions" element={<Tc /> }/>
        <Route path="/profile/sell/:userId" element={<Sell id={userId}/>} />
        <Route path="/profile/buy/:userId" element={<Buy props={userId} />} />
        <Route path="/profile/rent/:userId" element={<Rent props={userId} />} />
        <Route path="/profile/save/:userId" element={<Saved props={userId} />} />
        <Route path="/profile/listing" element={<Listing/>} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />
      </Routes>
    </Router></Provider>
  );
}

export default App;
