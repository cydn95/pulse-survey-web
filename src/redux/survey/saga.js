
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  getToken
} from '../../services/axios/utility';

import {
    pageListAPI,
    submitSurveyAPI,
    optionListAPI
} from '../../services/axios/api';

import {
  PAGE_LIST,
  SUBMIT_SURVEY
} from 'Constants/actionTypes';

import { controlTypeText } from 'Constants/defaultValues'

import {
  pageListSuccess,
  submitSurveySuccess,
  driverListSuccess
} from '../actions';

const getPageListAsync = async () =>
    await pageListAPI()
      .then(result => result)
      .catch(error => error);

const getOptionListAsync = async () =>
    await optionListAPI()
      .then(result => result)
      .catch(error => error);

function* getPageList() {
   
  try {
    const result = yield call(getPageListAsync);

    if (result.status === 200) {

      // Get Available Driver List
      let driverList = [];
      result.data.forEach(driver => {
        driverList.push({
            driverId: driver.id,
            driverName: driver.driverName,
            icon: "user",
            percentage: 0,
            progress: 0
        });
      });
      yield put(driverListSuccess(driverList));

      const questionList  = [ ...result.data ];

      for (let i = 0; i < questionList.length; i++) {
        for (let j = 0; j < questionList[i].amquestion.length; j++) {
          questionList[i].amquestion[j] = {
            ...questionList[i].amquestion[j],
            answer: {
              pageIndex: i,
              questionIndex: j,
              integerValue: 0,
              topicValue: "",
              commentValue: "",
              skipValue: "",
              topicTags: "",
              commentTags: "",
              user: 0,
              subjectUser: 0,
              survey: questionList[i].amquestion[j].survey,
              amQuestion: questionList[i].amquestion[j].id,
              type: 'me',
              controlType: controlTypeText(questionList[i].amquestion[j].controlType)
            }
          }
        }
      }

      const result_option = yield call(getOptionListAsync);
      if (result_option.status === 200) {
        const optionList = result_option.data;
        yield put(pageListSuccess(questionList, optionList));
      }
        
    } else {
      console.log('login failed :', result.statusText)
    }
  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchPageList() {
  yield takeEvery(PAGE_LIST, getPageList);
}

const submitSurveyAsync = async (answerData) =>
    await submitSurveyAPI(answerData)
      .then(result => result)
      .catch(error => error);

/** 
  [{
    "integerValue": null,
    "topicValue": "",
    "commentValue": "",
    "skipValue": "",
    "topicTags": "",
    "commentTags": "",
    "user": null,
    "subjectUser": null,
    "survey": null,
    "amQuestion": null
  }]
*/
function* submitSurvey( { payload }) {

  const { surveyList, projectId, history } = payload;
  let answerList = [];
  
  for (let i = 0; i < surveyList.length; i++) {

    let amquestions = surveyList[i].amquestion;

    for (let j = 0; j < amquestions.length; j++) {

      if ((amquestions[j].answer.integerValue === '' || amquestions[j].answer.integerValue === 0) 
        && amquestions[j].answer.topicValue === '' && amquestions[j].answer.commentValue === ''
        && amquestions[j].answer.skipValue === '') {
          continue;
      }
      
      let answer = Object.assign({}, {
        "integerValue": amquestions[j].answer.integerValue,
        "topicValue": amquestions[j].answer.topicValue,
        "commentValue": amquestions[j].answer.commentValue,
        "skipValue": amquestions[j].answer.skipValue,
        "topicTags": amquestions[j].answer.topicTags,
        "commentTags": amquestions[j].answer.commentTags,
        "user": getToken().userId,
        "subjectUser": getToken().userId,
        "survey": amquestions[j].answer.survey,
        "amQuestion": amquestions[j].answer.amQuestion,
        "project": projectId,
        "controlType": amquestions[j].answer.controlType
      });

      answerList.push(answer);
    }
  }

  if (answerList.length === 0) {
    return
  }
  
  try {
    let result = yield call(submitSurveyAsync, answerList);

    if (result.status === 201) {
      var surveyId = projectId;
      
      localStorage.setItem('surveyId', surveyId);
      yield put(submitSurveySuccess(surveyId));
      history.push('/app/me');

    } else {
      console.log('submit failed')
    }
  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchSubmitSurvey() {
  yield takeEvery(SUBMIT_SURVEY, submitSurvey);
}

export default function* rootSaga() {
  yield all([
    fork(watchPageList),
    fork(watchSubmitSurvey)
  ]);
}