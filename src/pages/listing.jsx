import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import Lbar from '../comp/loggesNavbar/Lbar';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Listing = () => {
  const [activeImage, setActiveImage] = useState(0);
  const[seller,setSeller]=useState({})
  const location = useLocation();
  const data = location.state;


  useEffect(() => {
    const fetch = async () => {
      console.log("id ", data.sellerId._id); // Log the ID to confirm it's being passed correctly

      try {
        const response = await axios.get(`http://localhost:3000/sellerById/${data.sellerId._id}`);
        console.log("response ", response.data); // Log the response from API
        setSeller(response.data); // Set the state with the seller data
      } catch (error) {
        console.error("Error fetching seller data:", error); // Log any errors
      }
    };

    fetch();
  }, [data.sellerId._id]);

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
    


  return (
    <div className="max-w-full mx-auto ">
      <Lbar />
      {/* Image Gallery and Location Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-10 ml-4 mr-4">
        {/* Image Gallery */}
        <div className="space-y-4">
          <img
            src={data.propertyImages[activeImage]}
            alt={`Property view ${activeImage + 1}`}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {data.propertyImages.map((img, idx) => (
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
                               center={[data.location.latitude,data.location.longitude]}
                                zoom={13}
                                style={{ height: "100%", width: "100%" }}
                              >
                                <TileLayer
                                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  attribution="&copy; OpenStreetMap contributors"
                                />
        <Marker position={[data.location.latitude, data.location.longitude]}  icon={customIcon} />
                                </MapContainer>
            <div className="absolute inset-0 bg-black/5" />
            
          </div>
          <div className="absolute  bg-white px-4 py-2 rounded-lg shadow-lg z-10" style={{right:'20rem',bottom:'9.2rem'}}>
              <p className="font-semibold">{data.location.address}</p>
              <p className="text-sm text-gray-600">{"LAT: "+data.location.latitude}{"  -  LONG: "+ data.location.longitude}</p>
            </div>
          
        </div>
        
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ml-4 mr-4 mb-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-xl text-gray-600">{data.location.city}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg">
            <div>
              <p className="text-gray-600">Bedrooms</p>
              <p className="text-lg font-semibold">{data.amenities.bedrooms}</p>
            </div>
            <div>
              <p className="text-gray-600">Bathrooms</p>
              <p className="text-lg font-semibold">{data.amenities.bathrooms}</p>
            </div>
            <div>
              <p className="text-gray-600">Area</p>
              <p className="text-lg font-semibold">{data.amenities.area}</p>
            </div>
            <div>
              <p className="text-gray-600">Year Built</p>
              <p className="text-lg font-semibold">{data.yearBuilt}</p>
            </div>
            <div>
              <p className="text-gray-600">Parking</p>
              <p className="text-lg font-semibold">{data.amenities.parking}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="text-lg font-semibold">{data.type}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{data.description}</p>
          </div>
        </div>

        {/* Seller Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg h-fit border">
          
          <div className="text-3xl font-bold text-blue-600 mb-6">    {data.price}</div>
          
          <div className="flex items-center gap-4 mb-6">
            {/* <img
              src={property.seller.image}
              alt={seller.userId.username}
              className="w-16 h-16 rounded-full"
            /> */}
            <div>
              <h3 className="font-semibold">{property.seller.name}</h3>
              <div className="text-sm text-gray-600">
                ⭐ {property.seller.rating} · {property.seller.listings} listings
              </div>
              <div className="text-sm text-gray-600">
                {property.seller.experience} experience
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3">
            Connect with Seller
          </button>
          
          <button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
            Save Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;