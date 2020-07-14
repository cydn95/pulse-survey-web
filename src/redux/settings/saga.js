import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  projectListByUserAPI,
  surveyListByProjectAPI,
} from "../../services/axios/api";

import {
  PROJECT_LIST_BY_USER,
  SURVEY_LIST_BY_PROJECT,
} from "Constants/actionTypes";

import {
  projectListByUserSuccess,
  surveyListByProjectSuccess,
} from "Redux/actions";

const getProjectListByUserAsync = async (userId) =>
  await projectListByUserAPI(userId)
    .then((data) => data)
    .catch((error) => error);

function* getProjectListByUser({ payload }) {
  try {
    const { userId } = payload;
    const result = yield call(getProjectListByUserAsync, userId);

    if (result.status === 200) {
      yield put(projectListByUserSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getSurveyListByProjectAsync = async (projectId) =>
  await surveyListByProjectAPI(projectId)
    .then((data) => data)
    .catch((error) => error);

function* getSurveyListByProject({ payload }) {
  try {
    const { projectId, callback } = payload;
    const result = yield call(getSurveyListByProjectAsync, projectId);
    
    if (result.status === 200) {
      yield put(surveyListByProjectSuccess(result.data));
      if (callback !== undefined) {
        callback(result.data);
      }
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchProjectListByUser() {
  yield takeEvery(PROJECT_LIST_BY_USER, getProjectListByUser);
}

export function* watchSurveyListByProject() {
  yield takeEvery(SURVEY_LIST_BY_PROJECT, getSurveyListByProject);
}

export default function* rootSaga() {
  yield all([fork(watchProjectListByUser), fork(watchSurveyListByProject)]);
}
