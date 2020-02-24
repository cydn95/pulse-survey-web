import {
	SET_CURRENT_MENU_CLASSNAME
} from 'Constants/actionTypes';

import {defaultMenuClassName } from 'Constants/defaultValues'

const INIT_STATE = {
	currentClassName: defaultMenuClassName
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case SET_CURRENT_MENU_CLASSNAME:
		return Object.assign({}, state, {
			...state,
			currentClassName: action.payload.strCurrentClasses
		})

		default: return { ...state };
	}
}
