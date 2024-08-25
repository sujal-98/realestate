import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, InputBase, Button, Box } from '@mui/material';



const Navbar = () => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.75),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.65),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '40%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '40%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));



  const navigate = useNavigate();

  function handleRegister() {
    navigate('/register');
  }
  
  function handleLogin() {
    navigate('/login');
  }

  return (
    <nav className="bg-slate-600 bg-opacity-30 p-4 flex items-center justify-between  z-4">
      {/* Logo */}
      <div className="text-white font-bold text-xl">Om Life Space</div>

      {/* Search Bar */}
      <div className="flex-grow mx-4">
      <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

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
