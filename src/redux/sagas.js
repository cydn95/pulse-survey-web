import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import surveySagas from './survey/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    surveySagas()
  ]);
}
