import React, { useState,useEffect } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Avatar, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lbar from '../comp/loggesNavbar/Lbar';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { motion } from 'framer-motion';

const UploadForSellForm = ({ id }) => {
  const navigate = useNpropertyImagesavigate();
  const [, setPropertyImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [proofOfOwnership, setProofOfOwnership] = useState({
    adharCard: null,
    panCard: null
  });
  const [uploading, setUploading] = useState(false);

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
    const validFiles = files.filter(file => file.size / 1024 / 1024 <= 2);

    if (validFiles.length < files.length) {
      alert('Some files exceed the 2MB limit and were not added.');
    }

    setPropertyImages(prevImages => [...prevImages, ...validFiles]);
  };

  const handleProofOfOwnershipChange = (event, type) => {
    const file = event.target.files[0];
    if (file && file.size / 1024 / 1024 <= 2) {
      setProofOfOwnership({ ...proofOfOwnership, [type]: file });
    } else {
      alert('File size exceeds 2MB limit.');
    }
  };

  const handleMainImageSelect = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleSubmit = async (values) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('description', values.description);
    formData.append('type', values.type);
    formData.append('location', values.location);
    formData.append('price', values.price);

    propertyImages.forEach((file) => {
      formData.append('propertyImages', file);
    });

    formData.append('adharCard', proofOfOwnership.adharCard);
    formData.append('panCard', proofOfOwnership.panCard);

    try {
      const response = await axios.post(`http://localhost:3000/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property uploaded successfully', response.data);
      alert("Property uploaded");
      navigate('/some-path'); 
    } catch (error) {
      console.error('Error uploading property', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Lbar />
      <Container maxWidth="md" sx={{ mt: 4, borderRadius: 2, backgroundColor: '#F7F7F5', minHeight: '100vh', paddingTop: 8, paddingBottom: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{marginBottom:'4rem'}}>
          Upload Property
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="property-type-label">Type</InputLabel>
                    <Field
                      as={Select}
                      labelId="property-type-label"
                      id="property-type"
                      name="type"
                      label="Type"
                      fullWidth
                    >
                      <MenuItem value="selling">Selling</MenuItem>
                      <MenuItem value="rental">Rental</MenuItem>
                    </Field>
                    {errors.type && touched.type ? <div>{errors.type}</div> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    value={values.location}
                    onChange={(e) => setFieldValue('location', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {errors.location && touched.location ? <div>{errors.location}</div> : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={(e) => setFieldValue('price', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {errors.price && touched.price ? <div>{errors.price}</div> : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={values.description}
                    onChange={(e) => setFieldValue('description', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {errors.description && touched.description ? <div>{errors.description}</div> : null}
                </Grid>
              </Grid>
              <Box
                sx={{
                  border: '2px dashed #ddd',
                  borderRadius: 2,
                  padding: 2,
                  mt: 4,
                  bgcolor: '#fff',
                  borderColor: '#3f51b5',
                }}
              >
                <FormControl fullWidth>
                  <InputLabel htmlFor="property-images">Upload Property Images</InputLabel>
                  <input
                    type="file"
                    id="property-images"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(event) => {
                      handleImageChange(event);
                      setFieldValue('propertyImages', event.target.files);
                    }}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="property-images">
                    <Button variant="contained" component="span" sx={{marginTop:'3.6rem',marginBottom:'2rem'}}>
                      Choose Files
                    </Button>
                  </label>
                </FormControl>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                  {propertyImages.map((file, index) => (
                    <Grid item key={index}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Avatar
                          alt={`Image ${index + 1}`}
                          src={URL.createObjectURL(file)}
                          sx={{
                            width: 120,
                            height: 120,
                            cursor: 'pointer',
                            border: file === mainImage ? '2px solid #3f51b5' : 'none',
                            mb: 1
                          }}
                          onClick={() => handleMainImageSelect(URL.createObjectURL(file))}
                        />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ mt: 4 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="adhar-card">Adhar Card (Max 2MB)</InputLabel>
                  <input
                    type="file"
                    id="adhar-card"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) => handleProofOfOwnershipChange(event, 'adharCard')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="adhar-card">
                    <Button variant="contained" component="span" sx={{marginTop:'3.6rem',marginBottom:'2rem'}}>
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
                    <Button variant="contained" component="span" sx={{marginTop:'3.6rem',marginBottom:'2rem'}}>
                      Choose File
                    </Button>
                  </label>
                </FormControl>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Button type="submit" variant="contained" color="primary" disabled={uploading}>
                  {uploading ? <CircularProgress size={24} /> : 'Upload Property'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default UploadForSellForm;
