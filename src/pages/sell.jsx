import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lbar from '../comp/loggesNavbar/Lbar';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UploadForSellForm = () => {
  const navigate = useNavigate();
  const [propertyImages, setPropertyImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [proofOfOwnership, setProofOfOwnership] = useState({
    adharCard: null,
    panCard: null
  });

  const initialValues = {
    description: '',
    type: 'selling',
    location: '',
    price: ''
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Type is required'),
    location: Yup.string().required('Location is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number')
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPropertyImages(imageUrls);
    setMainImage(imageUrls[0]);
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

  const handleMainImageSelect = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('description', values.description);
    formData.append('type', values.type);
    formData.append('location', values.location);
    formData.append('price', values.price);
    propertyImages.forEach((image, index) => {
      formData.append('propertyImages', image);
    });
    formData.append('mainImage', mainImage);
    formData.append('adharCard', proofOfOwnership.adharCard);
    formData.append('panCard', proofOfOwnership.panCard);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property uploaded successfully', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error uploading property', error);
    }
  };

  return (
    <div>
      <Lbar />
      <Container maxWidth="md" sx={{ mt: 4, borderRadius: '25px', backgroundColor: '#F7F7F5', minHeight: '100vh', paddingTop: 8, paddingBottom: 8 }}>
        <Typography variant="h4" gutterBottom>
          UPLOAD PROPERTY
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="property-type-label">Type</InputLabel>
                <Field
                  as={Select}
                  labelId="property-type-label"
                  id="property-type"
                  name="type"
                  label="Type"
                >
                  <MenuItem value="selling">Selling</MenuItem>
                  <MenuItem value="rental">Rental</MenuItem>
                </Field>
                {errors.type && touched.type ? <div>{errors.type}</div> : null}
              </FormControl>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={values.location}
                onChange={(e) => setFieldValue('location', e.target.value)}
                sx={{ mt: 2 }}
              />
              {errors.location && touched.location ? <div>{errors.location}</div> : null}
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                value={values.price}
                onChange={(e) => setFieldValue('price', e.target.value)}
                sx={{ mt: 2 }}
              />
              {errors.price && touched.price ? <div>{errors.price}</div> : null}
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={values.description}
                onChange={(e) => setFieldValue('description', e.target.value)}
                sx={{ mt: 2 }}
              />
              {errors.description && touched.description ? <div>{errors.description}</div> : null}
              <Box sx={{ borderStyle: 'double', borderRadius: '30px', borderWidth: '2px', marginTop: '2%', padding: '2%' }}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="property-images">Upload Property Images</InputLabel>
                  <input
                    type="file"
                    id="property-images"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      handleImageChange(event);
                      setFieldValue('propertyImages', event.target.files);
                    }}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="property-images">
                    <Button variant="contained" component="span" style={{ marginTop: '6%', marginLeft: '2%' }}>
                      Choose Files
                    </Button>
                  </label>
                  <Box sx={{ mt: 1 }}>
                    {propertyImages.map((imageUrl, index) => (
                      <Avatar
                        key={index}
                        alt={`Image ${index + 1}`}
                        src={imageUrl}
                        sx={{ width: 80, height: 80, cursor: 'pointer', border: imageUrl === mainImage ? '2px solid #3f51b5' : 'none' }}
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
                    <Button variant="contained" component="span" style={{ marginTop: '6%', marginLeft: '2%' }}>
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
                    <Button variant="contained" component="span" style={{ marginTop: '6%', marginLeft: '2%', marginBottom: '2%' }}>
                      Choose File
                    </Button>
                  </label>
                </FormControl>
              </Box>

              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '5%' }}>
                Upload Property
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default UploadForSellForm;
