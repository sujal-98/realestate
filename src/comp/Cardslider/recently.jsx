import React, { useState } from 'react';
import { rental1 } from '../../resources/property';

const SalesCarousel = () => {
  // Mock data for preview
  const sales = rental1

  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [activeCard, setActiveCard] = useState(null);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sales.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sales.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className=" mx-auto px-4 py-12 bg-gradient-to-b from-orange-50 to-white" style={{
      width:'100%'
    }}>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-900 mb-4 relative inline-block">
          AVAILABLE FOR SALE
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </h1>
        <p className="text-lg text-orange-600">
          Discover your dream home
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex gap-6 transition-transform duration-500 ease-out"
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {sales.map((property) => (
              <div 
                key={property.id} 
                className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                onMouseEnter={() => setActiveCard(property.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-orange-100
                  ${activeCard === property.id ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'}`}
                  style={{ marginTop:'2rem',
                    marginBottom:'2rem',
                  }}
                  >
                  {/* Property Image */}
                  <div className="relative  overflow-hidden group" style={{
                    height: '18rem',
                   
                  }} >
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full text-sm font-semibold text-white shadow-lg">
                      New Listing
                    </div>
                    <button 
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-110"
                    >
                      <svg 
                        className={`w-6 h-6 ${favorites.has(property.id) ? 'text-red-500' : 'text-gray-400'}`}
                        fill={favorites.has(property.id) ? "currentColor" : "none"}
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {property.name}
                    </h3>
                    
                    {/* Property Stats */}
                    <div className="flex items-center gap-4 mb-4 text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property.sqft} sq.ft
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {property.beds} beds
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {property.baths} baths
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {property.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-2xl font-bold text-orange-600 mb-6">
                      {property.price}
                    </div>

                    {/* Posted By Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={property.ownerProfilePhoto}
                            alt={property.ownerName}
                            className="w-10 h-10 rounded-full border-2 border-orange-200"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Listed by</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {property.ownerName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-white border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-orange-50">
                          Details
                        </button>
                        <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-orange-50 transition-colors duration-200 hover:scale-110 transform"
        >
          <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-orange-50 transition-colors duration-200 hover:scale-110 transform"
        >
          <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {sales.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${currentIndex === index 
                  ? 'bg-orange-600 w-6' 
                  : 'bg-orange-200 hover:bg-orange-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesCarousel;