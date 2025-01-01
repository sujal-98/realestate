import { combineReducers } from 'redux';
import userReducer from './reducer';
import propertyReducer from './propertyReducer';
import savedReducer from './savedReducer';
import fullSavedReducer from './fullSaved';

const rootReducer = combineReducers({
  account: userReducer,
  buy: propertyReducer,
  saved:savedReducer,
  fullSaved: fullSavedReducer
});

export default rootReducer;
