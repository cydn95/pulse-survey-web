import {
  PAGE_LIST,
  PAGE_LIST_SUCCESS,
  SELECT_PAGE,
  CONTINUE_SURVEY,
  INPUT_ANSWER,
  SUBMIT_SURVEY,
  SUBMIT_SURVEY_SUCCESS,
  ABOUTME,
  ADD_ABOUT_ME_TOPIC_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  pageList: [],
  percentage: 0,
  pageIndex: 0,
  loading: false,
  optionList: [],
  aboutMe: {
    "project": 1,
    "user": localStorage.getItem("userId"),
    "userPermission": [1],
    "team": 0,
    "shGroup": 0
  },
  "surveyId": localStorage.getItem("surveyId")
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PAGE_LIST:
      return { ...state, loading: true };
    case PAGE_LIST_SUCCESS:
      return { ...state, loading: false, pageIndex: 0, pageList: action.payload.pageList, optionList: action.payload.optionList };
    case SELECT_PAGE:
      return { ...state, pageIndex: action.payload.pageIndex };
    case CONTINUE_SURVEY:
      return { ...state, pageIndex: action.payload.pageIndex, percentage: action.payload.percentage };
    case INPUT_ANSWER:
      const { answer } = action.payload;

      if (answer.type === 'me') {
        state.pageList[answer.pageIndex].amquestion[answer.questionIndex].answer = {
          ...answer,
          responsestatus: true
        };
      } else {
        state.pageList[answer.pageIndex].aoquestion[answer.questionIndex].answer = {
          ...answer
        };
      }
      return { ...state };
    case ADD_ABOUT_ME_TOPIC_SUCCESS:
      const {topic, pageIndex, questionIndex} = action.payload;
      state.pageList[pageIndex].amquestion[questionIndex].topic.push(topic);
      return { ...state };
    case SUBMIT_SURVEY:
      return { ...state, loading: false };
    case SUBMIT_SURVEY_SUCCESS:
      return { ...state, loading: true, surveyId: action.payload.surveyId };
    case ABOUTME:
      return { ...state, aboutMe: action.payload.data }
    default:
      return { ...state };
  }
};
