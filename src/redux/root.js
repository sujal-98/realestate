import { combineReducers } from 'redux';
import userReducer from './reducer';
import propertyReducer from './propertyReducer';

const rootReducer = combineReducers({
  account: userReducer,
  buy: propertyReducer,
});

export default rootReducer;
