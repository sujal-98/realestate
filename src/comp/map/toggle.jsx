import React, { useState } from 'react';
import Leaflet from './leaflet';
import Verticle from './verticle';

const Toggle = () => {
  const [activeButton, setActiveButton] = useState(0);
  const buttonLabels = ['Popular', 'Rentals', 'Affordable', 'LifeStyle'];

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const menuItems = [
    [
      { id: 1, name: 'Dwarka Mor', latitude: 28.6165, longitude: 77.0369 },
      { id: 2, name: 'Uttam Nagar', latitude: 28.6204, longitude: 77.0452 },
      { id: 3, name: 'Burari', latitude: 28.7255, longitude: 77.2003 },
      { id: 4, name: 'Paschim Vihar', latitude: 28.6695, longitude: 77.0956 },
      { id: 5, name: 'Sector 24 Rohini', latitude: 28.7232, longitude: 77.1118 },
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

  const [dataFromChild, setDataFromChild] = useState('');

  const receiveDataFromChild = (data) => {
    setDataFromChild(data);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 w-full h-full">
      <div className="px-10 rounded-lg" style={{ backgroundColor:'#f0f0f0',width: '95%', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {buttonLabels.map((label, index) => (
          <button
            key={index}
            className={`rounded-full py-2 px-9 mr-2 focus:outline-none ${
              activeButton === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => handleClick(index)}
          >
            {label}
          </button>
        ))}
      </div>
      {activeButton !== null && (
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-center " style={{width:'95%',height:'60%'}}>
          <Verticle items={menuItems[activeButton]} passer={{ sendDataToParent: receiveDataFromChild }} />
          {console.log(dataFromChild)}
          <Leaflet label={dataFromChild} items={menuItems[activeButton]} />
        </div>
      )}
    </div>
  );
};

export default Toggle;
