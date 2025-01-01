// src/reducers/propertyReducer.js
const initialState = {
    loading: false,
    prop: [],
    error: ''
  };
  
  const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PROPERTIES_REQUEST':
        return {
          ...state,
          loading: true
        };
      case 'FETCH_PROPERTIES_SUCCESS':
        return {
          ...state,
          loading: false,
          prop: action.payload,
          error: ''
        };
      case 'FETCH_PROPERTIES_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default propertyReducer;
  