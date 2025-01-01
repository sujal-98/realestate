const initialState = {
  loading: false,
  prop: [], 
  error: ''
};

const fullSavedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FULLSAVED_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_FULLSAVED_SUCCESS':
      return {
        ...state,
        loading: false,
        prop: action.payload,
        error: ''
      };
    case 'FETCH_FULLSAVED_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fullSavedReducer;
