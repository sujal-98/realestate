import axios from 'axios';

export const fetchUserRequest = () => {
  return {
    type: 'FETCH_USER_REQUEST'
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    payload: user
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: 'FETCH_USER_FAILURE',
    payload: error
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios.get(`http://localhost:3000/account/${userId}`)
      .then(response => {
        const user = response.data.user;
        console.log("action user: ",user)
        dispatch(fetchUserSuccess(user));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};
export const updateUser = (userId,updatedData) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios.put(`http://localhost:3000/update/${userId}`,{
      "user":updatedData
    }, {headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)
      .then(response => {
        const user = response.data.user;
        console.log("action user: ",user)
        dispatch(fetchUserSuccess(user));
      })
      .catch(error => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};


export const fetchPropertyRequest = () => {
  return {
    type: 'FETCH_PROPERTIES_REQUEST'
  };
};

export const fetchPropertySuccess = (prop) => {
  return {
    type: 'FETCH_PROPERTIES_SUCCESS',
    payload: prop
  };
};

export const fetchPropertyFailure = (error) => {
  return {
    type: 'FETCH_PROPERTIES_FAILURE',
    payload: error
  };
};


export const fetchProp = (saleType) => {
  return (dispatch) => {
    dispatch(fetchPropertyRequest());
    axios.get(`http://localhost:3000/sale`,{
      type:'selling'
    }  )
      .then(response => {
        const user = response.data;
        console.log("working",user)
        dispatch(fetchPropertySuccess(user));
      })
      .catch(error => {
        dispatch(fetchPropertyFailure(error.message));
      });
  };
};

export const fetchRentProp = (saleType) => {
  return (dispatch) => {
    dispatch(fetchPropertyRequest());
    axios.get(`http://localhost:3000/rent`,{
      type:'rental'
    }  )
      .then(response => {
        const user = response.data;
        console.log("working",user)
        dispatch(fetchPropertySuccess(user));
      })
      .catch(error => {
        dispatch(fetchPropertyFailure(error.message));
      });
  };
};


export const fetchSavedRequest = () => {
  return {
    type: 'FETCH_SAVED_REQUEST'
  };
};

export const fetchSavedSuccess = (prop) => {
  return {
    type: 'FETCH_SAVED_SUCCESS',
    payload: prop
  };
};

export const fetchSavedFailure = (prop) => {
  return {
    type: 'FETCH_SAVED_Failure',
    payload: prop
  };
};
export const add = (prop) => {
  return {
    type: 'ADD_PROPERTY',
    payload: prop
  };
};
export const remove = (prop) => {
  return {
    type: 'REMOVE_PROPERTY',
    payload: prop
  };
};

//Save Property
export const fetchSave = (userId) => async (dispatch) => {
  dispatch(fetchSavedRequest());
  try {
      const response = await axios.get(`http://localhost:3000/save/getSavedIds/${userId}`);
      dispatch(fetchSavedSuccess(response.data));
  } catch (error) {
      dispatch(fetchSavedFailure(error.message));
  }
};

//full data
export const fetchSaveFull = (userId) => async (dispatch) => {
  dispatch({ type: 'FETCH_FULLSAVED_REQUEST' });
  try {
      const response = await axios.get(`http://localhost:3000/save/getSaved/${userId}`);
      dispatch({ type: 'FETCH_FULLSAVED_SUCCESS', payload: response.data });
  } catch (error) {
      dispatch({ type: 'FETCH_FULLSAVED_FAILURE', payload: error.message });
  }
};
// Add Property
export const addProperty = (userId, propertyId) => async (dispatch) => {
  try {
      const response = await axios.post(`http://localhost:3000/save/add/${userId}`, {
        propId: propertyId
      });
      if(response.data.propId) {
          dispatch(add(response.data.propId));
      }
  } catch (error) {
      dispatch(fetchSavedFailure(error.message));
  }
};


// Remove Property
export const removeProperty = (userId, propertyId) => async (dispatch) => {
  try {
      const response = await axios.put(`http://localhost:3000/save/remove/${userId}`, {
        propId: propertyId
      });
      if(response.data.propId) {
          dispatch(remove(response.data.propId));
      }
  } catch (error) {
      dispatch(fetchSavedFailure(error.message));
  }
};


