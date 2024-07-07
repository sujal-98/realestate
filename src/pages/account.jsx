import React, { useState ,useRef}  from 'react';
import './pagecss/account.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import axios from 'axios';



const Account = () => {

  const [update,setupdate]=useState(true);
  const fileInput = useRef(null);

  const changeDp = () => {
    fileInput.current.click();
};
    


  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    bio:"",
    address: {
      street: '',
      city: '',
      country: ''
    },
    dateOfBirth: '',
    profilePicture: '',
    employement: '',
    contactedProps: [],
    seller: {
      properties: []
    },
    joiningDate: ""
  });

  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    country: false,
    dateOfBirth: false,
    employement: false
  });

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleAddressChange = (field, value) => {
    setUser({ ...user, address: { ...user.address, [field]: value } });
  };




  return (
    <div className="account">
    <Lbar />
      <div className="profile-info">
        <img src={user.profilePicture} alt="Profile Photo" className="profile-img" />
        <input type="file" id="upload" className='imageinput'  ref={fileInput}
 /><FontAwesomeIcon onClick={changeDp} icon={faCirclePlus} className='plus cursor-pointer'/>
        <div className="profile-details">
          <h2>{user.username}</h2>
          <p className="bio">
          {editMode.bio ? (
              <input
                type="text"
                className='value'

                value={user.bio}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, bio: false })}
                autoFocus
              />
            ) : (
              <span className='display' onClick={() => setEditMode({ ...editMode, bio: true })}>{user.bio}</span>
            )}
          </p>
          <p className="joined">Joined: {new Date(user.joiningDate).toLocaleDateString()}</p>
        </div>
      {(update)?<button className='update bg-gray-600 color-white font-semibold'>Update</button>:<button className='update font-semibold bg-green-300 color-white'>Update</button>}
      </div>
      <div className='w-full mr-2 ml-2 mb-4 mt-2 border-2 border-red-300'></div>
      <div className="info-section">
        <h3>Personal Information</h3>
        <div className="info-item">
          <strong className='title'>Email:</strong>
          {editMode.email ? (
            <input
            className='value'
              type="text"
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, email: false })}
              autoFocus
            />
          ) : (
            <span className='display' onClick={() => setEditMode({ ...editMode, email: true })}>{user.email}</span>
          )}
        </div>
        <div className="info-item">
          <strong className='title'>Phone Number:</strong>
          {editMode.phone ? (
            <input
            className='value'

              type="text"
              value={user.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, phone: false })}
              autoFocus
            />
          ) : (
            <span className='display' onClick={() => setEditMode({ ...editMode, phone: true })}>{user.phone}</span>
          )}
        </div>
        <div className="info-item">
          <strong className='title text-3xl' style={{fontSize:'32px', marginTop:'10px',marginBottom:'10px'}}>Address:</strong>
          <div  className='flex  flex-col'>
            <span className='title'>Street:</span>
            {editMode.street ? (
              <input
                type="text"
                className='value'

                value={user.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, street: false })}
                autoFocus
              />
            ) : (
              <span className='display' onClick={() => setEditMode({ ...editMode, street: true })}>{user.address.street}</span>
            )}
          </div>
          <div className='flex  flex-col'>
            <span className='title'>City:</span>
            {editMode.city ? (
              <input
                type="text"
                className='value'

                value={user.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, city: false })}
                autoFocus
              />
            ) : (
              <span className='display' onClick={() => setEditMode({ ...editMode, city: true })}>{user.address.city}</span>
            )}
          </div>
          <div className='flex  flex-col'>
            <span className='title'>Country:</span>
            {editMode.country ? (
              <input
                type="text"
                className='value'

                value={user.address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, country: false })}
                autoFocus
              />
            ) : (
              <span className='display' onClick={() => setEditMode({ ...editMode, country: true })}>{user.address.country}</span>
            )}
          </div>
        </div>
        <div className="info-item">
          <strong className='title'>Date of Birth:</strong>
          {editMode.dateOfBirth ? (
            <input
              type="date"
              className='value'

              value={user.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, dateOfBirth: false })}
              autoFocus
            />
          ) : (
            <span className='display' onClick={() => setEditMode({ ...editMode, dateOfBirth: true })}>
              {new Date(user.dateOfBirth).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="info-item">
          <strong className='title'>Employement:</strong>
          {editMode.employement ? (
            <input
              type="text"
              className='value'

              value={user.employement}
              onChange={(e) => handleChange('employement', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, employement: false })}
              autoFocus
            />
          ) : (
            <span className='display' onClick={() => setEditMode({ ...editMode, employement: true })}>{user.employement}</span>
          )}
        </div>
      </div>
      <div className="info-section">
        <h3>Properties</h3>
        <div className="info-item">
          <strong>Properties Posted for Sale:</strong> {user.contactedProps.length}
        </div>
        <div className="info-item">
          <strong>Properties Posted for Rental:</strong> {user.seller.properties.length}
        </div>
      </div>
    </div>
  );
};

export default Account;
