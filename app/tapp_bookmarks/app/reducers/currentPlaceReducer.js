import {SET_CURRENT_PLACE} from '../actions/types';

const currentPlaceReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_CURRENT_PLACE:
      return action.payload;
    default:
      return state;
  }

}

export default currentPlaceReducer;