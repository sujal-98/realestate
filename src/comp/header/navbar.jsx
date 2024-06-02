import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  function handleRegister() {
    navigate('/register');
  }
  
  function handleLogin() {
    navigate('/login');
  }

  return (
    <nav className="bg-slate-600 bg-opacity-30 p-4 flex items-center justify-between relative z-4">
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
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2">Login</button>
        <button onClick={handleRegister} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2">Signup</button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">Home</button>
      </div>
    </nav>
  );
}

export default Navbar;
