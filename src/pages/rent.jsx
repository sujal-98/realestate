import React, { useState ,useEffect,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, Card, CardContent, CardActions, Button, Avatar, CircularProgress, Pagination } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRentProp, fetchSave, addProperty, removeProperty } from '../actions/action';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// Define a sky-themed dynamic background component
const SkyBackground = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 100%)',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  minHeight: '100vh',
  color: '#000',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    left: '-20%',
    width: '200%',
    height: '100%',
    background: `url('/images/cloud1.png') repeat-x`,
    opacity: 0.5,
    animation: 'moveClouds 60s linear infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '30%',
    left: '-10%',
    width: '200%',
    height: '100%',
    background: `url('/images/cloud2.png') repeat-x`,
    opacity: 0.5,
    animation: 'moveClouds 90s linear infinite',
  },
  '@keyframes moveClouds': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
}));

const Rent = ({props}) => {
  const id = props;

  const dispatch = useDispatch();
  const Navigate=useNavigate();

  useEffect(() => {
    console.log("renta;")
    dispatch(fetchRentProp('rental'));
      dispatch(fetchSave(id));
  }, [dispatch,id]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const savedProperties = useSelector((state) => new Set(state.saved.prop));
  const properties = useSelector((state) => state.buy.prop);
  const loading = useSelector((state) => state.buy.loading);
  const error = useSelector((state) => state.buy.error);
  console.log("prop" ,savedProperties)


 const handleSave = useCallback((propertyId) => {
    if (savedProperties.has(propertyId)) {
      dispatch(removeProperty(id, propertyId));
    } else {
      dispatch(addProperty(id, propertyId));
    }
  }, [dispatch, id, savedProperties]);

  // Pagination Logic
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / itemsPerPage);


  const handleClick=async (info)=>{

    try {    
    const response=await axios.put(`http://localhost:3000/impressions/${info._id}`,{}) 
    if(response.data.success){
    Navigate('/profile/listing',{state: { info: info, userid: id } })}}
      catch(error){
        console.log("error ",error)
      }
  }

  return (
    <SkyBackground>
      <Lbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#f5f5f5', pt: 4, pb: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            fontSize: '2.5rem',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            color: '#000',
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)',
          }}
        >
          Properties for Rent
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {currentProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                 <Card
                   sx={{
                     height: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     borderRadius: 3,
                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                     transition: 'transform 0.3s, box-shadow 0.3s',
                     '&:hover': {
                       transform: 'scale(1.03)',
                       boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                     },
                     zIndex: 30,
                     overflow: 'hidden',
                   }}
                   onClick={()=>{handleClick(property)}}
                 >
                   <Box sx={{ position: 'relative' }}>
                     <img
                       src={property.propertyImages[0]}
                       alt={property.description}
                       style={{
                         width: '100%',
                         height: 200,
                         objectFit: 'cover',
                       }}
                     />
                   </Box>
                 
                   <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                     <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                       {property.title}
                     </Typography>
                 
                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                       {property.description}
                     </Typography>
                 
                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                       <Box
                         sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                         onClick={() => handleClick(property)}
                       >
                         <FontAwesomeIcon icon={faEye} style={{ color: '#555' }} />
                         <Typography variant="body2" color="text.secondary">
                           {property.impressions}
                         </Typography>
                       </Box>
                 
                       <Button
                         variant="contained"
                         color={savedProperties.has(property._id) ? 'error' : 'primary'}
                         startIcon={<FontAwesomeIcon icon={faHeart} />}
                         size="small"
                         onClick={() => handleSave(property._id)}
                         sx={{ fontSize: '0.8rem', fontWeight: 'bold', px: 2 }}
                       >
                         {savedProperties.has(property._id) ? 'Saved' : 'Save'}
                       </Button>
                     </Box>
                 
                     <Box
                       sx={{
                         display: 'flex',
                         justifyContent: 'space-between',
                         alignItems: 'center',
                         mt: 'auto',
                       }}
                     >
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                         <Avatar
                           src={property.sellerId.userId.profilePicture?.data || '/images/default-avatar.png'}
                           alt={property.sellerId.userId.username}
                           sx={{ width: 28, height: 28 }}
                         />
                         <Typography variant="body2" color="text.secondary">
                           {property.sellerId.userId.username}
                         </Typography>
                       </Box>
                 
                       <Button variant="contained" color="success" size="small">
                         Contact Now
                       </Button>
                     </Box>
                   </CardContent>
                 </Card>
                 
                </motion.div>
              </Grid>
            ))}
       
          </Grid>
        )}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                  count={totalPages}
                                  page={currentPage}
                                  onChange={(event, value) => setCurrentPage(value)}
                                  color="primary"
                                  sx={{ '& .MuiPaginationItem-root': { fontSize: '0.9rem', color: '#000' } }}
                                />
                              </Box>
      </Container>
    </SkyBackground>
  );
};

export default Rent;
