// src/store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
