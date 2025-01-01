import React, { useState } from 'react';
import { MapPin, Briefcase, Home, Star } from 'lucide-react';

// Enhanced color schemes with more vibrant gradients
const COLOR_SCHEMES = [
  {
    gradient: 'from-violet-600 to-indigo-600',
    hover: 'from-violet-500 to-indigo-500',
    accent: 'text-violet-600',
    shadow: 'shadow-violet-200'
  },
  {
    gradient: 'from-rose-600 to-pink-600',
    hover: 'from-rose-500 to-pink-500',
    accent: 'text-rose-600',
    shadow: 'shadow-rose-200'
  },
  {
    gradient: 'from-cyan-600 to-teal-600',
    hover: 'from-cyan-500 to-teal-500',
    accent: 'text-cyan-600',
    shadow: 'shadow-cyan-200'
  },
  {
    gradient: 'from-amber-600 to-orange-600',
    hover: 'from-amber-500 to-orange-500',
    accent: 'text-amber-600',
    shadow: 'shadow-amber-200'
  },
  {
    gradient: 'from-emerald-600 to-green-600',
    hover: 'from-emerald-500 to-green-500',
    accent: 'text-emerald-600',
    shadow: 'shadow-emerald-200'
  },
  {
    gradient: 'from-fuchsia-600 to-purple-600',
    hover: 'from-fuchsia-500 to-purple-500',
    accent: 'text-fuchsia-600',
    shadow: 'shadow-fuchsia-200'
  }
];

const ProfileCard = ({ colorIndex ,name,experience,rating,location,properties,url}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorScheme = COLOR_SCHEMES[colorIndex % COLOR_SCHEMES.length];


  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={`transition-all duration-300 ${
              index < Math.floor(rating)
                ? `${isHovered ? 'fill-amber-400 text-amber-400 scale-110' : 'fill-amber-400 text-amber-400'}`
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="max-w-sm m-2">
      <div 
        className={`
          p-[2px] rounded-xl bg-gradient-to-r ${colorScheme.gradient}
          transition-all duration-300 hover:scale-105 group
          ${colorScheme.shadow} hover:shadow-lg
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative bg-white rounded-xl p-6 h-full">
          {/* Animated Background Gradient */}
          <div 
            className={`
              absolute inset-0 bg-gradient-to-r ${colorScheme.hover}
              opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl
            `}
          />

          {/* Location Badge */}
          <div className={`
            absolute -top-3 right-4 bg-white px-3 py-1 rounded-full
            flex items-center gap-1 transition-all duration-300
            ${colorScheme.shadow} hover:shadow-md
            ${isHovered ? 'transform -translate-y-1' : ''}
          `}>
            <MapPin size={16} className={`
              transition-colors duration-300
              ${isHovered ? colorScheme.accent : 'text-gray-500'}
            `} />
            <span className="text-sm text-gray-600">{location}</span>
          </div>

          {/* Main Content */}
          <div className="flex gap-4 mt-2 relative">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={url}
                alt={name}
                className={`
                  w-16 h-16 rounded-full border-2 shadow-md
                  transition-all duration-300
                  ${isHovered ? `border-opacity-100 scale-110 ${colorScheme.shadow}` : 'border-white border-opacity-50'}
                `}
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <h2 className={`
                text-xl font-bold transition-colors duration-300
                ${isHovered ? colorScheme.accent : 'text-gray-800'}
              `}>
                {name}
              </h2>

              <div className="space-y-1">
                <div className={`
                  flex items-center gap-2
                  transition-all duration-300
                  ${isHovered ? 'transform translate-x-1' : ''}
                `}>
                  <Briefcase size={16} className={`
                    transition-colors duration-300
                    ${isHovered ? colorScheme.accent : 'text-gray-500'}
                  `} />
                  <span className="text-sm text-gray-600">{experience} years experience</span>
                </div>

                <div className={`
                  flex items-center gap-2
                  transition-all duration-300
                  ${isHovered ? 'transform translate-x-1 delay-75' : ''}
                `}>
                  <Home size={16} className={`
                    transition-colors duration-300
                    ${isHovered ? colorScheme.accent : 'text-gray-500'}
                  `} />
                  <span className="text-sm text-gray-600">{properties} properties</span>
                </div>

                <div className={`
                  transition-transform duration-300
                  ${isHovered ? 'transform translate-x-1 delay-100' : ''}
                `}>
                  <RatingStars rating={rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard