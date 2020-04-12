import {
  SET_MAIN_MENU_CLASSNAME,
  SET_SUB_MENU_CLASSNAME,
} from "Constants/actionTypes";

import {
  defaultMainMenuClassName,
  defaultSubMenuClassName,
} from "Constants/defaultValues";

const INIT_STATE = {
  mainMenuClassName: defaultMainMenuClassName,
  subMenuClassName: defaultSubMenuClassName,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_MAIN_MENU_CLASSNAME:
      return Object.assign({}, state, {
        ...state,
        mainMenuClassName: action.payload.mainMenuClassName,
      });
    case SET_SUB_MENU_CLASSNAME:
      return Object.assign({}, state, {
        ...state,
        subMenuClassName: action.payload.subMenuClassName,
      });
    default:
      return { ...state };
  }
};
