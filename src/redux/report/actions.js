import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
  REPORT_PARTICIPATION,
} from "Constants/actionTypes";

export const overallSentiment = (surveyId, callback) => ({
  type: REPORT_OVERALL_SENTIMENT,
  payload: { surveyId, callback },
});

export const topPositiveNegative = (surveyId, callback) => ({
  type: REPORT_TOP_POSITIVE_NEGATIVE,
  payload: { surveyId, callback },
});

export const feedbackSummary = (surveyId, callback) => ({
  type: REPORT_FEEDBACK_SUMMARY,
  payload: { surveyId, callback },
});

export const participation = (surveyId, callback) => ({
  type: REPORT_PARTICIPATION,
  payload: { surveyId, callback },
});
