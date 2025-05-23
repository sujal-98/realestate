import React from 'react';
import { MapPin } from 'lucide-react';

const LocationList = ({ items, onSelect, selectedLocation }) => {
  return (
    <div className="w-1/3 pr-4 overflow-y-auto h-[500px]">
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`
              p-3 rounded-lg cursor-pointer transition-all duration-300
              ${selectedLocation === item.id 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md' 
                : 'hover:bg-gray-50'}
            `}
          >
            <div className="flex items-center space-x-3">
              <MapPin 
                size={18} 
                className={`${selectedLocation === item.id ? 'text-blue-500' : 'text-gray-400'}`}
              />
              <div>
                <h3 className={`font-medium ${selectedLocation === item.id ? 'text-blue-600' : 'text-gray-700'}`}>
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;