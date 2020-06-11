import {
  SET_MAIN_MENU_CLASSNAME,
  SET_SUB_MENU_CLASSNAME,
  SET_MENU_NAME,
} from "Constants/actionTypes";

export const setMainMenuClassName = (mainMenuClassName) => ({
  type: SET_MAIN_MENU_CLASSNAME,
  payload: { mainMenuClassName },
});

export const setSubMenuClassName = (subMenuClassName) => ({
  type: SET_SUB_MENU_CLASSNAME,
  payload: { subMenuClassName },
});

export const setMenuName = (menuName) => ({
  type: SET_MENU_NAME,
  payload: { menuName },
});
