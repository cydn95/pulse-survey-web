import {defaultLocale,localeOptions} from 'Constants/defaultValues'

import {
		CHANGE_LOCALE,
		PROJECT_LIST_BY_USER,
    PROJECT_LIST_BY_USER_SUCCESS
} from 'Constants/actionTypes';

const INIT_STATE = {
	locale: (localStorage.getItem('currentLanguage') && localeOptions.filter(x=>x.id==localStorage.getItem('currentLanguage')).length>0) ? localStorage.getItem('currentLanguage') : defaultLocale,
	projectList: []
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {
		case CHANGE_LOCALE:
			return { ...state, locale:action.payload};
		case PROJECT_LIST_BY_USER:
				return { ...state };
		case PROJECT_LIST_BY_USER_SUCCESS:
      return { ...state, projectList: action.payload.projectList };
		default: return { ...state };
	}
}