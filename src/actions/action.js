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
