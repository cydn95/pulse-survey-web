
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { loginAPI } from '../../services/axios/api';

import {
    LOGIN_USER,
    LOGOUT_USER
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
	logoutUser
} from './actions';

const loginWithUsernamePasswordAsync = async (username, password) =>
    await loginAPI(username, password)
        .then(authUser => authUser)
        .catch(error => error);

function* loginWithUsernamePassword({ payload }) {

	const { username, password } = payload.user;
	const { history } = payload;
	
	try {
			const loginUser = yield call(loginWithUsernamePasswordAsync, username, password);
            
			if (loginUser.data) {

                let userId = loginUser.data.id;
                let accessToken = loginUser.data.token;
                if (accessToken !== '') {
                    
                // Save admin info to localStorage
                localStorage.setItem('userId', userId);
                localStorage.setItem('accessToken', accessToken);

                let authData = {
                    userId,
                    accessToken
                };

                yield put(loginUserSuccess(authData));
                history.push('/');

                return;
                }
			}
			
			console.log('login failed')

	} catch (error) {
			// catch throw
			console.log('login error : ', error)
	}
}

function* logout({payload}) {
    const { history } = payload
    try {
            // yield call(logoutAsync, history);
            localStorage.removeItem('accessToken');
            yield call(logoutUser, history);
            history.push('/')
    } catch (error) {
    }
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithUsernamePassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser)
    ]);
}