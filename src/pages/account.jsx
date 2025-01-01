import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, Card, Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../actions/action';
import axios from 'axios';

const Account = ({ props }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.account.user);

  const [localUser, setLocalUser] = useState({});
  const [editMode, setEditMode] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [fileChanged, setfileChanged] = useState(false);


  useEffect(() => {
    dispatch(fetchUser(props));
  }, [dispatch, props]);

  useEffect(() => {
    if (user) {
      setLocalUser({ ...user });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setLocalUser((prevState) => {
      const updatedUser = { ...prevState, [field]: value };
      const hasChanges = Object.keys(updatedUser).some(
        (key) => updatedUser[key] !== user[key]
      );
      setIsChanged(hasChanges); 
      return updatedUser;
    });
  };
  

  const handleEditModeChange = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalUser((prevState) => ({
        ...prevState,
        profilePicture: file,
      }));
      setfileChanged(true);
    }
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
  
    // Loop over the localUser object and compare with the original user
    for (const key in localUser) {
      if (localUser[key] !== user[key]) {
        formData.append(key, localUser[key]);
      }
    }
  
    let hasChanges = false;
    for (let entry of formData.entries()) {
      hasChanges = true;
    }
    if (hasChanges) {
      try {
        const update = await axios.put(`http://localhost:3000/update/${props}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Updated successfully: ', update);
        dispatch(fetchUser(props)); 
        setIsChanged(false); 
        setfileChanged(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No changes to update.");
    }
  };
  
  
  const handleProfilePictureClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <div>
      <Lbar />
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Card sx={{ padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <Avatar
              alt={localUser.username}
              src={localUser.profilePicture || ''}
              sx={{ width: 100, height: 100, marginRight: '1.5rem', backgroundColor: deepPurple[500] }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
            />
            <IconButton onClick={handleProfilePictureClick}>
              <AddCircle sx={{ fontSize: 40, color: deepPurple[500] }} />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {localUser.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Joined on {localUser.joiningDate}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom>
            Bio
          </Typography>
          {editMode.bio ? (
            <TextField
              fullWidth
              variant="outlined"
              value={localUser.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              onBlur={() => handleEditModeChange('bio')}
              multiline
              rows={4}
              autoFocus
            />
          ) : (
            <Typography
              variant="body1"
              onClick={() => handleEditModeChange('bio')}
              sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
            >
              {localUser.bio || 'Click to add bio'}
            </Typography>
          )}

          <Typography variant="h6" sx={{ marginTop: '2rem' }} gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={3}>
            {['email', 'phone', 'street', 'city', 'landmark', 'dateOfBirth', 'employment'].map((field) => (
              <Grid item xs={12} key={field}>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                  {field}
                </Typography>
                {editMode[field] ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type={field === 'dateOfBirth' ? 'date' : 'text'}
                    value={localUser[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    onBlur={() => handleEditModeChange(field)}
                    autoFocus
                  />
                ) : (
                  <Typography
                    variant="body1"
                    onClick={() => handleEditModeChange(field)}
                    sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                  >
                    {localUser[field] || `Click to enter ${field}`}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>

          {(isChanged || fileChanged) && (
            <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Box>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Account;
