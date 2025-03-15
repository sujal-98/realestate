import React,{useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RentIcon from '@mui/icons-material/House';
import UploadIcon from '@mui/icons-material/Upload';
import TermsIcon from '@mui/icons-material/Gavel';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Toolbar from '@mui/material/Toolbar';
import NotificationDropdown from './NotificationDropdown';

const Lbar = ({ id }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const user = useSelector((state) => state.account.user);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleClick = (index) => () => {
    if (index === 0) {
      navigate(`/profile/${id}`);
    } else if (index === 1) {
      handleSave();
    } else if (index === 2) {
      navigate(`/profile/buy/${id}`);
    } else if (index === 3) {
      handleRent();
    }
  };

  const handleSell = () => {
    navigate(`/profile/sell/${id}`);
  };

  const handleRent = () => {
    navigate(`/profile/rent/${id}`);
  };

  const handleSave = () => {
    navigate(`/profile/save/${id}`);

  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate('/search', { state: { query: searchValue.trim() }  });
    }
  };

  const logout = (name) => {
    if (document.cookie.split(';').some(item => item.trim().startsWith(name + '='))) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    navigate('/')
  };
  const handleKeyDown = (event) => {
    console.log("I was called")
    if (event.key === 'Enter') {
      navigate('/search', { state: { query: searchValue } });
    }
  };
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // More translucent background
        backdropFilter: 'blur(12px)', // Blur effect
        padding: 2,
      }}
    >
      <div className='flex justify-start items-center mb-2 border-b border-gray-300 p-4'>
        <Avatar alt={user.username} src={`${user.profilePicture}`} sx={{ height: '60px', width: '60px', border: '2px solid #000' }} />
        <div className='ml-4'>
          <span className='text-lg font-semibold'>{user.username}</span>
          <p className='text-blue-500 cursor-pointer hover:underline' onClick={() => navigate(`/account/${id}`)}>View my Account</p>
        </div>
      </div>

      <List>
        {['Home', 'Saved Properties', 'Buy', 'Rent'].map((text, index) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick(index)} sx={{ transition: 'background-color 0.3s', borderRadius: '8px' }}>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : index === 1 ? <SaveIcon /> : index === 2 ? <ShoppingCartIcon /> : <RentIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
      <Divider />
      <List>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={handleSell} sx={{ transition: 'background-color 0.3s', borderRadius: '8px' }}>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Property" />
            </ListItemButton>
          </ListItem>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/termsconditions')} sx={{ transition: 'background-color 0.3s', borderRadius: '8px' }}>
              <ListItemIcon>
                <TermsIcon />
              </ListItemIcon>
              <ListItemText primary="Terms and Conditions" />
            </ListItemButton>
          </ListItem>
        </motion.div>
      </List>
    </Box>
  );

  return (
    <div>
      <motion.nav
        className="bg-slate-800 bg-opacity-60 backdrop-blur-md p-4 flex items-center justify-between shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="text-white font-bold text-2xl">Om Life Space</div>
        
        <div className="flex-grow mx-4 flex">
  <input
    type="text"
    placeholder="Search by location"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    onKeyDown={handleKeyDown}
    className="w-3/4 py-2 px-4 rounded-l-md bg-gray-100 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

</div>
        
        <div className="flex items-center gap-2">
          <Toolbar>
            <NotificationDropdown props={id} />
          </Toolbar>
          <Button
            variant="contained"
            color="error"
            onClick={() => { logout("token") }}
            sx={{ borderRadius: '8px', padding: '8px 16px', textTransform: 'none' }}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`/profile/${id}`)}
            sx={{ borderRadius: '8px', padding: '8px 16px', textTransform: 'none' }}
          >
            Home
          </Button>
          <Button onClick={toggleDrawer(true)} sx={{ color: 'white', fontSize: 32 }}>
            <MenuIcon />
          </Button>
        </div>
      </motion.nav>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Lbar;
