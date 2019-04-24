// store.js

import { createStore, combineReducers, applyMiddleware } from 'redux';
import placeReducer from './reducers/placeReducer';
import currentPlaceReducer from './reducers/currentPlaceReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  places: placeReducer,
  currentPlace: currentPlaceReducer
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;