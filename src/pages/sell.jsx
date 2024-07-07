import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lbar from '../comp/loggesNavbar/Lbar';
import { BorderColor, BorderStyle } from '@mui/icons-material';

const UploadForSellForm = () => {
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    propertyImages: [],
    mainImage: '',
    description: '',
    type: 'selling',
    location: '',
    price: ''
  });

  const [proofOfOwnership, setProofOfOwnership] = useState({
    adharCard: null,
    panCard: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPropertyData({ ...propertyData, propertyImages: imageUrls, mainImage: imageUrls[0] });
  };

  const handleProofOfOwnershipChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // in MB
      if (fileSize <= 2) {
        setProofOfOwnership({ ...proofOfOwnership, [type]: file });
      } else {
        alert('File size exceeds 2MB limit.');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement submission logic here, e.g., API call to save propertyData and proofOfOwnership
    console.log('Form submitted with data:', propertyData, proofOfOwnership);
    // Navigate to success or next step
    navigate('/success'); // Replace with your desired success page
  };

  const handleMainImageSelect = (imageUrl) => {
    setPropertyData({ ...propertyData, mainImage: imageUrl });
  };

  return (
    <div>
      <Lbar />
      <Container  maxWidth="md" sx={{ mt: 4 ,borderRadius:'25px',backgroundColor: '#F7F7F5',maxWidth:'100vh', minHeight: '100vh', paddingTop: 8, paddingBottom: 8  }}>
        <Typography variant="h4" gutterBottom>
          UPLOAD PROPERTY
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="property-type-label">Type</InputLabel>
            <Select
              labelId="property-type-label"
              id="property-type"
              name="type"
              value={propertyData.type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value="selling">Selling</MenuItem>
              <MenuItem value="rental">Rental</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={propertyData.location}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={propertyData.price}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={propertyData.description}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <Box sx={{borderStyle:'double',borderRadius:'30px' ,borderWidth:'2px',BorderColor:'red',marginTop:'2%',padding:'2%'}}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="property-images">Upload Property Images</InputLabel>
            <input
              type="file"
              id="property-images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="property-images">
              <Button variant="contained" component="span" style={{marginTop:'6%',marginLeft:'2%'}}>
                Choose Files
              </Button>
            </label>
            <Box sx={{ mt: 1 }}>
              {propertyData.propertyImages.map((imageUrl, index) => (
                <Avatar
                  key={index}
                  alt={`Image ${index + 1}`}
                  src={imageUrl}
                  sx={{ width: 80, height: 80, cursor: 'pointer', border: imageUrl === propertyData.mainImage ? '2px solid #3f51b5' : 'none' }}
                  onClick={() => handleMainImageSelect(imageUrl)}
                />
              ))}
            </Box>
          </FormControl>
          {/* File Inputs for Proof of Ownership */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="adhar-card">Adhar Card (Max 2MB)</InputLabel>
            <input
              type="file"
              id="adhar-card"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => handleProofOfOwnershipChange(event, 'adharCard')}
              style={{ display: 'none' }}
            />
            <label htmlFor="adhar-card">
              <Button variant="contained" component="span" style={{marginTop:'6%',marginLeft:'2%'}}>
                Choose File
              </Button>
            </label>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="pan-card">PAN Card (Max 2MB)</InputLabel>
            <input
              type="file"
              id="pan-card"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => handleProofOfOwnershipChange(event, 'panCard')}
              style={{ display: 'none' }}
            />
            <label htmlFor="pan-card">
              <Button variant="contained" component="span" style={{marginTop:'6%',marginLeft:'2%',marginBottom:'2%'}}>
                Choose File
              </Button>
            </label>
          </FormControl>
          </Box>

          <Button type="submit" variant="contained" color="primary" style={{marginTop:'5%'}}>
            Upload Property
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default UploadForSellForm;
