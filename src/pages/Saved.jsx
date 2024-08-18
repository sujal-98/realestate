import React, { useEffect, useCallback } from 'react';
import { Container, Typography, Grid, Box, Card, CardContent, CardActions, Button, Avatar, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSave, removeProperty,addProperty } from '../actions/action';

const SavedProp = ({ props }) => {
  const id = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSave(id));
  }, [dispatch]);

  const savedProperties = useSelector((state) => state.saved.prop);
  const loading = useSelector((state) => state.saved.loading);
  const error = useSelector((state) => state.saved.error);

  const handleSave = (
    (propertyId) => {
      if (savedProperties.has(propertyId)) {
        savedProperties.delete(propertyId)
        dispatch(removeProperty(props, propertyId));
      } else {
        savedProperties.add(propertyId)
        dispatch(addProperty(props, propertyId));
      }
    }
  );

  return (
    <div>
      <Lbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#f5f5f5', pt: 4, pb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Saved Properties
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
          <Grid container spacing={4}>
            {Array.from(savedProperties).map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
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
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={property.propertyImages[0]}
                      alt={property.description}
                      style={{ width: '100%', height: 200, objectFit: 'cover', borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {property.location}
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
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<FontAwesomeIcon icon={faHeart} />}
                          size="small"
                          onClick={() => handleSave(property._id)}
                        >
                          Unsave
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
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default SavedProp;
