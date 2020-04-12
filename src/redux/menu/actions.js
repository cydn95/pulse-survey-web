import {
  SET_MAIN_MENU_CLASSNAME,
  SET_SUB_MENU_CLASSNAME,
} from "Constants/actionTypes";

export const setMainMenuClassName = (mainMenuClassName) => ({
  type: SET_MAIN_MENU_CLASSNAME,
  payload: { mainMenuClassName },
});

export const setSubMenuClassName = (subMenuClassName) => ({
  type: SET_SUB_MENU_CLASSNAME,
  payload: { subMenuClassName },
});
