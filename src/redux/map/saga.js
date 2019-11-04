
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { userListAPI, projectUserListAPI, getKeyDataFromLambda } from '../../services/axios/api';

import {
    USER_LIST,
    PROJECT_USER_LIST,
    KMAP_DATA
} from 'Constants/actionTypes';

import {
    userListSuccess,
    projectUserListSuccess,
    kMapDataSuccess
} from './actions';

const getUserListAysnc = async () =>
    await userListAPI()
        .then(data => data)
        .catch(error => error);

function* getUserList() {
	try {
		const result = yield call(getUserListAysnc);
        
        if (result.status === 200) {
            yield put(userListSuccess(result.data.results)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const getProjectUserListAysnc = async () =>
    await projectUserListAPI()
        .then(data => data)
        .catch(error => error);

function* getProjectUserList() {
	try {
		const result = yield call(getProjectUserListAysnc);
        
        if (result.status === 200) {
            yield put(projectUserListSuccess(result.data.results)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const getKMapDataAysnc = async () =>
    await getKeyDataFromLambda()
        .then(data => data)
        .catch(error => error);

function* getKMapData() {
    
	try {
		const result = yield call(getKMapDataAysnc);
        console.log(result.data);
        // return;
        
        if (result.status === 200) {
            yield put(kMapDataSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

export function* watchUserList() {
    yield takeEvery(USER_LIST, getUserList);
}

export function* watchProjectUserList() {
    yield takeEvery(PROJECT_USER_LIST, getProjectUserList);
}

export function* watchKMapData() {
    yield takeEvery(KMAP_DATA, getKMapData);
}

export default function* rootSaga() {
    yield all([
        fork(watchUserList),
        fork(watchProjectUserList),
        fork(watchKMapData)
    ]);
}