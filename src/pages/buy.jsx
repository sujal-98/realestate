import React from 'react';
import { Container, Typography, Grid, Box, Card, CardContent, CardActions, Button, Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import { recently } from '../resources/property';

const Buy = ({props}) => {
  return (
    <div>
      <Lbar  id={props}/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#f5f5f5', pt: 4, pb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Properties for Sale
        </Typography>
        <Grid container spacing={4}>
          {recently.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={property.imageUrl}
                    alt={property.name}
                    style={{ width: '100%', height: 200, objectFit: 'cover', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {property.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {property.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FontAwesomeIcon icon={faEye} />
                        <Typography variant="body2" color="text.secondary">
                          {property.impressions}
                        </Typography>
                      </Box>
                      <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faHeart} />} size="small">
                        Save
                      </Button>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar 
                        src={property.uploadedBy?.avatarUrl} 
                        alt={property.uploadedBy?.name || 'Unknown'} 
                        sx={{ width: 24, height: 24 }} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {property.uploadedBy?.name || 'Unknown'}
                      </Typography>
                    </Box>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Buy;
