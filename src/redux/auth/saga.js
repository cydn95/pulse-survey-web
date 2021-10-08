import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  loginAPI,
  resetPasswordAPI,
  resetPasswordConfirmAPI,
  getCRSFTokenAPI,
  setPasswordAPI,
  getSurveyUserAPI,
  getProjectAPI,
  checkUserPasswordAPI,
  getIsAdminAPI
} from "../../services/axios/api";

import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_PASSWORD,
  PROJECT_ID,
  SURVEY_ID,
  RESET_PASSWORD,
  RESET_PASSWORD_CONFIRM,
  CHECK_PASSWORD_STATUS
} from "Constants/actionTypes";

import {
  loginUserSuccess,
  loginUserFailed,
  setProjectIDSuccess,
  setSurveyIDSuccess,
  resetPasswordSuccess,
  resetPasswordFailed,
  resetPasswordConfirmSuccess,
  resetPasswordConfirmFailed,
  clearAboutMe,
  clearCommon,
  clearMap
} from "Redux/actions";

import { loginErrorType } from "Constants/defaultValues";

const getCSRFTokenAsync = async () =>
  await getCRSFTokenAPI()
    .then((token) => token)
    .catch((error) => error);

const loginWithUsernamePasswordAsync = async (username, password, csrf) =>
  await loginAPI(username, password, csrf)
    .then((authUser) => authUser)
    .catch((error) => error);

const getIsAdminAync = async (id) =>
  await getIsAdminAPI(id)
    .then((response) => response)
    .catch((error) => error)

const resetPasswordWithEmailAsync = async (email, csrf) =>
  await resetPasswordAPI(email, csrf)
    .then((response) => response)
    .catch((error) => error);

const resetPasswordConfirmWithTokenAsync = async (password, token, csrf) =>
  await resetPasswordConfirmAPI(password, token, csrf)
    .then((response) => response)
    .catch((error) => error);

function* loginWithUsernamePassword({ payload }) {
  const { username, password } = payload.user;
  const { history } = payload;

  try {
    const csrfTokenRes = yield call(getCSRFTokenAsync);
    const csrfToken = csrfTokenRes.data;

    const loginUser = yield call(
      loginWithUsernamePasswordAsync,
      username,
      password,
      csrfToken
    );

    if (loginUser.data) {
      let userId = loginUser.data.id;
      let accessToken = loginUser.data.token;
      const userData = yield call(
        getIsAdminAync,
        loginUser.data.id
      );
      let isSuperUser = userData.data === undefined ? false : userData.data.is_superuser
      if (accessToken !== "") {
        // Save admin info to localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isSuperUser", isSuperUser);

        let authData = {
          userId,
          accessToken,
          isSuperUser,
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

function* resetPasswordWithEmail({ payload }) {
  const { email, callback } = payload;

  // console.log('test email', email);
  try {
    const csrfTokenRes = yield call(getCSRFTokenAsync);
    const csrfToken = csrfTokenRes.data;

    const resetSendStatus = yield call(resetPasswordWithEmailAsync, email, csrfToken);

    // console.log("reset send status", resetSendStatus);
    if (resetSendStatus.status === 200) {
      yield put(resetPasswordSuccess());
      callback(true);
      return;
    } else {
      yield put(resetPasswordFailed());
      callback(false);
      return;
    }
  } catch (error) {
    // catch throw
    console.log("reset password : ", error);
  }
}

function* resetPasswordConfirmWithToken({ payload }) {
  const { password, token, callback } = payload;

  try {
    const csrfTokenRes = yield call(getCSRFTokenAsync);
    const csrfToken = csrfTokenRes.data;

    const resetSendStatus = yield call(resetPasswordConfirmWithTokenAsync, password, token, csrfToken);

    if (resetSendStatus.status === 200) {
      yield put(resetPasswordConfirmSuccess());
      callback(true);
      return;
    } else {
      yield put(resetPasswordConfirmFailed());
      callback(false);
      return;
    }
  } catch (error) {
    console.log('reset password confirm : ', error);
  }
}

function* logout({ payload }) {
  const { history } = payload;
  try {
    // yield call(logoutAsync, history);

    yield put(clearAboutMe());
    yield put(clearCommon());
    yield put(clearMap());

    localStorage.removeItem("tour");
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectTitle");
    localStorage.removeItem("surveyTitle");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("surveyUserId");
    localStorage.removeItem("surveyId");
    localStorage.removeItem("userId");
    // yield call(logoutUser, history);
    // history.push("/");
    window.location = "/";
  } catch (error) { }
}

const setPasswordAsync = async (email, password, token, csrf) =>
  await setPasswordAPI(email, password, token, csrf)
    .then((authUser) => authUser)
    .catch((error) => error);

function* setPassword({ payload }) {
  const { email, password, token, history } = payload;

  const csrfTokenRes = yield call(getCSRFTokenAsync);
  const csrfToken = csrfTokenRes.data;

  try {
    const result = yield call(setPasswordAsync, email, password, token, csrfToken);

    if (result.data) {
      localStorage.removeItem("accessToken");
      // history.push("/welcome");
      // suggested to go to login page instead of welcome page
      history.push("login");
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
  if (projectId > 0) {
    const result = yield call(getProjectByIdAsync, projectId);
    if (result.status === 200) {
      localStorage.setItem("projectId", projectId);
      localStorage.setItem("projectTitle", result.data.projectName);
      yield put(setProjectIDSuccess(projectId, result.data.projectName));
    }
  } else {
    localStorage.setItem("projectId", 0);
    localStorage.setItem("projectTitle", "");
    yield put(setProjectIDSuccess(0, ""));
  }

}


const getCheckPasswordStatusAsync = async (email) =>
  await checkUserPasswordAPI(email)
    .then((res) => res)
    .catch((error) => error);

function* checkPasswordStatus({ payload }) {
  const { email, callback } = payload;

  const result = yield call(getCheckPasswordStatusAsync, email);

  callback(result);
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithUsernamePassword);
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPasswordWithEmail);
}

export function* watchResetPasswordConfirm() {
  yield takeEvery(RESET_PASSWORD_CONFIRM, resetPasswordConfirmWithToken);
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


export function* watchCheckPasswordStatus() {
  yield takeEvery(CHECK_PASSWORD_STATUS, checkPasswordStatus);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchResetPassword),
    fork(watchResetPasswordConfirm),
    fork(watchLogoutUser),
    fork(watchSetPassword),
    fork(watchSetProjectID),
    fork(watchSetSurveyID),
    fork(watchCheckPasswordStatus)
  ]);
}
