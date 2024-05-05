import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import { Autoplay, Pagination } from 'swiper';


// Swiper.use([Autoplay, Pagination]);


const Text = ({images}) => {
  return (
    <div className='h-full'>
    <div className='flex flex-col gap-6  pl-10 pt-28 pb-28  px-1 max-w-6xl mx-auto'>
      <ul>
        <li>
          <div className='text-left text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <em className='text-gray-500'>perfect</em><br />
           place with ease</div>
        </li>
        {/* <li className='text-slate-700 font-bold text-3xl lg:text-6xl mb-4'>
          <span>Your Dream Home is Just a<br /> Click Away!</span>
        </li>
        <li className='text-slate-700 font-bold text-3xl lg:text-6xl mb-4'>
          <span>Discover Your Perfect Home<br /> with Us!</span>
        </li> */}
      </ul>
    <div className='text-gray-400 text-base sm:text-xl text-left'>
      Omlifespace will help you find your home fast, easy and comfortable.<br />
      Our expert support is always available.
    </div>
    <a href="#" className='text-2xl sm:text-xl text-blue-800 font-bold hover:underline text-left'>Let's Start ...</a>
  </div>

  {/* here is our swiper */}
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
    style={{ height: '600px' }}
    >
      {images &&
        images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className="w-full h-full rounded-lg   object-cover  py-10 bg-cover "
            />
          </SwiperSlide>
        ))}
    </Swiper> */}
    {/* <div>
        <h1>Recent Listings</h1>
        <span>Check Out these latest additiopn</span>
        <div className="grid">
             
        </div>
    </div> */}
  
  </div>
  )
}

export default Text
