
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { myMapAPI } from '../../services/axios/api';

import {
    KMAP_DATA
} from 'Constants/actionTypes';

import {
    kMapDataSuccess
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

export function* watchKMapData() {
    yield takeEvery(KMAP_DATA, getKMapData);
}

export default function* rootSaga() {
    yield all([
        fork(watchKMapData)
    ]);
}