import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, Card, Avatar, IconButton } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { AddCircle } from '@mui/icons-material'; 
import Lbar from '../comp/loggesNavbar/Lbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../actions/action';
import axios from 'axios';

const Account = ({props}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); 

  useEffect(() => {
    dispatch(fetchUser(props));
  }, [dispatch, props]);
  const user = useSelector((state) => state.account.user);

  const [localUser, setLocalUser] = useState(user);
  const [editMode, setEditMode] = useState({
    bio: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    landmark: false,
    dateOfBirth: false,
    employment: false,
  });

  const handleInputChange = (field, value) => {
    setLocalUser({
      ...localUser,
      [field]: value,
    });
  };

  const handleEditModeChange = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {

        setLocalUser({
          ...localUser,
          profilePicture: file,
        });
  
    }
  };

  const handleSaveChanges =async (id) => {
    // Gather all form data
    console.log("id: ",id)
    console.log("local user: ",localUser)
    const formData = new FormData();
    for (const key in localUser) {
      console.log(key)
      formData.append(key, localUser[key]);
    }
    console.log(formData)
    try{
      const update=await axios.put(`http://localhost:3000/update/${id}`,formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      console.log("updated successfully- ", update)
      setLocalUser(update);
    }
    catch(error){
      console.log(error)
    }
  };

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

  return (
    <div>
      <Lbar />
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Card sx={{ padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5' }}>
          {/* Profile Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <Avatar
              alt={localUser.username}
              src={localUser.profilePicture}
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
                Joined on {localUser.dateOfJoining}
              </Typography>
            </Box>
          </Box>

          {/* Bio Section */}
          <Typography variant="h6" gutterBottom>
            Bio
          </Typography>
          {editMode.bio ? (
            <TextField
              fullWidth
              variant="outlined"
              value={localUser.bio}
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
              {localUser.bio}
            </Typography>
          )}

          {/* Contact Info */}
          <Typography variant="h6" sx={{ marginTop: '2rem' }} gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={3}>
            {/* Email */}
            <Grid item xs={12}>
              <Typography variant="body1">Email</Typography>
              {editMode.email ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={localUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleEditModeChange('email')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('email')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.email}
                </Typography>
              )}
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <Typography variant="body1">Phone</Typography>
              {editMode.phone ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={localUser.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleEditModeChange('phone')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('phone')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.phone}
                </Typography>
              )}
            </Grid>

            {/* Street */}
            <Grid item xs={12}>
              <Typography variant="body1">Street</Typography>
              {editMode.street ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={localUser.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  onBlur={() => handleEditModeChange('street')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('street')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.street || 'Click to enter street'}
                </Typography>
              )}
            </Grid>

            {/* City */}
            <Grid item xs={12}>
              <Typography variant="body1">City</Typography>
              {editMode.city ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={localUser.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  onBlur={() => handleEditModeChange('city')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('city')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.city || 'Click to enter city'}
                </Typography>
              )}
            </Grid>

            {/* Landmark */}
            <Grid item xs={12}>
              <Typography variant="body1">Landmark</Typography>
              {editMode.landmark ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={localUser.landmark}
                  onChange={(e) => handleInputChange('landmark', e.target.value)}
                  onBlur={() => handleEditModeChange('landmark')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('landmark')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.landmark || 'Click to enter landmark'}
                </Typography>
              )}
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12}>
              <Typography variant="body1">Date of Birth</Typography>
              {editMode.dateOfBirth ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  value={localUser.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  onBlur={() => handleEditModeChange('dateOfBirth')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('dateOfBirth')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.dateOfBirth || 'Click to enter date of birth'}
                </Typography>
              )}
            </Grid>

            {/* Employment */}
            <Grid item xs={12}>
              <Typography variant="body1">Employment</Typography>
              {editMode.employment ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={localUser.employment}
                  onChange={(e) => handleInputChange('employment', e.target.value)}
                  onBlur={() => handleEditModeChange('employment')}
                  autoFocus
                />
              ) : (
                <Typography
                  variant="body1"
                  onClick={() => handleEditModeChange('employment')}
                  sx={{ cursor: 'pointer', padding: '8px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}
                >
                  {localUser.employment || 'Click to enter employment status'}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Save Changes Button */}
          <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{handleSaveChanges(props)}}
            >
              Save Changes
            </Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Account;
