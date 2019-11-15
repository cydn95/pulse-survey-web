
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  getToken
} from '../../services/axios/utility';

import {
    aoQuestionListAPI,
    optionListAPI,
    submitAoQuestionAPI
} from '../../services/axios/api';

import {
  AOQUESTION_LIST,
  SUBMIT_AOQUESTION
} from 'Constants/actionTypes';

import {
  aoQuestionListSuccess
} from './actions';

const getAoQuestionListAsync = async () =>
    await aoQuestionListAPI()
      .then(result => result)
      .catch(error => error);

const getOptionListAsync = async () =>
    await optionListAPI()
      .then(result => result)
      .catch(error => error);

function* getAoQuestionList() {
   
  try {
    const result = yield call(getAoQuestionListAsync);
    
    if (result.status === 200) {
      const result_option = yield call(getOptionListAsync);
      
      if (result_option.status === 200) {
        const optionList = result_option.data;
        let aoQuestionList = result.data;

        for (let i = 0; i < aoQuestionList.length; i++) {
          aoQuestionList[i] = {
            ...aoQuestionList[i],
            answer: {
              pageIndex: 0,
              questionIndex: i,
              integerValue: 0,
              topicValue: "",
              commentValue: "",
              skipValue: "",
              topicTags: "",
              commentTags: "",
              user: 0,
              subjectUser: 0,
              survey: aoQuestionList[i].survey,
              amQuestion: aoQuestionList[i].id,
              type: 'other'
            }
          }
          yield put(aoQuestionListSuccess(aoQuestionList, optionList));
        }
      }
    } else {
      console.log('login failed :', result.statusText)
    }

  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchAoQuestionList() {
  yield takeEvery(AOQUESTION_LIST, getAoQuestionList);
}

export default function* rootSaga() {
  yield all([
    fork(watchAoQuestionList)
  ]);
}