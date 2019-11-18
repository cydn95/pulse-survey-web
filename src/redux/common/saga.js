
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { teamListAPI, shgroupListAPI, optionListAPI, driverListAPI, skipQuestionListAPI } from '../../services/axios/api';

import {
    TEAM_LIST,
    SHGROUP_LIST,
    OPTION_LIST,
    DRIVER_LIST,
    SKIP_QUESTION_LIST
} from 'Constants/actionTypes';

import {
    teamListSuccess,
    shgroupListSuccess,
    optionListSuccess,
    driverListSuccess,
    skipQuestionListSuccess
} from './actions';

const getTeamListAysnc = async () =>
    await teamListAPI()
        .then(data => data)
        .catch(error => error);

function* getTeamList() {
	try {
		const result = yield call(getTeamListAysnc);
        
        if (result.status === 200) {
            yield put(teamListSuccess(result.data)); 
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
            yield put(shgroupListSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const getOptionListAysnc = async () =>
    await optionListAPI()
        .then(data => data)
        .catch(error => error);

function* getOptionList() {
	try {
		const result = yield call(getOptionListAysnc);
        
        if (result.status === 200) {
            yield put(optionListSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const getDriverListAysnc = async () =>
    await driverListAPI()
        .then(data => data)
        .catch(error => error);

function* getDriverList() {
	try {
		const result = yield call(getDriverListAysnc);
        
        if (result.status === 200) {
            yield put(driverListSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const getSkipQuestionListAysnc = async () =>
    await skipQuestionListAPI()
        .then(data => data)
        .catch(error => error);

function* getSkipQuestionList() {
	try {
		const result = yield call(getSkipQuestionListAysnc);
        
        if (result.status === 200) {
            yield put(skipQuestionListSuccess(result.data)); 
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

export function* watchOptionList() {
    yield takeEvery(OPTION_LIST, getOptionList);
}

export function* watchDriverList() {
    yield takeEvery(DRIVER_LIST, getDriverList);
}

export function* watchSkipQuestionList() {
    yield takeEvery(SKIP_QUESTION_LIST, getSkipQuestionList);
}

export default function* rootSaga() {
    yield all([
        fork(watchTeamList),
        fork(watchShgroupList),
        fork(watchDriverList),
        fork(watchOptionList),
        fork(watchSkipQuestionList)
    ]);
}