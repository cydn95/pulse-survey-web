import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getNikelTourAPI,
  getTooltipGuideAPI,
  getConfigPageAPI,
} from "../../services/axios/api";

import {
  NIKEL_TOUR_CONTENT,
  TOOLTIP_TOUR_CONTENT,
  PAGE_CONTENT,
} from "Constants/actionTypes";

import {
  nikelTourContentSuccess,
  tooltipTourContentSuccess,
  pageContentSuccess,
} from "../actions";

const getNikelTourContentAsync = async (surveyId) =>
  await getNikelTourAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

function* getNikelTourContent({ payload }) {
  const { surveyId } = payload;
  try {
    const result = yield call(getNikelTourContentAsync, surveyId);

    if (result.status === 200) {
      yield put(nikelTourContentSuccess(result.data));
    }
  } catch (error) {}
}

const getTooltipTourContentAsync = async () =>
  await getTooltipGuideAPI()
    .then((result) => result)
    .catch((error) => error);

function* getTooltipTourContent() {
  try {
    const result = yield call(getTooltipTourContentAsync);

    if (result.status === 200) {
      yield put(tooltipTourContentSuccess(result.data));
    }
  } catch (error) {}
}

const getPageContentAsync = async (surveyId) =>
  await getConfigPageAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

function* getPageContent({ payload }) {
  try {
    const { surveyId } = payload;
    const result = yield call(getPageContentAsync, surveyId);

    if (result.status === 200) {
      yield put(pageContentSuccess(result.data));
    }
  } catch (error) {}
}

export function* watchNikelTourContentList() {
  yield takeEvery(NIKEL_TOUR_CONTENT, getNikelTourContent);
}

export function* watchTooltipTourContentList() {
  yield takeEvery(TOOLTIP_TOUR_CONTENT, getTooltipTourContent);
}

export function* watchPageContentList() {
  yield takeEvery(PAGE_CONTENT, getPageContent);
}

export default function* rootSaga() {
  yield all([
    fork(watchNikelTourContentList),
    fork(watchTooltipTourContentList),
    fork(watchPageContentList),
  ]);
}
