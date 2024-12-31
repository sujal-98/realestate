import React, { useState } from 'react';
import ProfileCard from './card';

const Top = () => {
  const [showAll, setShowAll] = useState(false);

  const seller = [
    { id: 1, name: 'Seller 1', experience: 5, properties: 10, location: 'Delhi',rating:'4.5', url:'./images/noprofile.png' },
    { id: 2, name: 'Seller 2', experience: 6, properties: 12, location: 'Mumbai',rating:'4.5' ,  url:'./images/noprofile.png'},
    { id: 3, name: 'Seller 3', experience: 7, properties: 15, location: 'Bangalore',rating:'4.5',  url:'./images/noprofile.png' },
    { id: 4, name: 'Seller 4', experience: 8, properties: 20, location: 'Chennai' ,rating:'4.5',  url:'./images/noprofile.png'},
    { id: 5, name: 'Seller 5', experience: 9, properties: 25, location: 'Kolkata',rating:'4.5',  url:'./images/noprofile.png' },
    { id: 6, name: 'Seller 6', experience: 10, properties: 30, location: 'Hyderabad' ,rating:'4.5',  url:'./images/noprofile.png'},
    { id: 7, name: 'Seller 7', experience: 11, properties: 35, location: 'Pune',rating:'4.5',  url:'./images/noprofile.png' },
    { id: 8, name: 'Seller 8', experience: 12, properties: 40, location: 'Ahmedabad' ,rating:'4.5',  url:'./images/noprofile.png'},
    { id: 9, name: 'Seller 9', experience: 13, properties: 45, location: 'Jaipur',rating:'4.5' ,  url:'./images/noprofile.png'},
    { id: 10, name: 'Seller 10', experience: 14, properties: 50, location: 'Lucknow',rating:'4.5',  url:'./images/noprofile.png' },
    { id: 11, name: 'Seller 11', experience: 15, properties: 55, location: 'Patna',rating:'4.5' ,  url:'./images/noprofile.png'},
    { id: 12, name: 'Seller 12', experience: 16, properties: 60, location: 'Indore',rating:'4.5' ,  url:'./images/noprofile.png'},
  ];

  const limitedSellers = showAll ? seller : seller.slice(0, 8);

  return (
    <div className="bg-white">
      <div className="bg-green-300 py-8 px-4 text-center">
        <h1 className="text-2xl md:text-4xl text-gray-800 mb-2 font-thin">TOP SELLERS</h1>
        <h4 className="text-lg md:text-xl text-gray-600">
          Sellers with complete knowledge about locality and verified listings
        </h4>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {limitedSellers.map((seller,i) => (
            <div key={seller.id}>
              <ProfileCard
                name={seller.name} 
                experience={seller.experience} 
                properties={seller.properties} 
                location={seller.location} 
                colorIndex={i}
                rating={seller.rating}
                url={seller.url}
              />
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-8 text-center">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              onClick={() => setShowAll(true)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Top;