import { all, call, fork, takeEvery, put } from 'redux-saga/effects'
import { ADMIN_USER_LIST } from 'Constants/actionTypes'
import { adminUserListSuccess } from './actions'
import { adminUserListAPI } from '../../services/axios/api'

const getAdminUserListAsync = async (surveyId) => {
  await adminUserListAPI(surveyId)
    .then(data => data)
    .catch(error => console.log(error))
}

function* getAdminUserList({ payload }) {
  try {
    const { surveyId } = payload
    const result = yield call(getAdminUserListAsync, surveyId)
    if (result.state === 200) {
      yield put(adminUserListSuccess(result.data))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchAdminUserList() {
  yield takeEvery(ADMIN_USER_LIST, getAdminUserList)
}

export default function* rootSaga() {
  yield all([fork(watchAdminUserList),]);
}