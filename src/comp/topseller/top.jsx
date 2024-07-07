import React, { useState } from 'react';
import Card from './card';

const Top = () => {
  const [showAll, setShowAll] = useState(false);

  const seller = [
    { id: 1, name: 'Seller 1', experience: 5, properties: 10, location: 'Delhi' },
    { id: 2, name: 'Seller 2', experience: 6, properties: 12, location: 'Mumbai' },
    { id: 3, name: 'Seller 3', experience: 7, properties: 15, location: 'Bangalore' },
    { id: 4, name: 'Seller 4', experience: 8, properties: 20, location: 'Chennai' },
    { id: 5, name: 'Seller 5', experience: 9, properties: 25, location: 'Kolkata' },
    { id: 6, name: 'Seller 6', experience: 10, properties: 30, location: 'Hyderabad' },
    { id: 7, name: 'Seller 7', experience: 11, properties: 35, location: 'Pune' },
    { id: 8, name: 'Seller 8', experience: 12, properties: 40, location: 'Ahmedabad' },
    { id: 9, name: 'Seller 9', experience: 13, properties: 45, location: 'Jaipur' },
    { id: 10, name: 'Seller 10', experience: 14, properties: 50, location: 'Lucknow' },
    { id: 11, name: 'Seller 11', experience: 15, properties: 55, location: 'Patna' },
    { id: 12, name: 'Seller 12', experience: 16, properties: 60, location: 'Indore' },
  ];

  const limitedSellers = showAll ? seller : seller.slice(0, 8);

  const renderCards = () => {
    return limitedSellers.map((seller) => (
      <div key={seller.id} className="w-full p-3">
        <Card name={seller.name} experience={seller.experience} properties={seller.properties} location={seller.location} />
      </div>
    ));
  };

  return (
    <div className=" bg-gray-100 " >
      <div className="text-center mb-5 w-full bg-slate-300 pt-3" style={{height:"100px"}}>
        <h1 className="text-4xl text-gray-800 mb-2 font-thin">TOP SELLERS</h1>
        <h4 className="text-xl text-gray-600">Sellers with complete knowledge about locality and verified listings</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-10 ml-9 mb-4">
        {renderCards()}
      </div>
      {!showAll && (
        <div className="mt-4 mb-5 flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowAll(true)}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Top;
