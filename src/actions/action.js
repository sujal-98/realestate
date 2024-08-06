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
        const user = response.data;
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


