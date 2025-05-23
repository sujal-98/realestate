import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Home, Coffee } from 'lucide-react';
import { locations } from '../../resources/properties';
import LocationList from './locationList';
import OpenLayersMap from './leaflet';

const Toggle = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [lookUp, setLookUp] = useState({});
  
  const menuItems = [
    [
      { id: 1, name: 'Dwarka', latitude: 28.6165, longitude: 77.0369 },
      { id: 2, name: 'Uttam Nagar', latitude: 28.6204, longitude: 77.0452 },
      { id: 3, name: 'Burari', latitude: 28.7255, longitude: 77.2003 },
      { id: 4, name: 'Paschim Vihar', latitude: 28.6695, longitude: 77.0956 },
      { id: 5, name: 'Rohini', latitude: 28.7232, longitude: 77.1118 },
      { id: 6, name: 'Pitampura', latitude: 28.7033, longitude: 77.1318 },
      { id: 7, name: 'Vikaspuri', latitude: 28.6384, longitude: 77.0701 },
      { id: 8, name: 'Mahavir Enclave', latitude: 28.6051, longitude: 77.0716 },
      { id: 9, name: 'Razapur Khurd', latitude: 28.7570, longitude: 77.1843 },
      { id: 10, name: 'Nawada', latitude: 28.6210, longitude: 77.0455 }
    ],
    [
      { id: 11, name: 'Rohini', latitude: 28.7496, longitude: 77.0565 },
      { id: 12, name: 'Janakpuri', latitude: 28.6210, longitude: 77.0870 },
      { id: 13, name: 'Laxmi Nagar', latitude: 28.6304, longitude: 77.2776 },
      { id: 14, name: 'Karol Bagh', latitude: 28.6528, longitude: 77.1901 },
      { id: 15, name: 'Preet Vihar', latitude: 28.6475, longitude: 77.2914 },
      { id: 16, name: 'Lajpat Nagar', latitude: 28.5689, longitude: 77.2400 },
      { id: 17, name: 'Chandni Chowk', latitude: 28.6507, longitude: 77.2305 },
      { id: 18, name: 'Connaught Place', latitude: 28.6304, longitude: 77.2177 },
      { id: 19, name: 'Saket', latitude: 28.5245, longitude: 77.2064 },
      { id: 20, name: 'Mayur Vihar', latitude: 28.5931, longitude: 77.2987 }
    ],
    [
      { id: 21, name: 'Vasant Kunj', latitude: 28.5290, longitude: 77.1543 },
      { id: 22, name: 'Green Park', latitude: 28.5570, longitude: 77.2035 },
      { id: 23, name: 'Dilshad Garden', latitude: 28.6795, longitude: 77.3155 },
      { id: 24, name: 'Shahdara', latitude: 28.6737, longitude: 77.2890 },
      { id: 25, name: 'Kalkaji', latitude: 28.5364, longitude: 77.2607 },
      { id: 26, name: 'Dwarka', latitude: 28.5921, longitude: 77.0460 },
      { id: 27, name: 'Greater Kailash', latitude: 28.5365, longitude: 77.2420 },
      { id: 28, name: 'Rajouri Garden', latitude: 28.6415, longitude: 77.1170 },
      { id: 29, name: 'Vasant Vihar', latitude: 28.5608, longitude: 77.1603 },
      { id: 30, name: 'Hauz Khas', latitude: 28.5539, longitude: 77.1947 }
    ],
    [
      { id: 31, name: 'Sarita Vihar', latitude: 28.5294, longitude: 77.2863 },
      { id: 32, name: 'Punjabi Bagh', latitude: 28.6689, longitude: 77.1150 },
      { id: 33, name: 'Model Town', latitude: 28.7190, longitude: 77.1926 },
      { id: 34, name: 'Patel Nagar', latitude: 28.6595, longitude: 77.1543 },
      { id: 35, name: 'Malviya Nagar', latitude: 28.5293, longitude: 77.2038 },
      { id: 36, name: 'Shalimar Bagh', latitude: 28.7172, longitude: 77.1503 },
      { id: 37, name: 'Geeta Colony', latitude: 28.6504, longitude: 77.2863 },
      { id: 38, name: 'Nehru Place', latitude: 28.5472, longitude: 77.2500 },
      { id: 39, name: 'Govindpuri', latitude: 28.5217, longitude: 77.2633 },
      { id: 40, name: 'Okhla', latitude: 28.5303, longitude: 77.2689 }
    ]
  ];

  useEffect(() => {
    const computeAndStoreLookUp = async () => {
      const storedLookUp = localStorage.getItem("lookUp");
      
      // Check if data exists in localStorage
      if (storedLookUp) {
        console.log("Data retrieved from localStorage");
        setLookUp(JSON.parse(storedLookUp)); 
        return; 
      } else {
        console.log("Calculating lookUp...");
        const updatedLookUp = {};
        menuItems.flat().forEach((item) => {
          for (const key in locations) {
            if (key.includes(item.name)) {
              if (updatedLookUp[item.name]) {
                updatedLookUp[item.name] = [
                  ...updatedLookUp[item.name],
                  ...locations[key],
                ];
              } else {
                updatedLookUp[item.name] = locations[key];
              }
            }
          }
        });
  
        setLookUp(updatedLookUp);
        localStorage.setItem("lookUp", JSON.stringify(updatedLookUp));
      }
    };
  
    computeAndStoreLookUp();
  }, []);
  
  // Button configurations with icons and gradients
  const buttonConfigs = [
    { 
      label: 'Popular', 
      icon: <Navigation size={18} />,
      gradient: 'from-blue-600 to-indigo-600'
    },
    { 
      label: 'Rentals', 
      icon: <Home size={18} />,
      gradient: 'from-purple-600 to-pink-600'
    },
    { 
      label: 'Affordable', 
      icon: <MapPin size={18} />,
      gradient: 'from-emerald-600 to-teal-600'
    },
    { 
      label: 'LifeStyle', 
      icon: <Coffee size={18} />,
      gradient: 'from-orange-600 to-rose-600'
    }
  ];

  // Initialize selectedLocation with the ID of the first item in the active menu
  const [selectedLocation, setSelectedLocation] = useState(
    menuItems[0] && menuItems[0].length > 0 ? menuItems[0][0].id : null
  );
  
  // Update selectedLocation when activeButton changes
  useEffect(() => {
    if (menuItems[activeButton] && menuItems[activeButton].length > 0) {
      setSelectedLocation(menuItems[activeButton][0].id);
    }
  }, [activeButton]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Navigation Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex justify-center space-x-4">
          {buttonConfigs.map((config, index) => (
            <button
              key={index}
              onClick={() => setActiveButton(index)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-xl
                transition-all duration-300 transform
                ${activeButton === index 
                  ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg scale-105` 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
            >
              {config.icon}
              <span>{config.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex space-x-6">
          <LocationList 
            items={menuItems[activeButton]} 
            onSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
          <div className="w-2/3 bg-white rounded-lg shadow-md flex justify-center">
            <OpenLayersMap
              label={selectedLocation}
              items={menuItems[activeButton]} 
              selectedLocation={selectedLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toggle;