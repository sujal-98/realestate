import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Avatar } from '@mui/material';
import L from 'leaflet';
import Lbar from '../comp/loggesNavbar/Lbar';
import 'leaflet/dist/leaflet.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import {  useSelector } from 'react-redux';

const Listing = () => {
  const [activeImage, setActiveImage] = useState(0);
  const[seller,setSeller]=useState({})
  const location = useLocation();
  const { info, userid } = location.state


  useEffect(() => {
    const fetch = async () => {
      console.log(userid)
      console.log("id ", info.sellerId._id); // Log the ID to confirm it's being passed correctly

      try {
        const response = await axios.get(`http://localhost:3000/sellerById/${info.sellerId._id}`, { withCredentials: true });
        console.log("response ", response.info); // Log the response from API
        setSeller(response.info); // Set the state with the seller info
      } catch (error) {
        console.error("Error fetching seller info:", error); // Log any errors
      }
    };

    fetch();
  }, [info.sellerId._id]);

  const property = {
    title: "Modern Luxury Villa",
    price: "$850,000",
    location: {
      address: "123 Palm Avenue, Miami Beach, FL",
      coordinates: "25.7617° N, 80.1918° W"
    },
    images: [
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
      "/api/placeholder/800/500",
    ],
    description: "Stunning 4-bedroom modern villa with ocean views, featuring high-end finishes, smart home technology, and a private pool. This property offers luxurious living with modern amenities, perfect for those seeking comfort and style. The open floor plan and large windows create a bright and welcoming atmosphere.",
    details: {
      bedrooms: 4,
      bathrooms: 3.5,
      area: "3,200 sq ft",
      yearBuilt: 2022,
      parking: "2 cars",
      type: "Villa"
    },
    seller: {
      name: "John Smith",
      rating: 4.8,
      listings: 24,
      experience: "8 years",
      image: "/api/placeholder/100/100"
    }
  };

  const customIcon = new L.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
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
      console.log('Form submitted:', forminfo);
      handleClose();
      const form={
        subject:forminfo.subject,
        message:forminfo.message,
        senderId:userid,
        recieverId:info.sellerId._id,
        }
      console.log("form ",form)
      try{
        const response=await axios.post(`http://localhost:3000/addNotification`,form, { withCredentials: true })
        if(response){
          console.log(response)
          alert("Message sent")
        }
        else{
          alert("failed")
        }
      }
      catch(error){
        console.error(error);
      }
    };
  
    
    


  return (
    <div className="max-w-full mx-auto ">
      <Lbar />
      {/* Image Gallery and Location Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-10 ml-4 mr-4">
        {/* Image Gallery */}
        <div className="space-y-4">
          <img
            src={info.propertyImages[activeImage]}
            alt={`Property view ${activeImage + 1}`}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {info.propertyImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer transition-all ml-2
                  ${activeImage === idx ? 'ring-2 ring-blue-500 scale-105' : 'hover:scale-90'}`}
                onClick={() => setActiveImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="space-y-4">
          <div className="bg-gray-100 h-[400px] rounded-lg flex items-center justify-center relative overflow-hidden">
            <MapContainer
                               center={[info.location.latitude,info.location.longitude]}
                                zoom={13}
                                style={{ height: "100%", width: "100%" }}
                              >
                                <TileLayer
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  attribution="&copy; OpenStreetMap contributors"
                                />
        <Marker position={[info.location.latitude, info.location.longitude]}  icon={customIcon} />
                                </MapContainer>
            <div className="absolute inset-0 bg-black/5" />
            
          </div>
          <div 
  className="absolute bg-white px-4 py-2 rounded-lg shadow-lg z-10 "
  style={{ right: '20rem', bottom: '8.6rem' }}
>
  <p className="font-semibold">{info.location.address}</p>
  <p className="text-sm text-gray-600 truncate">
    {"LAT: " + info.location.latitude} {"  -  "}{"LONG: " + info.location.longitude}
  </p>
</div>
          
        </div>
        
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ml-4 mr-4 mb-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{info.title}</h1>
            <p className="text-xl text-gray-600">{info.location.city}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-600">Bedrooms</p>
              <p className="text-lg font-semibold">{info.amenities.bedrooms}</p>
            </div>
            <div>
              <p className="text-gray-600">Bathrooms</p>
              <p className="text-lg font-semibold">{info.amenities.bathrooms}</p>
            </div>
            <div>
              <p className="text-gray-600">Area</p>
              <p className="text-lg font-semibold">{info.amenities.area}</p>
            </div>
            <div>
              <p className="text-gray-600">Year Built</p>
              <p className="text-lg font-semibold">{info.yearBuilt}</p>
            </div>
            <div>
              <p className="text-gray-600">Parking</p>
              <p className="text-lg font-semibold">{info.amenities.parking}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="text-lg font-semibold">{info.type}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{info.description}</p>
          </div>
        </div>

        {/* Seller Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-fit border">
       
        <div className="text-3xl font-bold text-blue-600 mb-6 flex items-center">
  <DollarSign className="mr-2" /> 
  {info.price}
</div>
          
          <div className="flex items-center gap-4 mb-3 justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-2">{info.sellerId.userId.username}</h3>
              <div className="text-sm text-gray-600">
                ⭐ {property.seller.rating} · {info.sellerId.properties.length} listings
              </div>
              <div className="text-sm text-gray-600">
                {property.seller.experience} experience
              </div>
            </div>
            <Avatar src={`${info.sellerId.userId.profilePicture}`} sx={{
              "width": '4rem',
              "height": '4rem',
              "cursor":"pointer"
            }} />

          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3">
            Save Property
          </button>
          <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpen}
        sx={{
          width: "100%",
          borderWidth: "1px",
          borderColor: "blue.500",
          color: "blue.500",
          "&:hover": {
            backgroundColor: "blue.50",
          },
          fontWeight: "600",
          py: 3,
          px: 6,
          borderRadius: "lg",
          transitionProperty: "background-color",
          transitionTimingFunction: "ease-in-out",
        }}
        
      >
        Connect with Seller
      </Button>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Contact Seller</DialogTitle>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Write" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                />
              </Box>
          
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Send Message
            </Button>
          </DialogActions>
        </form>
      </Dialog>

        </div>
      </div>
    </div>
  );
};

export default Listing;