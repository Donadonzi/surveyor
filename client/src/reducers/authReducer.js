import { FETCH_USER } from '../actions/types';

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false; // If the user is not logged in, api returns "" and in that case we
		// want to return false.
		
		default:
			return state;
	}
}
