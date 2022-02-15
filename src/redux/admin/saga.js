import { all, call, fork, takeEvery, put } from 'redux-saga/effects'
import {
  ADMIN_USER_LIST,
  ADMIN_PROJECT_LIST,
  ADMIN_ACTIVE_PROJECT_REQUEST,
  ADMIN_AM_QUESTION_LIST,
  ADMIN_AO_QUESTION_LIST,
  ADMIN_SURVEY_SETUP,
  ADMIN_SURVEY_CONFIGURATION,
  ADMIN_SEND_BULK_INVITATION,
  ADMIN_BULK_ARCHIVE_USER,
  DEL_MORE_INFO_PAGE,
  ADMIN_GET_DRIVER_LIST
} from 'Constants/actionTypes'
import {
  adminUserListSuccess,
  adminProjectListSuccess,
  adminUserListFailure,
  adminAMQuestionListSuccess,
  adminAOQuestionListSuccess,
  adminSurveySetupSuccess,
  adminSurveyConfigurationSuccess,
  deleteMoreInfoPage,
  adminDriverListSuccess,
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
  postAdminSurveyAddAPI,
  postAdminSurveyEditAPI,
  postAdminSurveyEditForImages,
  adminBulkInvitationSendAPI,
  adminBulkArchiveUserAPI,
  deleteMoreInfoPageAPI,
  driverListAPI,
} from '../../services/axios/api'
import { ADMIN_ADD_SURVEY, ADMIN_UPDATE_SURVEY } from '../../constants/actionTypes'

const getAdminUserListAsync = async (surveyId) =>
  await adminUserListAPI(surveyId)
    .then(data => data)
    .catch(error => console.log(error))

const getAdminProjectListAsync = async (userId) =>
  await adminProjectListAPI(userId)
    .then(data => data)
    .catch(error => console.log(error))

const adminAddSurveyAsync = async (data) =>
  await postAdminSurveyAddAPI(data)
    .then(data => data)

const adminUpdateSurveyAsync = async (data) =>
  await postAdminSurveyEditAPI(data)
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

const adminBulkInvitationSendAsync = async (ids) =>
  await adminBulkInvitationSendAPI(ids)
    .then(data => data)

const adminBulkArchiveUserAsync = async (ids) =>
  await adminBulkArchiveUserAPI(ids)
    .then(data => data)

const adminDeleteMoreInfoPageAsync = async (id) =>
  await deleteMoreInfoPageAPI(id)
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

function* adminAddSurvey({ payload }) {
  try {
    const { data, callback } = payload
    const result = yield call(adminAddSurveyAsync, data)
    console.log('result', result)
    callback(true)
  } catch (error) {
    const { callback } = payload
    callback(false)
  }
}

const getDriverListAysnc = async (surveyId) =>
  await driverListAPI(surveyId)
    .then((data) => data)
    .catch((error) => error);

function* adminGetDriverList({ payload }) {
  try {
    const { surveyId } = payload;
    const result = yield call(getDriverListAysnc, surveyId);

    if (result.status === 200) {
      yield put(adminDriverListSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

function* adminUpdateSurvey({ payload }) {
  try {
    const { surveyId, data, callback} = payload
    const request = {
      ...data,
      survey: surveyId
    }
    console.log("heehe", request)
    const result = yield call(adminUpdateSurveyAsync, request)
    console.log('result', result)
    callback(true)
  } catch (error) {
    const { callback } = payload
    console.log('error', error)
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
      yield put(adminSurveyConfigurationSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* adminSendBulkInvitation({ payload }) {
  try {
    const { data, callback } = payload
    const result = yield call(adminBulkInvitationSendAsync, data)
    console.log('result', result)
    if (result.status === 201) {
      callback(true)
    }
  } catch (error) {
    const { callback } = payload
    callback(false)
  }
}

function* adminBulkArchiveUser({ payload }) {
  try {
    const { data, callback } = payload
    const result = yield call(adminBulkArchiveUserAsync, data)
    console.log('result', result)
    if (result.status === 201) {
      callback(true)
    }
  } catch (error) {
    const { callback } = payload
    callback(false)
  }
}

function* adminDeleteMoreInfoPage({ payload }) {
  const {id, callback, index} = payload
  try {
    const result = yield call(adminDeleteMoreInfoPageAsync, id)
    console.log('result', result)
    if(result.status === 204) {
      callback(true, index)
    } else {
      callback(false, index)
    }
  } catch (error) {
    if(error.response.status === 404) {
      callback(true, index)
    } else {
      callback(false, index)
    }
  }
}

export function* watchAdminUserList() {
  yield takeEvery(ADMIN_USER_LIST, getAdminUserList)
}

export function* watchAdminAddSurvey() {
  yield takeEvery(ADMIN_ADD_SURVEY, adminAddSurvey)
}

export function* watchAdminUpdateSurvey() {
  yield takeEvery(ADMIN_UPDATE_SURVEY, adminUpdateSurvey)
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

export function* watchAdminSendBulkInvitation() {
  yield takeEvery(ADMIN_SEND_BULK_INVITATION, adminSendBulkInvitation)
}

export function* watchAdminBulkArchiveUser() {
  yield takeEvery(ADMIN_BULK_ARCHIVE_USER, adminBulkArchiveUser)
}

export function* watchAdminDelMoreInfoPage() {
  yield takeEvery(DEL_MORE_INFO_PAGE, adminDeleteMoreInfoPage)
}

export function* watchAdminGetDriverList() {
  yield takeEvery(ADMIN_GET_DRIVER_LIST, adminGetDriverList)
}

export default function* rootSaga() {
  yield all([
    fork(watchAdminUserList),
    fork(watchAdminAddSurvey),
    fork(watchAdminUpdateSurvey),
    fork(watchAdminProejctList),
    fork(watchAdminSetActive),
    fork(watchAdminAMQuestionList),
    fork(watchAdminAOQuestionList),
    fork(watchAdminSurveySetup),
    fork(watchAdminSurveyConfiguration),
    fork(watchAdminSendBulkInvitation),
    fork(watchAdminBulkArchiveUser),
    fork(watchAdminDelMoreInfoPage),
    fork(watchAdminGetDriverList),
  ]);
}
