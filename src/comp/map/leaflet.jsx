import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";

const Leaflet = ({ label, items }) => {

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

  const selectedItem = items.find(item => item.id === label)



  const center = [
    selectedItem ? selectedItem.latitude : 28.6139,
    selectedItem ? selectedItem.longitude : 77.2090
  ];

  return (
    <div className="h-full w-full" style={{ height: "500px", width: "700px" }}>
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
      {selectedItem && (
        <Marker position={[selectedItem.latitude, selectedItem.longitude]}  icon={customIcon}>
          <Popup>
            {selectedItem.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  </div>
  )
}

export default Leaflet;