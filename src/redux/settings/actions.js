import {
    CHANGE_LOCALE,
    PROJECT_LIST_BY_USER,
    PROJECT_LIST_BY_USER_SUCCESS
} from 'Constants/actionTypes';

export const changeLocale = (locale) => {
    localStorage.setItem('currentLanguage', locale);
    return (
        {
            type: CHANGE_LOCALE,
            payload: locale
        }
    )
}

export const projectListByUser = (userId) => ({
    type: PROJECT_LIST_BY_USER,
    payload: { userId }
});

export const projectListByUserSuccess = (projectList) => ({
    type: PROJECT_LIST_BY_USER_SUCCESS,
    payload: { projectList }
});
