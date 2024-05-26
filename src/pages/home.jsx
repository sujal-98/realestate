import React from 'react';
import Navbar from '../comp/header/navbar';
import Text from '../comp/bheader/text';
import { Images } from '../comp/bheader/images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Text images={Images} />
      <Recently />
      <Rental />
      <Top />
      <Map />
    </div>
  );
};

export default Home;
