import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
  REPORT_PARTICIPATION,
  REPORT_ENGAGEMENT_TREND,
  REPORT_WORDCLOUD,
  REPORT_SENTIMENT,
  REPORT_PERCEPTION_REALITY,
  REPORT_BUBBLECHART,
  REPORT_MY_MATRIX,
  REPORT_PROJECT_MATRIX,
  REPORT_TEXT_VALUE,
  REPORT_GET_ACKNOWLEDGEMENT,
  REPORT_SET_ACKNOWLEDGEMENT,
  REPORT_VOTE_KEYTHEME,
  REPORT_AMQUESTIONCNT,
  REPORT_ADVISOR,
  REPORT_CHECK_DASHBOARD,
  REPORT_DRIVER_ANALYSIS_CNT,
  REPORT_KEYTHEME_MENU_CNT
} from "Constants/actionTypes";

export const overallSentiment = (surveyId, callback) => ({
  type: REPORT_OVERALL_SENTIMENT,
  payload: { surveyId, callback },
});

export const topPositiveNegative = (surveyId, callback) => ({
  type: REPORT_TOP_POSITIVE_NEGATIVE,
  payload: { surveyId, callback },
});

export const feedbackSummary = (projectId, surveyId, subProjectUser, graphType, callback) => ({
  type: REPORT_FEEDBACK_SUMMARY,
  payload: { projectId, surveyId, subProjectUser, graphType, callback },
});

export const participation = (surveyId, callback) => ({
  type: REPORT_PARTICIPATION,
  payload: { surveyId, callback },
});

export const engagementTrend = (chartType, driverName, surveyId, subProjectUser, projectId, userId, startDate, endDate, callback) => ({
  type: REPORT_ENGAGEMENT_TREND,
  payload: { chartType, driverName, surveyId, subProjectUser, projectId, userId, startDate, endDate, callback },
});

export const wordcloud = (surveyId, projectUserId, callback) => ({
  type: REPORT_WORDCLOUD,
  payload: { surveyId, projectUserId, callback },
});

export const sentimentReport = (surveyId, startDate, endDate, callback) => ({
  type: REPORT_SENTIMENT,
  payload: { surveyId, startDate, endDate, callback },
});

export const perceptionRealityReport = (surveyId, projectUserId, callback) => ({
  type: REPORT_PERCEPTION_REALITY,
  payload: { surveyId, projectUserId, callback },
});

export const bubbleChart = (surveyId, projectUserId, callback) => ({
  type: REPORT_BUBBLECHART,
  payload: { surveyId, projectUserId, callback },
});

export const myMatrixReport = (surveyId, projectUserId, callback) => ({
  type: REPORT_MY_MATRIX,
  payload: { surveyId, projectUserId, callback }
});

export const projectMatrixReport = (surveyId, projectUserId, callback) => ({
  type: REPORT_PROJECT_MATRIX,
  payload: { surveyId, projectUserId, callback }
});

export const textValueReport = (surveyId, tab, projectUserId, callback) => ({
  type: REPORT_TEXT_VALUE,
  payload: { surveyId, tab, projectUserId, callback }
});

export const getAcknowledgementReport = (responseId, projectUserId, callback) => ({
  type: REPORT_GET_ACKNOWLEDGEMENT,
  payload: { responseId, projectUserId, callback }
});

export const setAcknowledgementReport = (responseId, data, callback) => ({
  type: REPORT_SET_ACKNOWLEDGEMENT,
  payload: { responseId, data, callback }
});

export const voteKeyThemeReport = (key, vote, projectUserId, voteId, surveyId, tab, callback) => ({
  type: REPORT_VOTE_KEYTHEME,
  payload: { key, vote, projectUserId, voteId, surveyId, tab, callback }
});

export const getAMQuestionCnt = (surveyId, driverName, projectId, userId, callback) => ({
  type: REPORT_AMQUESTIONCNT,
  payload: { surveyId, driverName, projectId, userId, callback }
});

export const advisorReport = (surveyId, projectUserId, callback) => ({
  type: REPORT_ADVISOR,
  payload: { surveyId, projectUserId, callback }
})

export const checkDashboard = (surveyId, projectUserId, callback) => ({
  type: REPORT_CHECK_DASHBOARD,
  payload: { surveyId, projectUserId, callback }
})

export const driverAnalysisCnt = (surveyId, subProjectUser, startDate, endDate, callback) => ({
  type: REPORT_DRIVER_ANALYSIS_CNT,
  payload: { surveyId, subProjectUser, startDate, endDate, callback }
})

export const getKeyThemeMenuCnt = (surveyId, projectUserId, callback) => ({
  type: REPORT_KEYTHEME_MENU_CNT,
  payload: { surveyId, projectUserId, callback }
})