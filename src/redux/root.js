import { combineReducers } from 'redux';
import userReducer from './reducer';

const rootReducer = combineReducers({
  account: userReducer
});

export default rootReducer;
