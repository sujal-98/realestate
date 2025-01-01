import React from 'react'
import Slider from '../slider/slider';
import Avatar from '@mui/material/Avatar';

const Recentprop = ({props}) => {
  return (
    <div className='bg-white w-11 h-8 '>
      <div className='w-11 h-8'>
      <Slider props={props}></Slider>
      </div>
      <div className="grid grid-cols-2">
        <div>
          recently.detailedDescription
        </div>
        <div>
          <div>
          <Avatar alt="Remy Sharp" src={`${props.ownerProfilePhoto}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recentprop
