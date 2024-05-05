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

const Rental = () => {

  const properties = [
    {
      id: 1,
      name: "Risland Sky Mansion",
      description: "Luxurious apartment with breathtaking views",
      price: "$1,000,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 2,
      name: "Seaside Villa",
      description: "Beautiful villa with private beach access",
      price: "$1,500,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 3,
      name: "Mountain Retreat",
      description: "Cozy cabin in the mountains with stunning views",
      price: "$500,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 4,
      name: "City Center Loft",
      description: "Modern loft in the heart of the city",
      price: "$800,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 5,
      name: "Lakefront Property",
      description: "Charming cottage with lake access",
      price: "$700,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 6,
      name: "Country Estate",
      description: "Spacious estate with sprawling grounds",
      price: "$2,000,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 7,
      name: "Urban Penthouse",
      description: "Luxurious penthouse in the heart of the city",
      price: "$3,000,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 8,
      name: "Beachfront Condo",
      description: "Stunning condo with panoramic ocean views",
      price: "$1,200,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 9,
      name: "Country Cottage",
      description: "Quaint cottage in a peaceful countryside setting",
      price: "$400,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    },
    {
      id: 10,
      name: "Garden Villa",
      description: "Elegant villa with lush garden and pool",
      price: "$1,800,000",
      image: "/static/images/cards/contemplative-reptile.jpg"
    }
  ];

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <div className='font-bold text-3xl lg:text-3xl w-1/2 h-1/2 mb-4'>
        <h1>AVAILABLE FOR RENT</h1>
        <h4>Based on preference of users like you</h4>
      </div>
      <Slider {...settings}>
        {properties.map(property => (
          <div key={property.id} className="px-2">
            <Card sx={{ maxWidth: 345, height: '100%', boxShadow: 'none', borderRadius: 0, padding: '10px' }}>
              <CardMedia
                component="img"
                alt={property.name}
                height="140"
                image={property.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {property.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {property.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success">
                  Contact Now
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Rental;
