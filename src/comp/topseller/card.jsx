import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';

const useStyles = makeStyles({
  location: {
    backgroundColor: '#f5f5dc',
    borderRadius: '10px',
    color: '#333',
    padding: '2px 10px',
    position: 'absolute',
    top: '5px',
    right: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '3px solid #f5f5dc',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    padding: '10px',
    width: '300px',
    height: '120px',
    position: 'relative',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2px',
  },
  starIcon: {
    color: '#fbc02d',
    marginRight: '2px',
  }
});

const Card = ({name,experience,location,properties}) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
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
          sx={{ width: 60, height: 60, marginRight: 2 }}
        />
        <div>
          <Typography variant="h6" >
            {name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Years of Experience: {experience}
          </Typography>
          <Typography variant="body2" >
            Properties: {properties}
          </Typography>
          <div className={classes.rating}>
            <StarIcon className={classes.starIcon} />
            <Typography variant="body2">4.5</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
