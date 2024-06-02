import React from 'react';
import Navbar from '../comp/header/navbar';
import Text from '../comp/bheader/text';
import { Images } from './images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';
import { Swiper, SwiperSlide } from 'swiper/react';


const Home = () => {
  return (
    <div>
      <div  style={{height:"900px"}}>
        <img src="/images/bg.jpg" alt="background" className="absolute inset-0 w-full object-cover" style={{ zIndex: '-1',height:'900px' }} />
        <Navbar />
        <Text />
      </div>
      <Swiper
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
        style={{ height: '600px' }}
        >
          {Images &&
            Images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  className="w-full h-full rounded-lg   object-cover  py-10 bg-cover "
                />
              </SwiperSlide>
            ))}
        </Swiper>
      <Recently />
      <Rental />
      <Top />
      <Map />
    </div>
  );
};

export default Home;
