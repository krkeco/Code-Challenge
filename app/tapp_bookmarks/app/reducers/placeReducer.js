import { SET_FROM_STORAGE, ADD_PLACE, REMOVE_PLACE} from '../actions/types';
import {storeBookmarks} from '../utils.js';

const placeReducer = (state = null, action) => {
  switch(action.type) {
    
    case SET_FROM_STORAGE:
      return action.payload

    case ADD_PLACE:
      if(state == null){
        storeBookmarks([action.payload])
        return [action.payload]

      }else{
        let newPlaces = [];
        state.map((place) => {
          newPlaces.push(place)
        })
        newPlaces.push(action.payload);
        
        storeBookmarks(newPlaces)
        return newPlaces
      }

    case REMOVE_PLACE:
      
      let newPlaces = [];

      state.map((place) => {
        if(place.id !== action.payload) newPlaces.push(place) 
      })
      
      if(newPlaces.length === 0){
        newPlaces = null;
      }
      
      storeBookmarks(newPlaces)
      return newPlaces

    default:
      return state;
  }
}

export default placeReducer;