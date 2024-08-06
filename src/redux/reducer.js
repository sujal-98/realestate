// Initial user state
const userAccount = {
  loading: false,
  user: {
    name: "_____",
    email: "example@example.com",
    phone: '0000000000',
    street: "Enter the street address",
    city: "Enter the city address",
    landmark: "enter a landmark",
    bio: "Write a bio",
    dob: "Enter a valid dob",
    employment: "Enter the employment status",
    profile: '/images/profile.jpg',
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
