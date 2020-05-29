import {
	SET_TOUR_VIEW_VALUE
} from 'Constants/actionTypes';

const INIT_STATE = {
	view: {

	}
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case SET_TOUR_VIEW_VALUE:
			return { ...state, [action.payload.key]: action.payload.value };
		default: return { ...state };
	}
}