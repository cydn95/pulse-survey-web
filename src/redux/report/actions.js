import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
  REPORT_PARTICIPATION,
  REPORT_ENGAGEMENT_TREND,
  REPORT_WORDCLOUD,
  REPORT_SENTIMENT,
  REPORT_PERCEPTION_REALITY
} from "Constants/actionTypes";

export const overallSentiment = (surveyId, callback) => ({
  type: REPORT_OVERALL_SENTIMENT,
  payload: { surveyId, callback },
});

export const topPositiveNegative = (surveyId, callback) => ({
  type: REPORT_TOP_POSITIVE_NEGATIVE,
  payload: { surveyId, callback },
});

export const feedbackSummary = (surveyId, subProjectUser, callback) => ({
  type: REPORT_FEEDBACK_SUMMARY,
  payload: { surveyId, subProjectUser, callback },
});

export const participation = (surveyId, callback) => ({
  type: REPORT_PARTICIPATION,
  payload: { surveyId, callback },
});

export const engagementTrend = (chartType, driverName, surveyId, subProjectUser, startDate, endDate, callback) => ({
  type: REPORT_ENGAGEMENT_TREND,
  payload: { chartType, driverName, surveyId, subProjectUser, startDate, endDate, callback },
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