import React from 'react';
import Toggle from './toggle';

const Map = () => {
  return (
    <div className="mt-2" style={{ backgroundColor: 'rgba(240, 234, 234, 0.9)' }}>
      <div className='w-full bg-slate-300 pt-3 pb-5' style={{height:"100px"}}>
      <h1 className="text-4xl  mb-2 text-center font-thin tracking-wider">Top Localities</h1>
      <h4 className="text-xl mb-6 text-center font-thin tracking-wide">Check out top localities in Delhi</h4>
      </div>
      <div>
        <Toggle />
      </div>
    </div>
  );
};

export default Map;
