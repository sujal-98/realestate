import React from 'react'
import Toggle from './toggle'

const Map = () => {
  return (
    <div >
       <h1 className="text-3xl font-bold mb-3 mt-2 ml-3">Top Localities</h1>
      <h4 className="text-lg mb-4 ml-3">Check out top localities in Delhi</h4>
      <div>
        <Toggle></Toggle>
      </div>
    </div>
  )
}

export default Map
