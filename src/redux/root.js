import { combineReducers } from 'redux';
import userReducer from './reducer';
import propertyReducer from './propertyReducer';
import savedReducer from './savedReducer';

const rootReducer = combineReducers({
  account: userReducer,
  buy: propertyReducer,
  saved:savedReducer
});

export default rootReducer;
