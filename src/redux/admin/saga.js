import { all, call, fork, takeEvery, put } from 'redux-saga/effects'
import {
  ADMIN_USER_LIST,
  ADMIN_UPDATE_USER_LIST,
  ADMIN_PROJECT_LIST,
  ADMIN_ACTIVE_PROJECT_REQUEST,
  ADMIN_AM_QUESTION_LIST,
  ADMIN_AO_QUESTION_LIST,
  ADMIN_SURVEY_SETUP,
  ADMIN_SURVEY_CONFIGURATION,
} from 'Constants/actionTypes'
import {
  adminUserListSuccess,
  adminProjectListSuccess,
  adminUserListFailure,
  adminAMQuestionListSuccess,
  adminAOQuestionListSuccess,
  adminSurveySetupSuccess,
  adminSUrveyConfigurationSuccess,
} from './actions'
import {
  adminUserListAPI,
  postAdminUserListAPI,
  adminProjectListAPI,
  putAdminProjectListAPI,
  adminAOQuestionListAPI,
  adminAMQuestionListAPI,
  adminSurveySetupAPI,
  adminSurveyConfigurationAPI,
} from '../../services/axios/api'

const getAdminUserListAsync = async (surveyId) =>
  await adminUserListAPI(surveyId)
    .then(data => data)
    .catch(error => console.log(error))

const getAdminProjectListAsync = async (userId) =>
  await adminProjectListAPI(userId)
    .then(data => data)
    .catch(error => console.log(error))


const postAdminUserListAsync = async (data) =>
  await postAdminUserListAPI(data)
    .then(data => data)

const putAdminProjectListAsync = async (surveyId, data) =>
  await putAdminProjectListAPI(surveyId, data)
    .then(data => data)

const getAdminAOQuestionListAsync = async (surveyId) =>
  await adminAOQuestionListAPI(surveyId)
    .then(data => data)
const getAdminAMQuestionListAsync = async (surveyId) =>
  await adminAMQuestionListAPI(surveyId)
    .then(data => data)

const getAdminSurveySetupAsync = async (surveyId) =>
  await adminSurveySetupAPI(surveyId)
    .then(data => data)

const getAdminSurveyConfigurationAsync = async (surveyId) =>
  await adminSurveyConfigurationAPI(surveyId)
    .then(data => data)

function* getAdminUserList({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminUserListAsync, surveyId)
    if (result.status === 200) {
      yield put(adminUserListSuccess(result.data))
    }
  } catch (error) {
    yield put(adminUserListFailure(error))
  }
}

function* adminSetActive({ payload }) {
  try {
    const { surveyId, data, callback } = payload
    const result = yield call(putAdminProjectListAsync, surveyId, data)
    console.log("result", result)
    if (result.status === 200) {
      callback(result.data)
    }
  } catch (error) {
    const { callback } = payload
    callback(error)
  }
}

function* getAdminProjectList({ payload }) {
  try {
    const { userId } = payload
    const result = yield call(getAdminProjectListAsync, userId)
    if (result.status === 200) {
      yield put(adminProjectListSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* postAdminUserList({ payload }) {
  try {
    const { data, callback } = payload
    yield call(postAdminUserListAsync, data.projectUser)
    callback(true)
  } catch (error) {
    const { callback } = payload
    callback(false)
  }
}

function* adminAMQuestionList({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminAMQuestionListAsync, surveyId)
    if (result.status === 200) {
      yield put(adminAMQuestionListSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* adminAOQuestionList({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminAOQuestionListAsync, surveyId)
    if (result.status === 200) {
      yield put(adminAOQuestionListSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* adminSurveySetup({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminSurveySetupAsync, surveyId)
    if (result.status === 200) {
      yield put(adminSurveySetupSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* adminSurveyConfiguration({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminSurveyConfigurationAsync, surveyId)
    console.log('result', result)
    if (result.status === 200) {
      yield put(adminSurveySetupSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchAdminUserList() {
  yield takeEvery(ADMIN_USER_LIST, getAdminUserList)
}

export function* watchPostAdminUserList() {
  yield takeEvery(ADMIN_UPDATE_USER_LIST, postAdminUserList)
}

export function* watchAdminProejctList() {
  yield takeEvery(ADMIN_PROJECT_LIST, getAdminProjectList)
}

export function* watchAdminSetActive() {
  yield takeEvery(ADMIN_ACTIVE_PROJECT_REQUEST, adminSetActive)
}

export function* watchAdminAMQuestionList() {
  yield takeEvery(ADMIN_AM_QUESTION_LIST, adminAMQuestionList)
}

export function* watchAdminAOQuestionList() {
  yield takeEvery(ADMIN_AO_QUESTION_LIST, adminAOQuestionList)
}

export function* watchAdminSurveySetup() {
  yield takeEvery(ADMIN_SURVEY_SETUP, adminSurveySetup)
}

export function* watchAdminSurveyConfiguration() {
  yield takeEvery(ADMIN_SURVEY_CONFIGURATION, adminSurveyConfiguration)
}

export default function* rootSaga() {
  yield all([
    fork(watchAdminUserList),
    fork(watchPostAdminUserList),
    fork(watchAdminProejctList),
    fork(watchAdminSetActive),
    fork(watchAdminAMQuestionList),
    fork(watchAdminAOQuestionList),
    fork(watchAdminSurveySetup),
    fork(watchAdminSurveyConfiguration),
  ]);
}
