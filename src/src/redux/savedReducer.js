const initialState = {
  loading: false,
  prop: new Set(), 
  error: ''
};

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SAVED_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_SAVED_SUCCESS':
      return {
        ...state,
        loading: false,
        prop: new Set(action.payload), 
        error: ''
      };
    case 'FETCH_SAVED_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'ADD_PROPERTY':
      return {
        ...state,
        prop: new Set(state.prop).add(action.payload) 
      };
    case 'REMOVE_PROPERTY':
      const updatedSet = new Set(state.prop);
      updatedSet.delete(action.payload);
      return {
        ...state,
        prop: updatedSet
      };
    default:
      return state;
  }
};

export default savedReducer;
