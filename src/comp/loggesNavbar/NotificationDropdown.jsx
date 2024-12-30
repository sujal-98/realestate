import React, { useState, useEffect, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import axios from 'axios';
import { formatDistanceToNow,parseISO } from 'date-fns';



const NotificationDropdown = ({ props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState({ read: [], unread: [] });
  const [sellerId, setSellerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const unreadCount = notifications.unread.length;

  const fetchSellerId = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/account/${props}`);
      console.log("data ",data)
      setSellerId(data.user.seller);
      console.log(data.user.seller)
      return data.user.seller;
    } catch (err) {
      console.error('Error fetching seller ID:', err);
      setError('Failed to fetch seller information');
      return null;
    }
  });

  const fetchNotifications = useCallback(async (sid) => {
    if (!sid) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/getNotifications/${sid}`);
      setNotifications({
        read: data.Read || [],
        unread: data.unRead || []
      });
      console.log("notifications ",data)
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      console.log("Starting")
      if (!sellerId && props) {

        const sid = await fetchSellerId();
console.log("seller id ",sid)
        if (sid) {
          await fetchNotifications(sid);
        }
      } else if (sellerId) {
        await fetchNotifications(sellerId);
      }
    };

    initializeData();
    setLoading(false);

    // Optional: Set up polling for new notifications
    const pollInterval = setInterval(() => {
      if (sellerId) {
        fetchNotifications(sellerId);
      }
    }, 100000); // Poll every 30 seconds

    return () => clearInterval(pollInterval);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = async (id) => {
    // try {
    //   // Optimistically update UI
    //   setNotifications(prev => ({
    //     unread: prev.unread.filter(n => n.id !== id),
    //     read: [...prev.read, ...prev.unread.filter(n => n.id === id)]
    //   }));

    //   // Make API call to update server
    //   await axios.post(`${API_BASE_URL}/markNotificationRead/${id}`);
      
    //   handleClose();
    // } catch (err) {
    //   console.error('Error marking notification as read:', err);
    //   // Revert optimistic update if needed
    //   await fetchNotifications(sellerId);
    // }
  };

  const markAllAsRead = async () => {
    try {
      // Optimistically update UI
      setNotifications(prev => ({
        read: [...prev.read, ...prev.unread],
        unread: []
      }));

      // Make API call to update server
      const task=await axios.put(`http://localhost:3000/changeReadStatus/${sellerId}`);
      console.log(task)
      handleClose();
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      await fetchNotifications(sellerId);
    }
  };

  function timeAgo(dateString) {
    const date = parseISO(dateString); 
    return formatDistanceToNow(date, { addSuffix: true }); 
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        size="large"
        sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            overflow: 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={markAllAsRead}
              sx={{ textTransform: 'none' }}
            >
              Mark all as read
            </Button>
          )}
        </Box>
        <Divider />

        {loading ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">Loading notifications...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : notifications.read.length + notifications.unread.length > 0 ? (
          [...notifications.unread, ...notifications.read].map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              sx={{
                py: 2,
                px: 3,
                backgroundColor: notification.read ? 'inherit' : 'action.hover',
                '&:hover': {
                  backgroundColor: notification.read ? 'action.hover' : 'action.selected',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {!notification.read && (
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: 12,
                        color: 'primary.main',
                      }}
                    />
                  )}
                  <Typography variant="body2">{notification.sub}</Typography>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {timeAgo(notification.date)}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">No notifications</Typography>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default NotificationDropdown;