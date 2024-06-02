import React from 'react'
import Text from '../comp/bheader/text';
import { Images } from './images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Navigate } from 'react-router-dom';


const Userpage = () => {
  const logout = (name) => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith(name + '='))) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }  
    window.location.reload()
  }

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    
  
  return (
    <div>
    
      <nav className="bg-slate-600 p-4 flex items-center justify-between relative z-4">
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
        <div className="z-20 flex items-center">
  <button className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-md mr-2" onClick={()=>{logout("token")}} >Logout</button>
  <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mr-2">Home</button>
  <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: 'white', fontSize: 32, cursor: 'pointer' }} /></Button>
</div>
      </nav>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Text images={Images} />
      <Recently />
      <Rental />
      <Top />
      <Map />
    </div>
  )
}

export default Userpage
