import React from 'react';
import Navbar from '../comp/header/navbar';
import Text from '../comp/bheader/text';
import { Images } from './images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';
import { Swiper, SwiperSlide } from 'swiper/react';

import './pagecss/home.css'; 

const Home = () => {
  return (
    <div>
      <div style={{ height: "48rem" }}>
        <img
          src="/images/bg.jpg"
          alt="background"
          className="absolute inset-0 w-full object-cover"
          style={{ zIndex: '-1', height: '48rem' }}
        />
        <Navbar />
        <Text />
      </div>

      {/* <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        style={{ height: '600px' }}
      >
        {Images &&
          Images.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <h2 className="text-white text-4xl font-bold">Beautiful Scenery {index + 1}</h2>
              </div>
            </SwiperSlide>
          ))} */}
      {/* </Swiper> */}

      <Recently />
      <Rental />
      <Top />
      <Map />
    </div>
  );
};

export default Home;