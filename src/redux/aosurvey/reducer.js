// import {
//   PAGE_LIST,
//   PAGE_LIST_SUCCESS,
//   SELECT_PAGE,
//   CONTINUE_SURVEY,
//   INPUT_ANSWER,
//   SUBMIT_SURVEY,
//   SUBMIT_SURVEY_SUCCESS,
//   ABOUTME
// } from "Constants/actionTypes";

const INIT_STATE = {
  questionList: [
    {
      driver: 'Sentiment',
      questionText: 'How do you think FullName feels the project is going?',
      sliderTextRight: 'Much',
      sliderTextLeft: 'Never',
      controlType: 2,
    },
    {
      driver: 'Confidence',
      questionText: 'How do you think about this project?',
      sliderTextRight: 'Best',
      sliderTextLeft: 'Worst',
      controlType: 2,
    },
    {
      driver: 'Influence',
      questionText: 'What is your name?',
      sliderTextRight: 'Much',
      sliderTextLeft: 'Never',
      controlType: 1,
    },
],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
