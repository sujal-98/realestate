import React,{useEffect} from 'react'
import Text from '../comp/bheader/text';
import { Images } from './images';
import Map from '../comp/map/map';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';
import Lbar from '../comp/loggesNavbar/Lbar';
import { fetchUser } from '../actions/action';
import {  useDispatch } from 'react-redux';


const Userpage = ({props}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(props));
  }, []);

  return (
    <div style={{width:"100%"}}>
      <Lbar id={props} />
      <div  style={{height:"690px",width:"100%"}}>
        <img src="/images/bg.jpg" alt="background" className="absolute inset-0 w-full object-cover" style={{ zIndex: '-1',height:'800px' }} />
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
