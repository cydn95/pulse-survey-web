
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
        const optionList = result_option.data.results;
        
        let aoQuestionList = result.data.results;
        
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

  //     // get only page which have page_order
  //     let validPageList = result.data.results.filter(item => {
  //       return item.page_order && item.pages
  //     });

  //     // Order by PageOrder Asscend
  //     let orderedPageList = validPageList.sort(
  //       (a, b) => (a.page_order.order > b.page_order.order) ? 1 : -1);
    
  //     for (let i = 0; i < orderedPageList.length; i++) {
        
  

  //       for (let j = 0; j < orderedPageList[i].pages.aopagesetting.length; j++) {
  //         orderedPageList[i].pages.aopagesetting[j] = {
  //           ...orderedPageList[i].pages.aopagesetting[j].aoQuestion,
  //           answer: {
  //             pageIndex: i,
  //             questionIndex: j,
  //             integerValue: 0,
  //             topicValue: "",
  //             commentValue: "",
  //             skipValue: "",
  //             topicTags: "",
  //             commentTags: "",
  //             user: 0,
  //             subjectUser: 0,
  //             survey:  orderedPageList[i].pages.aopagesetting[j].survey,
  //             amQuestion: orderedPageList[i].pages.aopagesetting[j].id,
  //             type: 'other'
  //           }
  //         }
  //       }
  //     }


        
  //   } else {
  //     console.log('login failed :', result.statusText)
  //   }
  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchAoQuestionList() {
  yield takeEvery(AOQUESTION_LIST, getAoQuestionList);
}

/*
const submitAoQuestionAsync = async (answerData) =>
    await submitAoQuestionAPI(answerData)
      .then(result => result)
      .catch(error => error);

function* submitAoQuestion( {payload }) {

  const { surveyList, aboutMe, history } = payload;
  let answerList = [];
  
  for (let i = 0; i < surveyList.length; i++) {

    if (surveyList[i].pages.pageType !== "PG_SURVEY") continue;
    
    let ampagesettings = surveyList[i].pages.ampagesetting;
    let aopagesettings = surveyList[i].pages.aopagesetting;

    let answer = {};

    for (let j = 0; j < ampagesettings.length; j++) {
      answer = {
        "integerValue": ampagesettings[j].answer.integerValue,
        "topicValue": ampagesettings[j].answer.topicValue,
        "commentValue": ampagesettings[j].answer.commentValue,
        "skipValue": ampagesettings[j].answer.skipValue,
        "topicTags": ampagesettings[j].answer.topicTags,
        "commentTags": ampagesettings[j].answer.commentTags,
        "user": getToken().userId,
        "subjectUser": getToken().userId,
        "survey": ampagesettings[j].answer.survey,
        "amQuestion": ampagesettings[j].answer.amQuestion
      }

      answerList.push(answer);
    }

    for (let j = 0; j < aopagesettings.length; j++) {
      answer = {
        "integerValue": aopagesettings[j].answer.integerValue,
        "topicValue": aopagesettings[j].answer.topicValue,
        "commentValue": aopagesettings[j].answer.commentValue,
        "skipValue": aopagesettings[j].answer.skipValue,
        "topicTags": aopagesettings[j].answer.topicTags,
        "commentTags": aopagesettings[j].answer.commentTags,
        "user": getToken().userId,
        "subjectUser": getToken().userId,
        "survey": aopagesettings[j].answer.survey,
        "aoQuestion": aopagesettings[j].answer.amQuestion
      }

      answerList.push(answer);
    }
  }

  try {
    
    let result = yield call(submitAboutMeAsync, aboutMe);
    
    if (result.status === 201) {
      
      result = yield call(submitSurveyAsync, answerList);
      console.log(result);
      
      if (result.status === 201) {
        var surveyId = 0;
        
        result = yield call(getProjectUserListAysnc);
        
        if (result.status === 200) {
          // yield put(projectUserListSuccess(result.data.results)); 
          var projectUserList = result.data.results;
          for (let i = projectUserList.length - 1; i >= 0; i--) {
            if (projectUserList[i].user == localStorage.getItem("userId")) {
              surveyId = projectUserList[i].id;
              localStorage.setItem('surveyId', surveyId);
              yield put(submitSurveySuccess(surveyId));
              history.push('/app/dashboard');
              break;
            }
          }
        }
      } else {
        console.log('submit failed')
      }
    }
  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchSubmitSurvey() {
  yield takeEvery(SUBMIT_SURVEY, submitSurvey);
}
*/
export default function* rootSaga() {
  yield all([
    fork(watchAoQuestionList),
  ]);
}