import {
    SET_CURRENT_MENU_CLASSNAME
} from 'Constants/actionTypes';

export const setCurrentMenuClassName = (strCurrentClasses) => ({
    type: SET_CURRENT_MENU_CLASSNAME,
    payload: { strCurrentClasses }
});