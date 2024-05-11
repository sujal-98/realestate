import React, { useState } from 'react';
import './verticle.css';

const Verticle = ({ items, passer }) => {

  const [data, setData] = useState('');

  const handleClick = (item) => {
    setData(item.id);
    passer.sendDataToParent(data);
  };

  return (
    <div className="vertical-menu mr-5" >
      {items.map((item, index) => (
        <div key={index} className="menu-item" onClick={() => handleClick(item)}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default Verticle;
