
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { teamListAPI, shgroupListAPI } from '../../services/axios/api';

import {
    TEAM_LIST,
    SHGROUP_LIST
} from 'Constants/actionTypes';

import {
    teamListSuccess,
    shgroupListSuccess
} from './actions';

const getTeamListAysnc = async () =>
    await teamListAPI()
        .then(data => data)
        .catch(error => error);

function* getTeamList() {
	try {
		const result = yield call(getTeamListAysnc);
        
        if (result.status === 200) {
            yield put(teamListSuccess(result.data.results)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const getShgroupListAysnc = async () =>
    await shgroupListAPI()
        .then(data => data)
        .catch(error => error);

function* getShgroupList() {
	try {
		const result = yield call(getShgroupListAysnc);
        
        if (result.status === 200) {
            yield put(shgroupListSuccess(result.data.results)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

export function* watchTeamList() {
    yield takeEvery(TEAM_LIST, getTeamList);
}

export function* watchShgroupList() {
    yield takeEvery(SHGROUP_LIST, getShgroupList);
}

export default function* rootSaga() {
    yield all([
        fork(watchTeamList),
        fork(watchShgroupList)
    ]);
}