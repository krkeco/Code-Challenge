import {SET_CURRENT_PLACE } from './types';

export const setCurrentPlace = place => {
	return {
		type: SET_CURRENT_PLACE,
		payload: place
	}
}