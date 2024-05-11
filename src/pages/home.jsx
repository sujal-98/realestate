import React, { useState } from 'react';
import Navbar from '../comp/header/navbar';
import Signup from './Signup';
import Login from './Login';
import Text from '../comp/bheader/text';
import { Images } from '../comp/bheader/images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';

const Home = () => {
  const [showlogin, setShowlogin] = useState(false);
  const [showsign, setShowsign] = useState(false);

  const togglelogin = () => {
    if (showsign) {
      setShowsign(!showsign);
    }
    setShowlogin(!showlogin);
  };

  const togglesign = () => {
    if (showlogin) {
      setShowlogin(!showlogin);
    }
    setShowsign(!showsign);
  };

  const closeS = () => {
    setShowsign(!showsign);
  };
  const closeL = () => {
    setShowsign(!showlogin);
  };

  return (
    <div>
      <Navbar togglel={togglelogin} toggles={togglesign}></Navbar>
      {showsign && <Signup toggleS={togglesign} toggleL={togglelogin} close={closeS} />}
      {showlogin && <Login toggleL={togglelogin} toggleS={togglesign} close={closeL} />}
      <Text images={Images}></Text>
      <Recently />
      <Rental />
      <Top />
      <Map />
    </div>
  );
};

export default Home;
