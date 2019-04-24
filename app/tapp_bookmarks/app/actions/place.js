import { ADD_PLACE, REMOVE_PLACE, SET_FROM_STORAGE } from './types';

export const setFromStorage = places => {
  return {
    type: SET_FROM_STORAGE,
    payload: places
  }
}

export const addPlace = place => {
  return {
    type: ADD_PLACE,
    payload: place
  }
}


export const removePlace = placeId => {
  return {
    type: REMOVE_PLACE,
    payload: placeId
  }
}
