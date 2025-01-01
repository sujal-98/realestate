// Initial user state
const userAccount = {
  loading: false,
  user: {
    username: "_____",
    email: "example@example.com",
    phone: '0000000000',
    street: "Enter the street address",
    city: "Enter the city address",
    landmark: "enter a landmark",
    bio: "Write a bio",
    dateOfBirth: "Enter a valid dob",
    employment: "Enter the employment status",
    profilePicture: '/images/profile.jpg',
    joiningDate:'....',
    contactedProps: []
  },
  error: ''
};

// User reducer
const userReducer = (state = userAccount, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload
        },
        error: ''
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};


export default  userReducer;
