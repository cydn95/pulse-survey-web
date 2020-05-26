import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  myMapAPI,
  saveKMapAPI,
  projectMapAPI,
  saveProjectMapAPI,
} from "../../services/axios/api";

import {
  KMAP_DATA,
  KMAP_SAVE,
  PROJECTMAP_DATA,
  PROJECTMAP_SAVE,
} from "Constants/actionTypes";

import {
  kMapDataSuccess,
  kMapSaveSuccess,
  projectMapDataSuccess,
  projectMapSaveSuccess,
} from "./actions";

const getKMapDataAysnc = async (projectUserId) =>
  await myMapAPI(projectUserId)
    .then((data) => data)
    .catch((error) => error);

function* getKMapData({ payload }) {
  const { projectUserId } = payload;

  try {
    const result = yield call(getKMapDataAysnc, projectUserId);

    if (result.status === 200) {
      yield put(kMapDataSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getProjectMapDataAysnc = async (projectUserId) =>
  await projectMapAPI(projectUserId)
    .then((data) => data)
    .catch((error) => error);

function* getProjectMapData({ payload }) {
  const { projectUserId } = payload;

  try {
    const result = yield call(getProjectMapDataAysnc, projectUserId);

    if (result.status === 200) {
      yield put(projectMapDataSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const saveKMapDataAysnc = async (mapData) =>
  await saveKMapAPI(mapData)
    .then((data) => data)
    .catch((error) => error);

function* saveKMapData({ payload }) {
  const { mapData } = payload;

  try {
    const result = yield call(saveKMapDataAysnc, mapData);

    if (result.status === 201) {
      yield put(kMapSaveSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const saveProjectMapDataAysnc = async (mapData) =>
  await saveProjectMapAPI(mapData)
    .then((data) => data)
    .catch((error) => error);

function* saveProjectMapData({ payload }) {
  const { mapData } = payload;

  try {
    const result = yield call(saveProjectMapDataAysnc, mapData);

    if (result.status === 201) {
      yield put(projectMapSaveSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchKMapDataGet() {
  yield takeEvery(KMAP_DATA, getKMapData);
}

export function* watchKMapDataSave() {
  yield takeEvery(KMAP_SAVE, saveKMapData);
}

export function* watchProjectMapDataGet() {
  yield takeEvery(PROJECTMAP_DATA, getProjectMapData);
}

export function* watchProjectMapDataSave() {
  yield takeEvery(PROJECTMAP_SAVE, saveProjectMapData);
}

export default function* rootSaga() {
  yield all([
    fork(watchKMapDataGet),
    fork(watchKMapDataSave),
    fork(watchProjectMapDataGet),
    fork(watchProjectMapDataSave),
  ]);
}
