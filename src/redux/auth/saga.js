
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { loginAPI, setPasswordAPI } from '../../services/axios/api';

import {
    LOGIN_USER,
    LOGOUT_USER,
    SET_PASSWORD
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    logoutUser,
    loginUserFailed
} from './actions';

import { loginErrorType } from 'Constants/defaultValues';

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
console.log(loginUser.data);
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
			} else {
                yield put(loginUserFailed(loginErrorType.INVALID_PASSWORD))
            }
	} catch (error) {
			// catch throw
			console.log('login error : ', error)
	}
}

function* logout({payload}) {
    const { history } = payload;
    try {
        // yield call(logoutAsync, history);
        localStorage.removeItem('accessToken');
        yield call(logoutUser, history);
        history.push('/');
    } catch (error) {
    }
}

const setPasswordAsync = async (email, password, token) =>
    await setPasswordAPI(email, password, token)
        .then(authUser => authUser)
        .catch(error => error);

function* setPassword({ payload }) {

	const { email, password, token, history } = payload;
	
	try {
        const result = yield call(setPasswordAsync, email, password, token);

        if (result.data) {
            localStorage.removeItem('accessToken');
            history.push('/welcome');
            return;
        }
	} catch (error) {
        // catch throw
        console.log(error);
	}
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithUsernamePassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchSetPassword() {
    yield takeEvery(SET_PASSWORD, setPassword);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchSetPassword)
    ]);
}