import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { projectListByUserAPI } from '../../services/axios/api';

import {
    PROJECT_LIST_BY_USER
} from 'Constants/actionTypes';

import {
    projectListByUserSuccess
} from './actions';

const getProjectListByUserAsync = async (userId) =>
    await projectListByUserAPI(userId)
        .then(data => data)
        .catch(error => error);

function* getProjectListByUser({ payload }) {
	try {
        const { userId } = payload;
		const result = yield call(getProjectListByUserAsync, userId);

        if (result.status === 200) {
            yield put(projectListByUserSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

export function* watchProjectListByUser() {
    yield takeEvery(PROJECT_LIST_BY_USER, getProjectListByUser);
}

export default function* rootSaga() {
    yield all([
        fork(watchProjectListByUser)
    ]);
}