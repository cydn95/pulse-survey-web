import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  PROJECT_ID_SUCCESS,
  SURVEY_ID_SUCCESS,
  SET_PASSWORD,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_CONFIRM,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILED,
} from "Constants/actionTypes";

import { loginErrorType } from "Constants/defaultValues";

const INIT_STATE = {
  user: {
    userId: localStorage.getItem("userId"),
    accessToken: localStorage.getItem("accessToken"),
  },
  projectId: localStorage.getItem("projectId"),
  projectTitle: localStorage.getItem("projectTitle"),
  surveyId: localStorage.getItem("surveyId"),
  surveyTitle: localStorage.getItem("surveyTitle"),
  surveyUserId: localStorage.getItem("surveyUserId"),
  loading: false,
  authStatus: loginErrorType.AUTH_SUCCESS,
};

export default (state = INIT_STATE, action) => {
  // console.log('action type => ', action.type);
  switch (action.type) {
    case PROJECT_ID_SUCCESS:
      return {
        ...state,
        projectId: action.payload.projectId,
        projectTitle: action.payload.projectTitle,
      };
    case SURVEY_ID_SUCCESS:
      return {
        ...state,
        surveyId: action.payload.surveyId,
        surveyTitle: action.payload.surveyTitle,
        surveyUserId: action.payload.surveyUserId,
      };
    case LOGIN_USER:
      return { ...state, loading: true };
    case RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case RESET_PASSWORD_FAILED:
      return { ...state, loading: false };
    case RESET_PASSWORD_CONFIRM:
      return { ...state, loading: true };
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return { ...state, loading: false };
    case RESET_PASSWORD_CONFIRM_FAILED:
      return { ...state, loading: false };
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
