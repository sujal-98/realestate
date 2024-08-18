import React, { useState, useRef, useEffect } from 'react';
import './pagecss/account.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Lbar from '../comp/loggesNavbar/Lbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser } from '../actions/action';

const Account = ({ props }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.account.user);
  const userLoading = useSelector(state => state.account.loading);
  const userError = useSelector(state => state.account.error);

  const [editMode, setEditMode] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(fetchUser(props));
  }, [dispatch, props]);

  const fileInput = useRef(null);

  const changeDp = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setUpdatedUser(prevState => ({
        ...prevState,
        profilePicture: fileURL, 
      }));
      setHasChanges(true);
    }
  };

  const handleChange = (field, value) => {
    setUpdatedUser(prevState => ({
      ...prevState,
      [field]: value,
    }));
    checkForChanges();
  };

  const handleAddressChange = (field, value) => {
    setUpdatedUser(prevState => ({
      ...prevState,
      [field]: value,
    }));
    checkForChanges();
  };

  const checkForChanges = () => {
    const isChanged = Object.keys(updatedUser).some(
      key => updatedUser[key] !== user[key]
    );
    setHasChanges(isChanged);
  };

  const handleUpdate = () => {
    if (hasChanges) {
      const formData = new FormData();
      Object.keys(updatedUser).forEach(key => {
        formData.append(key, updatedUser[key]);
      });
      if (selectedFile) {
        console.log(formData)
        formData.append('profilePic', selectedFile);
      }
      dispatch(updateUser(props, formData));
      setHasChanges(false);
      setEditMode({});
    }
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
        <img src={updatedUser.profilePicture || user.profilePicture} alt="Profile Photo" className="profile-img" />
        <input type="file" id="upload" className="imageinput" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
        <FontAwesomeIcon onClick={changeDp} icon={faCirclePlus} className="plus cursor-pointer" />
        <div className="profile-details">
          <h2>{user.username}</h2>
          <p className="bio">
            {editMode.bio ? (
              <input
                type="text"
                className="value"
                value={updatedUser.bio || user.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, bio: false })}
                autoFocus
              />
            ) : (
              <span className="display" onClick={() => setEditMode({ ...editMode, bio: true })}>
                {user.bio}
              </span>
            )}
          </p>
          <p className="joined">Joined: {new Date(user.joiningDate).toLocaleDateString()}</p>
        </div>
        <button
          className={`update font-semibold ${hasChanges ? 'bg-green-500' : 'bg-gray-600'} color-white`}
          onClick={handleUpdate}
          disabled={!hasChanges}
        >
          Update
        </button>
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
              value={updatedUser.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, email: false })}
              autoFocus
            />
          ) : (
            <span className="display" onClick={() => setEditMode({ ...editMode, email: true })}>
              {user.email}
            </span>
          )}
        </div>
        <div className="info-item">
          <strong className="title">Phone Number:</strong>
          {editMode.phone ? (
            <input
              className="value"
              type="text"
              value={updatedUser.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => setEditMode({ ...editMode, phone: false })}
              autoFocus
            />
          ) : (
            <span className="display" onClick={() => setEditMode({ ...editMode, phone: true })}>
              {user.phone}
            </span>
          )}
        </div>
        <div className="info-item">
          <strong className="title" style={{ fontSize: '32px', marginTop: '10px', marginBottom: '10px' }}>
            Address:
          </strong>
          <div className="flex flex-col">
            <span className="title">Street:</span>
            {editMode.street ? (
              <input
                type="text"
                className="value"
                value={updatedUser.street}
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
                value={updatedUser.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                onBlur={() => setEditMode({ ...editMode, city: false })}
                autoFocus
              />
            ) : (
              <span className="display" onClick={() => setEditMode({ ...editMode, city: true })}>
                {user.city}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="title">Landmark:</span>
            {editMode.landmark ? (
              <input
                type="text"
                className="value"
                value={updatedUser.landmark}
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
              value={updatedUser.dob}
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
              value={updatedUser.employment}
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
          <strong>Recent Property:</strong>
          {user.recentProperty && <div>{user.recentProperty.title}</div>}
        </div>
        <div className="info-item">
          <strong>Saved Property:</strong>
          {user.savedProperty && <div>{user.savedProperty.title}</div>}
        </div>
      </div>
    </div>
  );
};

export default Account;
