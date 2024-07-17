import React, { useState, useRef, useEffect } from 'react';
import './pagecss/account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../actions/action'; 

const Account = () => {
  let { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const userLoading = useSelector(state => state.user.loading);
  const userError = useSelector(state => state.user.error);

  const [update, setUpdate] = useState(true);
  const fileInput = useRef(null);

  const changeDp = () => {
    fileInput.current.click();
  };

  useEffect(() => {
    dispatch(fetchUser(userId.slice(1)));
  }, [dispatch, userId]);

  const [editMode, setEditMode] = useState({
    bio: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    landmark: false,
    dateOfBirth: false,
    employment: false
  });

  const handleChange = (field, value) => {
    // Update the user state (local component state) if needed
  };

  const handleAddressChange = (field, value) => {
    // Update the address field of the user state (local component state) if needed
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error: {userError}</div>;
  }

  return (
    <div className="account">
      <Lbar />
      <div className="profile-info">
        <img src={user.profile} alt="Profile Photo" className="profile-img" />
        <input type="file" id="upload" className="imageinput" ref={fileInput} />
        <FontAwesomeIcon onClick={changeDp} icon={faCirclePlus} className="plus cursor-pointer" />
        <div className="profile-details">
          <h2>{user.name}</h2>
          <p className="bio">
            {editMode.bio ? (
              <input
                type="text"
                className="value"
                value={user.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, bio: false })}
                autoFocus
              />
            ) : (
              <span className="display" onClick={() => setEditMode({ ...editMode, bio: true })}>{user.bio}</span>
            )}
          </p>
          <p className="joined">Joined: {new Date(user.joiningDate).toLocaleDateString()}</p>
        </div>
        {update ? (
          <button className="update bg-gray-600 color-white font-semibold">Update</button>
        ) : (
          <button className="update font-semibold bg-green-300 color-white">Update</button>
        )}
      </div>
      <div className="w-full mr-2 ml-2 mb-4 mt-2 border-2 border-red-300"></div>
      <div className="info-section">
        <h3>Personal Information</h3>
        <div className="info-item">
          <strong className="title">Email:</strong>
          {editMode.email ? (
            <input
              className="value"
              type="text"
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, email: false })}
              autoFocus
            />
          ) : (
            <span className="display" onClick={() => setEditMode({ ...editMode, email: true })}>{user.email}</span>
          )}
        </div>
        <div className="info-item">
          <strong className="title">Phone Number:</strong>
          {editMode.phone ? (
            <input
              className="value"
              type="text"
              value={user.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, phone: false })}
              autoFocus
            />
          ) : (
            <span className="display" onClick={() => setEditMode({ ...editMode, phone: true })}>{user.phone}</span>
          )}
        </div>
        <div className="info-item">
          <strong className="title text-3xl" style={{ fontSize: '32px', marginTop: '10px', marginBottom: '10px' }}>
            Address:
          </strong>
          <div className="flex flex-col">
            <span className="title">Street:</span>
            {editMode.street ? (
              <input
                type="text"
                className="value"
                value={user.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, street: false })}
                autoFocus
              />
            ) : (
              <span className="display" onClick={() => setEditMode({ ...editMode, street: true })}>
                {user.street}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="title">City:</span>
            {editMode.city ? (
              <input
                type="text"
                className="value"
                value={user.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, city: false })}
                autoFocus
              />
            ) : (
              <span className="display" onClick={() => setEditMode({ ...editMode, city: true })}>{user.city}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="title">Landmark:</span>
            {editMode.landmark ? (
              <input
                type="text"
                className="value"
                value={user.landmark}
                onChange={(e) => handleAddressChange('landmark', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, landmark: false })}
                autoFocus
              />
            ) : (
              <span className="display" onClick={() => setEditMode({ ...editMode, landmark: true })}>
                {user.landmark}
              </span>
            )}
          </div>
        </div>
        <div className="info-item">
          <strong className="title">Date of Birth:</strong>
          {editMode.dateOfBirth ? (
            <input
              type="date"
              className="value"
              value={user.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, dateOfBirth: false })}
              autoFocus
            />
          ) : (
            <span className="display" onClick={() => setEditMode({ ...editMode, dateOfBirth: true })}>
              {new Date(user.dob).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="info-item">
          <strong className="title">Employment:</strong>
          {editMode.employment ? (
            <input
              type="text"
              className="value"
              value={user.employment}
              onChange={(e) => handleChange('employment', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, employment: false })}
              autoFocus
            />
          ) : (
            <span className="display" onClick={() => setEditMode({ ...editMode, employment: true })}>
              {user.employment}
            </span>
          )}
        </div>
      </div>
      <div className="info-section">
        <h3>Properties</h3>
        <div className="info-item">
          <strong>Properties Posted for Sale:</strong> {user.contactedProps.length}
        </div>
      </div>
    </div>
  );
};

export default Account;
