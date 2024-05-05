import React, { useState, createContext, useContext } from 'react';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';

const PopupContext = createContext();

const Navbar = () => {
  const [showlogin, setShowlogin] = useState(false);
  const [showsign, setShowsign] = useState(false);

  const togglelogin = () => {
    setShowlogin(!showlogin);
  };

  const togglesign = () => {
    setShowsign(!showsign);
  };

  return (
    <PopupContext.Provider value={{ showlogin, setShowlogin, showsign, setShowsign }}>
      <nav className="bg-slate-600 p-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-white font-bold text-xl">Om Life Space</div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-1/2 py-2 px-4 rounded-md bg-gray-200 text-black placeholder-black focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Buttons */}
        <div className="z-20">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2" onClick={togglelogin}>Login</button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2" onClick={togglesign}>Signup</button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Home</button>
        </div>

        {/* Render login and sign-up pop-up boxes conditionally */}
        {showlogin && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <Login />
            <div className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-lg z-10" />
          </div>
        )}
        {showsign && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <Signup />
            <div className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-lg z-10" />
          </div>
        )}
      </nav>
    </PopupContext.Provider>
  );
}

const usePopup = () => useContext(PopupContext);

export { Navbar, usePopup };