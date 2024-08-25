import * as React from 'react';
import Slider from "react-slick";
import { useSwipeable } from 'react-swipeable';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { recently } from '../../resources/property';
import './styles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

// Define styles using makeStyles
const useStyles = makeStyles({
  card: {
    borderRadius: '15px',
    border: '2px solid #e0e0e0',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    },
  },
  media: {
    borderRadius: '15px 15px 0 0',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
    color: '#333',
  },
  name: {
    fontWeight: 600,
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '12px',
  },
  price: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#555',
  },
  actions: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  posterInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: '8px',
  },
  posterName: {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  sliderContainer: {
    margin: '20px 0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
  },
  saveIcon: {
    cursor: 'pointer',
  },
});

const Recently = () => {
  const classes = useStyles();

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 3000,    // Speed in milliseconds (3 seconds)
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => document.querySelector('.next-arrow').click(),
    onSwipedRight: () => document.querySelector('.prev-arrow').click(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // This ensures touchpad support
    trackTouch: true  // Ensures touch events are tracked as well
  });

  return (
    <div className={classes.sliderContainer} {...swipeHandlers}>
      <div className={classes.header}>
        <Typography variant="h4" component="h1" className={classes.title} gutterBottom>
          RECENTLY ADDED
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Based on preferences of users like you
        </Typography>
      </div>
      <Slider {...settings}>
        {recently.map(property => (
          <div key={property.id} className="property-card-wrapper">
            <Card className={classes.card}>
              <CardMedia
                component="img"
                alt={property.name}
                image={property.image}
                className={classes.media}
              />
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h6" component="div" className={classes.name}>
                  <span className="property-name">{property.name}</span>
                  <FontAwesomeIcon icon={faBookmark} className={classes.saveIcon} />
                </Typography>
                <Typography variant="body2" className={classes.description}>
                  {property.description}
                </Typography>
                <Typography variant="h6" className={classes.price}>
                  Price: {property.price}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <div className={classes.posterInfo}>
                  <Avatar
                    src={property.posterAvatar}
                    alt={property.posterName}
                    className={classes.avatar}
                  />
                  <Typography className={classes.posterName}>
                    Posted by: {property.posterName}
                  </Typography>
                </div>
                <Button variant="contained" className={classes.button}>
                  More Details
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Recently;
