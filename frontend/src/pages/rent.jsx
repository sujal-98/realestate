import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, Card, CardContent, CardActions, Button, Avatar, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRentProp } from '../actions/action';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

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

const Rent = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate();

  useEffect(() => {
    dispatch(fetchRentProp('rental'));
  }, [dispatch]);

  const properties = useSelector((state) => state.buy.prop);
  const loading = useSelector((state) => state.buy.loading);
  const error = useSelector((state) => state.buy.error);

  const handleClick=(info)=>{
    Navigate('/profile/listing',{state:info})
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
          <Grid container spacing={4}>j
            {properties.map((property) => (
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
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                      },
                      zIndex:30
                    }}
                    onClick={()=>{handleClick(property)}}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={property.propertyImages[0]}
                        alt={property.description}
                        style={{ width: '100%', height: 200, objectFit: 'cover', borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#000' }}>
                          {property.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {property.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FontAwesomeIcon icon={faEye} style={{ color: '#555' }} />
                            <Typography variant="body2" color="text.secondary">
                              {property.impressions}
                            </Typography>
                          </Box>
                          <Button variant="contained" color="primary" startIcon={<FontAwesomeIcon icon={faHeart} />} size="small">
                            Save
                          </Button>
                        </Box>
                        <CardActions sx={{ position: 'relative', bottom: 0, left: 0, right: 0, pb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                            <Avatar
                              src={property.sellerId.userId.profilePicture?.data || '/images/default-avatar.png'}
                              alt={property.sellerId.userId.username}
                              sx={{ width: 28, height: 28 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {property.sellerId.userId.username}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="success" size="small">
                              Contact Now
                            </Button>
                          </Box>
                        </CardActions>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </SkyBackground>
  );
};

export default Rent;
