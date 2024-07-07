import React from 'react';
import { motion } from 'framer-motion';
import 'swiper/swiper-bundle.css';
import './styles.css'; // Import the CSS file for styles

const Text = () => {
  return (
    <div className='h-full' style={{ position: 'relative', left: '150px', top: '120px' }}>
      <motion.div
        className='text-white text-7xl text-left font-bold'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Find your next <span className='text-yellow-300'>perfect</span>
        <br /> place with ease
      </motion.div>
      <motion.div
        className='text-white text-3xl text-left mt-3 mb-4 pt-3 pb-3'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      >
        Omlifespace will help you find your home fast, easy and comfortable.
        <br />
        Our expert support is always available.
      </motion.div>
      <motion.a
        href="#"
        className='text-4xl sm:text-3xl text-blue-200 font-bold hover:underline text-left'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
      >
        Let's Start ...
      </motion.a>
    </div>
  );
};

export default Text;
