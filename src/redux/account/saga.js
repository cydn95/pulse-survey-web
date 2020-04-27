import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { changePasswordAPI, getProfileAPI, changeProfileAPI, changeAvatarAPI } from '../../services/axios/api';

import {
  CHANGE_PASSWORD, GET_PROFILE, CHANGE_PROFILE, CHANGE_AVATAR
} from 'Constants/actionTypes';

import {
  getProfileSuccess,
} from './actions';

const changePasswordAsync = async (token, email, password) =>
  await changePasswordAPI(token, email, password)
    .then(data => data)
    .catch(error => error);

function* changePassword({ payload }) {
  try {
    const { token, email, password, callback } = payload;
    const result = yield call(changePasswordAsync, token, email, password);

    callback(result);

  } catch (error) {
    console.log('error : ', error)
  }
}

const getProfileAsync = async (userId) =>
  await getProfileAPI(userId)
    .then(data => data)
    .catch(error => error);

function* getProfile({ payload }) {
  try {
    const { userId } = payload;
    const result = yield call(getProfileAsync, userId);

    if (result.data) {
      const profile = {
        id: result.data.id,
        firstName: result.data.first_name,
        lastName: result.data.last_name,
        email: result.data.email,
        team: result.data.userteam.name,
        organization: result.data.organization.name,
        avatarId: result.data.avatar.id,
        avatar: result.data.avatar.name
      }

      yield put(getProfileSuccess(profile));
    };

  } catch (error) {
    console.log('error : ', error)
  }
}

const changeProfileAsync = async (token, firstName, lastName, email, team, organization) =>
  await changeProfileAPI(token, firstName, lastName, email, team, organization)
    .then(data => data)
    .catch(error => error);

function* changeProfile({ payload }) {
  try {
    const { token, firstName, lastName, team, email, organization, callback } = payload;
    const result = yield call(changeProfileAsync, token, firstName, lastName, email, team, organization);

    callback(result);

  } catch (error) {
    console.log('error : ', error)
  }
}

const changeAvatarAsync = async (avatarId, data) =>
  await changeAvatarAPI(avatarId, data)
    .then(data => data)
    .catch(error => error);

function* changeAvatar({ payload }) {
  try {
    const { avatarId, data, callback } = payload;
    const result = yield call(changeAvatarAsync, avatarId, data);
    callback(result);

  } catch (error) {
    console.log('error : ', error)
  }
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

export function* watchGetProfile() {
  yield takeEvery(GET_PROFILE, getProfile);
}

export function* watchChangeProfile() {
  yield takeEvery(CHANGE_PROFILE, changeProfile);
}

export function* watchChangeAvatar() {
  yield takeEvery(CHANGE_AVATAR, changeAvatar);
}

export default function* rootSaga() {
  yield all([
    fork(watchChangePassword),
    fork(watchGetProfile),
    fork(watchChangeProfile),
    fork(watchChangeAvatar),
  ]);
}