import React from 'eact';

const Slider = ({ props }) => {
  return (
    <div>
      {props.map((detail, index) => (
        <div key={index} className="mySlides fade">
          <div className="numbertext">{index + 1} / {props.length}</div>
          <img src={detail.url} style={{ width: '100%' }} />
        </div>
      ))}
    </div>
  );
};

export default Slider;