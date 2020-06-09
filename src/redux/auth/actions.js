import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  PROJECT_ID,
  PROJECT_ID_SUCCESS,
  SURVEY_ID,
  SURVEY_ID_SUCCESS,
  SET_PASSWORD,
} from "Constants/actionTypes";

export const setProjectID = (projectId) => ({
  type: PROJECT_ID,
  payload: { projectId },
});

export const setProjectIDSuccess = (projectId) => ({
  type: PROJECT_ID_SUCCESS,
  payload: { projectId },
});

export const setSurveyID = (userId, surveyId, callback) => ({
  type: SURVEY_ID,
  payload: { userId, surveyId, callback },
});

export const setSurveyIDSuccess = (surveyId, surveyTitle, surveyUserId) => ({
  type: SURVEY_ID_SUCCESS,
  payload: { surveyId, surveyTitle, surveyUserId },
});

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailed = (status) => ({
  type: LOGIN_USER_FAILED,
  payload: { status },
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const setPassword = (email, password, token, history) => ({
  type: SET_PASSWORD,
  payload: { email, password, token, history },
});
