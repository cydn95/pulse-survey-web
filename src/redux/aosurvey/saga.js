import {
  getToken
} from '../../services/axios/utility';

import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    aoQuestionListAPI,
    optionListAPI,
    submitAoQuestionAPI,
    addNewTopicAboutOtherAPI
} from '../../services/axios/api';

import {
  AOQUESTION_LIST,
  SUBMIT_AOQUESTION,
  ADD_ABOUT_OTHER_TOPIC
} from 'Constants/actionTypes';

import {
  aoQuestionListSuccess,
  submitAoQuestionSuccess,
  addAboutOtherTopicSuccess
} from './actions';

import { controlType, controlTypeText } from 'Constants/defaultValues'

const getAoQuestionListAsync = async (projectUserId) =>
    await aoQuestionListAPI(projectUserId)
      .then(result => result)
      .catch(error => error);

const getOptionListAsync = async () =>
    await optionListAPI()
      .then(result => result)
      .catch(error => error);

function* getAoQuestionList({payload}) {
  const { projectUserId } = payload;
  try {
    const result = yield call(getAoQuestionListAsync, projectUserId);

    if (result.status === 200) {
      const result_option = yield call(getOptionListAsync);
      
      if (result_option.status === 200) {
        const optionList = result_option.data;

        const questionList  = [];

        for (let i = 0; i < result.data.length; i++) {
          for (let j = 0; j < result.data[i].aoquestion.length; j++) {
            questionList.push(result.data[i].aoquestion[j])
          }
        }

        let aoQuestionList = questionList;

        aoQuestionList = aoQuestionList.filter(item => {
          if (item.controlType === controlType.TWO_OPTIONS || item.controlType === controlType.MULTI_OPTIONS) {
            if (item.option.length === 0) {
              return false;
            }
          }
          return true;
        });

        for (let i = 0; i < aoQuestionList.length; i++) {

          if (aoQuestionList[i].controlType === controlType.TWO_OPTIONS 
            || aoQuestionList[i].controlType === controlType.MULTI_OPTIONS) {
            if (aoQuestionList[i].option.length === 0) {
              aoQuestionList.splice(i, 1);
              i--;
              continue;
            }
          }

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
        }

        yield put(aoQuestionListSuccess(aoQuestionList, optionList));
      }
    } else {
      console.log('login failed :', result.statusText)
    }

  } catch (error) {
    console.log('survey error : ', error)
  }
}

const submitAoQuestionAsync = async (answerData) =>
    await submitAoQuestionAPI(answerData)
      .then(result => result)
      .catch(error => error);

function* submitAoQuestion({ payload }) {

  const { questionList, history, surveyUserId } = payload;

  let answerList = [];

  for (let i = 0; i < questionList.length; i++) {

    if (surveyUserId.split('_').length !== 2) {
      continue;
    }

    let integerValue = questionList[i].answer.integerValue;
    let isTopic = false;
    if (integerValue.toString().includes("T-")) {
      integerValue = integerValue.toString().replace("T-", "");
      isTopic = true;
    }
    integerValue = Math.floor(parseInt(integerValue, 10));

    let answer = {
      "controlType": controlTypeText(questionList[i].controlType),
      "integerValue": integerValue,
      "topicValue": questionList[i].answer.topicValue,
      "commentValue": questionList[i].answer.commentValue,
      "skipValue": questionList[i].answer.skipValue,
      "topicTags": isTopic ? questionList[i].answer.topicValue : questionList[i].answer.topicTags,
      "commentTags": questionList[i].answer.commentTags,
      "user": getToken().userId,
      "subjectUser": surveyUserId.split('_')[1] ,
      "survey": questionList[i].answer.survey.id,
      "project": questionList[i].answer.survey.project,
      "aoQuestion": questionList[i].answer.amQuestion
    }

    if (answer.integerValue == 0 && answer.topicValue == "" && answer.commentValue == "" && answer.skipValue == "") {
      continue;
    }

    answerList.push(answer);
  }

  try {
    
    let result = yield call(submitAoQuestionAsync, answerList);
    
    if (result.status === 201) {
      
      yield put(submitAoQuestionSuccess());
      history.push('/app/dashboard');
    } else {
      console.log('submit failed')
    }
  } catch (error) {
    console.log('survey error : ', error)
  }

}

const addAboutOtherTopicAsync = async (topicName, topicComment, questionId, projectUserId) =>
    await addNewTopicAboutOtherAPI(topicName, topicComment, questionId, projectUserId)
      .then(result => result)
      .catch(error => error);

function* addAboutOtherTopic( { payload }) {

  const { topicName, topicComment, questionId, projectUserId, questionIndex, callback } = payload;

  try {
    let result = yield call(addAboutOtherTopicAsync, topicName, topicComment, questionId, projectUserId);

    if (result.status === 201) {
      yield put(addAboutOtherTopicSuccess(result.data, questionIndex));
      callback(result.data);
    } 
  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchAoQuestionList() {
  yield takeEvery(AOQUESTION_LIST, getAoQuestionList);
}

export function* watchAoQuestionSubmit() {
  yield takeEvery(SUBMIT_AOQUESTION, submitAoQuestion);
}

export function* watchAddAboutOtherTopic() {
  yield takeEvery(ADD_ABOUT_OTHER_TOPIC, addAboutOtherTopic);
}

export default function* rootSaga() {
  yield all([
    fork(watchAoQuestionList),
    fork(watchAoQuestionSubmit),
    fork(watchAddAboutOtherTopic)
  ]);
}