import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  loginAPI,
  setPasswordAPI,
  getSurveyUserAPI,
  getProjectAPI,
} from "../../services/axios/api";

import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_PASSWORD,
  PROJECT_ID,
  SURVEY_ID,
} from "Constants/actionTypes";

import {
  loginUserSuccess,
  logoutUser,
  loginUserFailed,
  setProjectIDSuccess,
  setSurveyIDSuccess,
} from "Redux/actions";

import { loginErrorType } from "Constants/defaultValues";

const loginWithUsernamePasswordAsync = async (username, password) =>
  await loginAPI(username, password)
    .then((authUser) => authUser)
    .catch((error) => error);

function* loginWithUsernamePassword({ payload }) {
  const { username, password } = payload.user;
  const { history } = payload;

  try {
    const loginUser = yield call(
      loginWithUsernamePasswordAsync,
      username,
      password
    );

    if (loginUser.data) {
      let userId = loginUser.data.id;
      let accessToken = loginUser.data.token;
      if (accessToken !== "") {
        // Save admin info to localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("accessToken", accessToken);

        let authData = {
          userId,
          accessToken,
        };

        yield put(loginUserSuccess(authData));
        history.push("/");

        return;
      }
    } else {
      yield put(loginUserFailed(loginErrorType.INVALID_PASSWORD));
    }
  } catch (error) {
    // catch throw
    console.log("login error : ", error);
  }
}

function* logout({ payload }) {
  const { history } = payload;
  try {
    // yield call(logoutAsync, history);
    localStorage.removeItem("tour");
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectTitle");
    localStorage.removeItem("surveyTitle");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("surveyUserId");
    localStorage.removeItem("surveyId");
    localStorage.removeItem("userId");
    yield call(logoutUser, history);
    history.push("/");
  } catch (error) {}
}

const setPasswordAsync = async (email, password, token) =>
  await setPasswordAPI(email, password, token)
    .then((authUser) => authUser)
    .catch((error) => error);

function* setPassword({ payload }) {
  const { email, password, token, history } = payload;

  try {
    const result = yield call(setPasswordAsync, email, password, token);

    if (result.data) {
      localStorage.removeItem("accessToken");
      history.push("/welcome");
      return;
    }
  } catch (error) {
    // catch throw
    console.log(error);
  }
}

const setSurveyIDAsync = async (userId, surveyId) =>
  await getSurveyUserAPI(userId, surveyId)
    .then((res) => res)
    .catch((error) => error);

function* setSurveyID({ payload }) {
  const { userId, surveyId, callback } = payload;

  try {
    if (surveyId > 0) {
      const result = yield call(setSurveyIDAsync, userId, surveyId);

      if (result.data && result.data.length > 0) {
        localStorage.setItem("surveyId", surveyId);
        localStorage.setItem("surveyTitle", result.data[0].survey.surveyTitle);
        localStorage.setItem("surveyUserId", result.data[0].id);

        yield put(
          setSurveyIDSuccess(
            surveyId,
            result.data[0].survey.surveyTitle,
            result.data[0].id
          )
        );

        if (callback !== undefined) {
          callback();
        }
      }
    } else {
      localStorage.setItem("surveyId", 0);
      localStorage.setItem("surveyTitle", "");
      localStorage.setItem("surveyUserId", 0);

      yield put(setSurveyIDSuccess(0, "", 0));
    }
  } catch (error) {
    // catch throw
    console.log(error);
  }
}

const getProjectByIdAsync = async (projectId) =>
  await getProjectAPI(projectId)
    .then((res) => res)
    .catch((error) => error);

function* setProjectID({ payload }) {
  const { projectId } = payload;
  const result = yield call(getProjectByIdAsync, projectId);
  if (result.status === 200) {
    localStorage.setItem("projectId", projectId);
    localStorage.setItem("projectTitle", result.data.projectName);
    yield put(setProjectIDSuccess(projectId, result.data.projectName));
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithUsernamePassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchSetPassword() {
  yield takeEvery(SET_PASSWORD, setPassword);
}

export function* watchSetProjectID() {
  yield takeEvery(PROJECT_ID, setProjectID);
}

export function* watchSetSurveyID() {
  yield takeEvery(SURVEY_ID, setSurveyID);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchSetPassword),
    fork(watchSetProjectID),
    fork(watchSetSurveyID),
  ]);
}
