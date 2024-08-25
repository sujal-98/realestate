import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    padding: '15px',
    width: '320px',
    height: '140px',
    borderRadius: '15px',
    backgroundColor: '#ffffff',
    border: '2px solid #e0e0e0',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  location: {
    backgroundColor: '#f5f5dc',
    borderRadius: '10px',
    color: '#555',
    padding: '3px 10px',
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.875rem',
  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: '12px',
  },
  name: {
    fontWeight: 600,
    marginBottom: '4px',
  },
  experience: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '4px',
  },
  properties: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '6px',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  starIcon: {
    color: '#fbc02d',
    marginRight: '4px',
  },
  paper: {
    padding: '20px',
    marginBottom: '20px',
  }
});

const Card = ({ name, experience, location, properties }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box className={classes.card}>
        <div className={classes.location}>
          <LocationOnIcon fontSize="small" />
          <Typography variant="body2">
            {location}
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="/your-avatar-photo.jpg"
            alt="Avatar"
            className={classes.avatar}
          />
          <div>
            <Typography variant="h6" className={classes.name}>
              {name}
            </Typography>
            <Typography variant="body2" className={classes.experience}>
              Years of Experience: {experience}
            </Typography>
            <Typography variant="body2" className={classes.properties}>
              Properties: {properties}
            </Typography>
            <div className={classes.rating}>
              <StarIcon className={classes.starIcon} />
              <Typography variant="body2">4.5</Typography>
            </div>
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default Card;
