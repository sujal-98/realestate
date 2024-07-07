import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles.css'; // Import the CSS file for enhanced styles
import { rental } from '../../resources/property';
const Rental = () => {

  

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`}
        onClick={onClick}
      />
    );
  }

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow prev-arrow`}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  return (
    <div className="rental-container">
      <div className='header'>
        <h1 className="title">AVAILABLE FOR RENT</h1>
        <h4 className="subtitle">Based on preference of users like you</h4>
      </div>
      <Slider {...settings}>
        {rental.map(property => (
          <div key={property.id} className="property-card-wrapper">
            <Card className="property-card">
              <CardMedia
                component="img"
                alt={property.name}
                height="200"
                image={property.image}
                className="property-image"
              />
              <CardContent className="property-content">
                <Typography gutterBottom variant="h5" component="div" className="property-name">
                  {property.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="property-description">
                  {property.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="property-price">
                  Price: {property.price}
                </Typography>
              </CardContent>
              <CardActions className="property-actions">
                <Button variant="contained" color="success" className="contact-button">
                  Contact Now
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Rental;
