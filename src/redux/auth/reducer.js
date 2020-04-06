import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  PROJECT_ID_SUCCESS,
  SET_PASSWORD,
} from "Constants/actionTypes";

import { loginErrorType } from "Constants/defaultValues";

const INIT_STATE = {
  user: {
    userId: localStorage.getItem("userId"),
    accessToken: localStorage.getItem("accessToken"),
  },
  projectId: localStorage.getItem("projectId"),
  projectTitle: localStorage.getItem("projectTitle"),
  projectUserId: localStorage.getItem("projectUserId"),
  loading: false,
  authStatus: loginErrorType.AUTH_SUCCESS,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROJECT_ID_SUCCESS:
      return {
        ...state,
        projectId: action.payload.projectId,
        projectTitle: action.payload.projectTitle,
        projectUserId: action.payload.projectUserId,
      };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_USER_FAILED:
      return { ...state, loading: false, authStatus: action.payload.status };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload.uid };
    case SET_PASSWORD:
      return { ...state };
    case LOGOUT_USER:
      return { ...state, user: { accessToken: "" } };
    default:
      return { ...state };
  }
};
