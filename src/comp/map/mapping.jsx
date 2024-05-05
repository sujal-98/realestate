import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Polygon, InfoWindow } from 'google-maps-react';

const Mapping = (props) => {
  const [districts] = useState([
    { name: 'North Delhi', coordinates: [
      { lat: 28.719957, lng: 77.151876 },
      { lat: 28.720137, lng: 77.193818 },
      { lat: 28.692914, lng: 77.199909 },
      { lat: 28.694679, lng: 77.158282 }
    ]},
    { name: 'South Delhi', coordinates: [
      { lat: 28.5178, lng: 77.2812 },
      { lat: 28.5178, lng: 77.3281 },
      { lat: 28.4348, lng: 77.3281 },
      { lat: 28.4348, lng: 77.2812 }
    ]}
  ]);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({});

  const handleMouseover = (name, e) => {
    setActiveDistrict(name);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseout = () => {
    setActiveDistrict(null);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <Map 
        google={props.google} 
        zoom={11} 
        style={{ width: '80%', height: '80%' }}
        initialCenter={{
          lat: 28.6139,
          lng: 77.2090
        }}
      >
        {districts.map(district => (
          <Polygon
            paths={district.coordinates}
            key={district.name}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor={activeDistrict === district.name ? '#FF0000' : '#FFFFFF'}
            fillOpacity={0.35}
            onMouseover={(e) => handleMouseover(district.name, e)}
            onMouseout={handleMouseout}
          />
        ))}
      </Map>
      {activeDistrict && (
        <InfoWindow
          position={{
            x: tooltipPosition.x,
            y: tooltipPosition.y - 50
          }}
          visible={true}
        >
          <div className="bg-white p-2 rounded border shadow-lg">
            {activeDistrict}
          </div>
        </InfoWindow>
      )}
    </div>
  );
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyBs3l21q52N8ypUIu2UhUMhTc9JnKQlPGU'
})(Mapping);


