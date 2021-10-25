import { all, call, fork, takeEvery, put } from 'redux-saga/effects'
import { ADMIN_USER_LIST, ADMIN_UPDATE_USER_LIST } from 'Constants/actionTypes'
import { adminUserListSuccess } from './actions'
import { adminUserListAPI, postAdminUserListAPI } from '../../services/axios/api'

const getAdminUserListAsync = async (surveyId) =>
  await adminUserListAPI(surveyId)
    .then(data => data)
    .catch(error => console.log(error))


const postAdminUserListAsync = async (data) =>
  await postAdminUserListAPI(data)
    .then(data => data)

function* getAdminUserList({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminUserListAsync, surveyId)
    if (result.status === 200) {
      yield put(adminUserListSuccess(result.data))
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

export function* watchAdminUserList() {
  yield takeEvery(ADMIN_USER_LIST, getAdminUserList)
}

export function* watchPostAdminUserList() {
  yield takeEvery(ADMIN_UPDATE_USER_LIST, postAdminUserList)
}

export default function* rootSaga() {
  yield all([
    fork(watchAdminUserList),
    fork(watchPostAdminUserList),
  ]);
}
