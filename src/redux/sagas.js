import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import surveySagas from './survey/saga';
import commonSagas from './common/saga';
import mapSagas from './map/saga';
import aoSurveySagas from './aosurvey/saga';
import settingSagas from './settings/saga';
import accountSagas from './account/saga';
import tourSagas from "./tour/saga";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    surveySagas(),
    commonSagas(),
    mapSagas(),
    aoSurveySagas(),
    settingSagas(),
    accountSagas(),
    tourSagas()
  ]);
}
