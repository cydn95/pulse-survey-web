import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
  REPORT_PARTICIPATION,
  REPORT_ENGAGEMENT_TREND,
  REPORT_WORDCLOUD
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

export const engagementTrend = (surveyId, startDate, endDate, callback) => ({
  type: REPORT_ENGAGEMENT_TREND,
  payload: { surveyId, startDate, endDate, callback },
});

export const wordcloud = (surveyId, projectUserId, callback) => ({
  type: REPORT_WORDCLOUD,
  payload: { surveyId, projectUserId, callback },
});
