import {
  PAGE_LIST,
  PAGE_LIST_SUCCESS,
  SELECT_PAGE,
  CONTINUE_SURVEY
} from 'Constants/actionTypes';

export const pageList = () => ({
  type: PAGE_LIST,
  payload: { }
});

export const pageListSuccess = (pageList) => ({
  type: PAGE_LIST_SUCCESS,
  payload: pageList
});

export const selectPage = pageIndex => ({
  type: SELECT_PAGE,
  payload: { pageIndex }
})

export const continueSurvey = (pageIndex, percentage) => ({
  type: CONTINUE_SURVEY,
  payload: { pageIndex, percentage }
})