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
import './styles.css'; 

const Recently = () => {

  const properties = [
    {
      id: 1,
      name: "Risland Sky Mansion",
      description: "Luxurious apartment with breathtaking views",
      price: "$1,000,000",
      image: "images/recently/image1.jpg"
    },
    {
      id: 2,
      name: "Seaside Villa",
      description: "Beautiful villa with private beach access",
      price: "$1,500,000",
      image: "images/recently/image2.jpg"
    },
    {
      id: 3,
      name: "Mountain Retreat",
      description: "Cozy cabin in the mountains with stunning views",
      price: "$500,000",
      image: "images/recently/image3.jpg"
    },
    {
      id: 4,
      name: "City Center Loft",
      description: "Modern loft in the heart of the city",
      price: "$800,000",
      image: "images/recently/image4.jpg"
    },
    {
      id: 5,
      name: "Lakefront Property",
      description: "Charming cottage with lake access",
      price: "$700,000",
      image: "images/recently/image5.jpg"
    },
    {
      id: 6,
      name: "Country Estate",
      description: "Spacious estate with sprawling grounds",
      price: "$2,000,000",
      image: "images/recently/image6.jpg"
    },
    {
      id: 7,
      name: "Urban Penthouse",
      description: "Luxurious penthouse in the heart of the city",
      price: "$3,000,000",
      image: "images/recently/image7.jpg"
    },
    {
      id: 8,
      name: "Beachfront Condo",
      description: "Stunning condo with panoramic ocean views",
      price: "$1,200,000",
      image: "images/recently/image8.jpg"
    },
    {
      id: 9,
      name: "Country Cottage",
      description: "Quaint cottage in a peaceful countryside setting",
      price: "$400,000",
      image: "images/recently/image9.jpg"
    },
    {
      id: 10,
      name: "Garden Villa",
      description: "Elegant villa with lush garden and pool",
      price: "$1,800,000",
      image: "images/recently/image10.jpg"
    }
  ];

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
    <div className="recently-container">
    <div className='header'>
      <h1 className="title">RECENTLY ADDED</h1>
      <h4 className="subtitle">Based on preference of users like you</h4>
    </div>
    <Slider {...settings}>
      {properties.map(property => (
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

export default Recently;
