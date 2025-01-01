import React from 'react';
import Toggle from './toggle';

const Map = () => {
  return (
    <div  style={{ backgroundColor: 'rgba(240, 234, 234, 0.9)' }}>
      <div className='bg-blue-300 py-3 px-4 text-center' >
      <h1 className="text-4xl  mb-2 text-center font-thin tracking-wider">Top Localities</h1>
      <h4 className="text-xl  text-center font-thin tracking-wide">Check out top localities in Delhi</h4>
      </div>
      <div className='bg-blue-100'>
        <Toggle />
      </div>
    </div>
  );
};

export default Map;
