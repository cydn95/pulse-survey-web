
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { myMapAPI, saveKMapAPI } from '../../services/axios/api';

import {
    KMAP_DATA,
    KMAP_SAVE
} from 'Constants/actionTypes';

import {
    kMapDataSuccess,
    kMapSaveSuccess
} from './actions';

const getKMapDataAysnc = async (userId, projectId) =>
    await myMapAPI(userId, projectId)
        .then(data => data)
        .catch(error => error);

function* getKMapData({ payload }) {
    
    const { userId, projectId } = payload;

	try {
		const result = yield call(getKMapDataAysnc, userId, projectId);
                
        if (result.status === 200) {
            yield put(kMapDataSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

const saveKMapDataAysnc = async (mapData) =>
    await saveKMapAPI(mapData)
        .then(data => data)
        .catch(error => error);

function* saveKMapData({ payload }) {
    
    const { mapData } = payload;
console.log(mapData);
	try {
		const result = yield call(saveKMapDataAysnc, mapData);
                
        if (result.status === 200) {
            yield put(kMapSaveSuccess(result.data)); 
        }
				
	} catch (error) {
		console.log('error : ', error)
	}
}

export function* watchKMapDataGet() {
    yield takeEvery(KMAP_DATA, getKMapData);
}

export function* watchKMapDataSave() {
    yield takeEvery(KMAP_SAVE, saveKMapData);
}

export default function* rootSaga() {
    yield all([
        fork(watchKMapDataGet),
        fork(watchKMapDataSave)
    ]);
}