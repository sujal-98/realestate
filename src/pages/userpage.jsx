import React from 'react'
import Text from '../comp/bheader/text';
import { Images } from './images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';
import Lbar from '../comp/loggesNavbar/Lbar';


const Userpage = ({props}) => {
  return (
    <div>
      <Lbar id={props} />
      <div  style={{height:"900px"}}>
        <img src="/images/bg.jpg" alt="background" className="absolute inset-0 w-full object-cover" style={{ zIndex: '-1',height:'900px' }} />
        <Text />
      </div>
      <Recently />
      <Rental />
      <Top />
      <Map />
    </div>
  )
}

export default Userpage
