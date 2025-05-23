import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleRegister = () => navigate('/register');
  const handleLogin = () => navigate('/login');
  const handleKeyDown = (event) => {
    console.log("I was called")
    if (event.key === 'Enter') {
      navigate('/search', { state: { query: searchValue ,key: searchValue.trim() }});
    }
  };

  return (
    <nav className="bg-slate-300 p-4 relative z-10 bg-opacity-1">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-bold text-xl">Om Life Space</div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-grow justify-between ml-4">
            {/* Search Bar */}
            <div className="relative w-1/2 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-white/75 hover:bg-white/65 
                         text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
                placeholder="Search..."
                value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    onKeyDown={handleKeyDown}
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button onClick={handleLogin} 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Login
              </button>
              <button onClick={handleRegister} 
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
                Signup
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-white/75 
                       text-gray-900 placeholder-gray-500 focus:outline-none"
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={handleLogin} 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Login
            </button>
            <button onClick={handleRegister} 
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
              Signup
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
              Home
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;