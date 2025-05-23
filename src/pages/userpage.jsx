import React,{useEffect} from 'react'
import Text from '../comp/bheader/text';
import { Images } from './images';
import Recently from '../comp/Cardslider/recently';
import Top from '../comp/topseller/top';
import Rental from '../comp/rentalslider/rental';
import Lbar from '../comp/loggesNavbar/Lbar';
import { fetchUser } from '../actions/action';
import {  useDispatch } from 'react-redux';
import Map from '../comp/map/map';


const Userpage = ({props}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(props));
  }, []);

  return (
    <div style={{width:"100%"}}>
      <Lbar id={props} />
        <Text />
      <Recently />
      <Rental />
      <Top />
      <Map />

    </div>
  )
}

export default Userpage
