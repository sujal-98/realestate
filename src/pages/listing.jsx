import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DollarSign, Heart, Share2, Phone, Mail } from 'lucide-react';
import { Avatar } from '@mui/material';
import Lbar from '../comp/loggesNavbar/Lbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useSelector } from 'react-redux';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { useNavigate } from 'react-router-dom';

const Listing = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [seller, setSeller] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const mapElement = useRef(null);
  const location = useLocation();
  const { info, userid } = location.state;
  const navigate=useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://realestate-backend-i9x8.onrender.com/sellerById/${info.sellerId._id}`, { withCredentials: true });
        setSeller(response.info);
      } catch (error) {
        console.error("Error fetching seller info:", error);
      }
    };

    fetch();
  }, [info.sellerId._id]);

  useEffect(() => {
    // Initialize map only after component is mounted and if coordinates exist
    if (mapElement.current && info.location.latitude && info.location.longitude && !isMapInitialized) {
      const longitude = parseFloat(info.location.longitude);
      const latitude = parseFloat(info.location.latitude);
      
      // Create marker feature
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude]))
      });
      
      // Create marker style
      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
          scale: 0.07
        })
      });
      
      markerFeature.setStyle(markerStyle);
      
      // Create vector source and layer for marker
      const vectorSource = new VectorSource({
        features: [markerFeature]
      });
      
      const vectorLayer = new VectorLayer({
        source: vectorSource
      });
      
      // Create map
      const map = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM()
          }),
          vectorLayer
        ],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 15
        })
      });
      
      setIsMapInitialized(true);
    }
  }, [info.location, isMapInitialized]);

  const property = {
    seller: {
      rating: 4.8,
      experience: "8 years"
    }
  };

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [forminfo, setForminfo] = useState({
    subject: '',
    message: ''
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveTab(0);
    setForminfo({
      subject: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForminfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      subject: forminfo.subject,
      message: forminfo.message,
      senderId: userid,
      recieverId: info.sellerId._id,
    };
    
    try {
      const response = await axios.post(`https://realestate-backend-i9x8.onrender.com/addNotification`, form, { withCredentials: true });
      if (response) {
        handleClose();
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    }
  };

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const amenitiesIcons = {
    bedrooms: "🛏️",
    bathrooms: "🚿",
    area: "📏",
    yearBuilt: "🏗️",
    parking: "🚗",
    type: "🏠"
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Lbar />
      
      {/* Header with breadcrumbs */}
      <div className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <a className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={()=>{navigate(-1)}}>Home</a>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2 text-gray-900 font-medium">{info.title}</span>
                </li>
              </ol>
            </nav>
            <div className="flex space-x-2">
              <Button 
                variant="outlined" 
                startIcon={<Share2 size={18} />}
                size="small"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Price Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{info.title}</h1>
            <p className="text-lg text-gray-600">{info.location.address}, {info.location.city}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="text-3xl font-bold text-blue-600 flex items-center">
              <DollarSign className="mr-1" /> 
              {info.price}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg h-[500px]">
              <img
                src={info.propertyImages[activeImage]}
                alt={`Property view ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {info.propertyImages.map((img, idx) => (
                <div 
                  key={idx}
                  className={`relative rounded-md overflow-hidden cursor-pointer transition-all ${
                    activeImage === idx ? 'ring-2 ring-blue-500 scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-blue-50 border-b">
              <h3 className="font-semibold text-gray-900">Property Location</h3>
            </div>
            <div ref={mapElement} className="h-[500px]"></div>
            <div className="p-4 bg-white">
              <p className="text-sm">
                <span className="font-medium">Coordinates:</span> {info.location.latitude}, {info.location.longitude}
              </p>
            </div>
          </div>
        </div>

        {/* Property Details and Seller Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Amenities */}
            <Paper elevation={1} className="p-6 rounded-lg">
              <Typography variant="h6" className="mb-4 font-semibold">Property Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl mr-3">{amenitiesIcons.bedrooms}</span>
                    <div>
                      <Typography variant="body2" color="textSecondary">Bedrooms</Typography>
                      <Typography variant="subtitle1" className="font-medium">{info.amenities.bedrooms}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl mr-3">{amenitiesIcons.bathrooms}</span>
                    <div>
                      <Typography variant="body2" color="textSecondary">Bathrooms</Typography>
                      <Typography variant="subtitle1" className="font-medium">{info.amenities.bathrooms}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl mr-3">{amenitiesIcons.area}</span>
                    <div>
                      <Typography variant="body2" color="textSecondary">Area</Typography>
                      <Typography variant="subtitle1" className="font-medium">{info.amenities.area} sq. ft</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl mr-3">{amenitiesIcons.yearBuilt}</span>
                    <div>
                      <Typography variant="body2" color="textSecondary">Year Built</Typography>
                      <Typography variant="subtitle1" className="font-medium">{info.yearBuilt}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl mr-3">{amenitiesIcons.parking}</span>
                    <div>
                      <Typography variant="body2" color="textSecondary">Parking</Typography>
                      <Typography variant="subtitle1" className="font-medium">{info.amenities.parking}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl mr-3">{amenitiesIcons.type}</span>
                    <div>
                      <Typography variant="body2" color="textSecondary">Type</Typography>
                      <Typography variant="subtitle1" className="font-medium">{info.type}</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Paper>

            {/* Description */}
            <Paper elevation={1} className="p-6 rounded-lg">
              <Typography variant="h6" className="mb-4 font-semibold">Description</Typography>
              <Typography variant="body1" color="textSecondary" className="leading-relaxed">
                {info.description}
              </Typography>
              
              {/* Features/Tags */}
              <div className="mt-6">
                <Typography variant="subtitle1" className="mb-3 font-medium">Features</Typography>
                <div className="flex flex-wrap gap-2">
                  {['Air Conditioning', 'Swimming Pool', 'Garden', 'Security System', 'Fiber Internet', 'Modern Kitchen'].map((feature, idx) => (
                    <Chip key={idx} label={feature} color="primary" variant="outlined" size="small" />
                  ))}
                </div>
              </div>
            </Paper>
          </div>

          {/* Seller Card */}
          <div className="space-y-4">
            <Paper elevation={2} className="p-6 rounded-lg border-t-4 border-blue-500">
              <div className="flex items-center gap-4 mb-6">
                <Avatar 
                  src={`${info.sellerId.userId.profilePicture}`} 
                  sx={{
                    width: '4rem',
                    height: '4rem',
                    border: '2px solid #3b82f6'
                  }} 
                />
                <div>
                  <Typography variant="h6" className="font-semibold">{info.sellerId.userId.username}</Typography>
                  <div className="text-sm text-gray-600">
                    ⭐ {property.seller.rating} · {info.sellerId.properties.length} listings
                  </div>
                  <div className="text-sm text-gray-600">
                    {property.seller.experience} experience
                  </div>
                </div>
              </div>
              
              <Typography variant="body2" color="textSecondary" className="mb-4">
                Professional real estate agent specializing in luxury properties with exceptional customer service.
              </Typography>
              
              <div className="space-y-3">
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<Phone />}
                  onClick={handleOpen}
                  sx={{ py: 1.5 }}
                >
                  Request Call
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth
                  startIcon={<Mail />}
                  onClick={handleOpen}
                  sx={{ py: 1.5 }}
                >
                  Message Seller
                </Button>
              </div>
            </Paper>
            
            {/* Mortgage Calculator Teaser */}
            <Paper elevation={1} className="p-6 rounded-lg bg-blue-50">
              <Typography variant="h6" className="mb-2 font-semibold">Estimated Mortgage</Typography>
              <Typography variant="h5" className="mb-4 font-bold text-blue-700">$3,450/month</Typography>
              <Typography variant="body2" color="textSecondary" className="mb-4">
                Based on 20% down payment, 30-year fixed rate at 4.5% interest
              </Typography>
            </Paper>
          </div>
        </div>
      </div>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', mb: 0 }}>
          Contact {info.sellerId.userId.username}
        </DialogTitle>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Write Message" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                name="subject"
                label="Subject"
                value={forminfo.subject}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
              <TextField
                name="message"
                label="Message"
                value={forminfo.message}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={6}
                variant="outlined"
                placeholder="Introduce yourself and ask any questions you have about the property..."
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary" 
              variant="contained"
              sx={{ px: 4 }}
            >
              Send Message
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Listing;