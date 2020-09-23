import { getClient, getLambdaClient } from "./apiConfig";

const loginAPI = (username, password) => {
  return getClient(false).post("api-token-auth/", {
    username: username,
    password: password,
  });
};

const setPasswordAPI = (email, password, token) => {
  return getClient(false).post("setpassword/", {
    email,
    password,
    token,
  });
};

/* Settings -> Project */
const projectListByUserAPI = (userId) => {
  return getClient(true).get("/projectbyuser/?format=json&user=" + userId);
};

const surveyListByProjectAPI = (projectId = 0) => {
  if (projectId === 0) {
    return getClient(true).get("/surveybyproject/?format=json");
  } else {
    return getClient(true).get(
      "/surveybyproject/?format=json&project=" + projectId
    );
  }
};

const getSurveyUserAPI = (userId, surveyId) => {
  return getClient(true).get(
    "/userbysurvey/?format=json&user=" + userId + "&survey=" + surveyId
  );
};

const getProjectAPI = (projectId = 0) => {
  if (projectId === 0) {
    return getClient(true).get("/project/?format=json");
  } else {
    return getClient(true).get(`/project/${projectId}/?format=json`);
  }
};

/* Tour */
const getNikelTourAPI = () => {
  return getClient(true).get("/nikelmobilepage/?format=json");
};

const getTooltipGuideAPI = () => {
  return getClient(true).get("/tooltipguide/?format=json");
};

const getConfigPageAPI = (surveyId = 0) => {
  if (surveyId === 0) {
    return getClient(true).get("/configpage/?format=json");
  } else {
    return getClient(true).get(`/configpage/?format=json&survey=${surveyId}`);
  }
};

/* Get Survey Question List */
const pageListAPI = (surveyId, surveyUserId) => {
  return getClient(true).get(
    `/pages/?format=json&survey=${surveyId}&projectuser=${surveyUserId}`
  );
};

const optionListAPI = () => {
  return getClient(true).get("/option/?format=json");
};

const driverListAPI = (surveyId = 1) => {
  return getClient(true).get(`/driver/?format=json&survey_id=${surveyId}`);
};

const submitSurveyAPI = (answerData) => {
  return getClient(true).post("/amresponse/", answerData);
};

const teamListAPI = (projectId) => {
  if (parseInt(projectId, 10) === 0) {
    return getClient(true).get("/team/?format=json");
  } else {
    return getClient(true).get("/team/?format=json&project=" + projectId);
  }
};

const shgroupListAPI = (surveyId = 1) => {
  if (!surveyId || surveyId === undefined) {
    return getClient(true).get(`/shgroup/?format=json`);
  } else {
    return getClient(true).get(`/shgroup/?format=json&survey=${surveyId}`);
  }
};

const skipQuestionListAPI = () => {
  return getClient(true).get("skipoption/?format=json");
};

const submitAboutMeAPI = (data) => {
  return getClient(true).post("/projectuser/", data);
};

const userListAPI = () => {
  return getClient(true).get("/users/");
};

const myMapAPI = (projectUserId, userId = 0) => {
  var url = `/mymaplayouts/?format=json&myProjectUser=${projectUserId}`;
  if (userId > 0) {
    url += `&user=${userId}`;
  }

  return getClient(true).get(url);
};

const projectMapAPI = (projectUserId, userId = 0) => {
  var url = `/projectmaplayouts/?format=json&myProjectUser=${projectUserId}`;
  if (userId > 0) {
    url += `&user=${userId}`;
  }
  return getClient(true).get(url);
};

// const aoQuestionListAPI = (projectUserId) => {
//   return getClient(true).get("/aoquestion/?format=json&projectuser=" + projectUserId)
// }

const aoQuestionListAPI = (projectUserId, surveyId = 1) => {
  return getClient(true).get(
    `/pages/?format=json&survey=${surveyId}&projectuser=${projectUserId}`
  );
};

const submitAoQuestionAPI = (answerData) => {
  return getClient(true).post("/aoresponse/", answerData);
};

// Get StakeholderList (get users by project id)
const stakeholderListAPI = (projectUserId, surveyId = 0) => {
  var url = `/userbysurvey/?format=json&myProjectUser=${projectUserId}`;
  if (surveyId > 0) {
    url += `&survey=${surveyId}`;
  }

  return getClient(true).get(url);
};

// Get ShCategory
const shCategoryListAPI = (surveyId, mapType) => {
  let url = `/shcategory/?format=json&survey=${surveyId}`;
  if (mapType !== 0) {
    url += `&mapType=${mapType}`;
  }
  return getClient(true).get(url);
};

// Save Map Data
const saveKMapAPI = (mapData) => {
  return getClient(true).post("/mymaplayouts/", mapData);
};

const saveProjectMapAPI = (mapData) => {
  return getClient(true).post("/projectmaplayouts/", mapData);
};

// Add User
const addUserAPI = (user) => {
  return getClient(true).post("/stakeholder/", user);
};

// Add Stakeholder (ProjectUser)
const addStakeholderAPI = (projectUser) => {
  return getClient(true).post("/projectuser/", projectUser);
};

const updateStakeholderAPI = (projectUserId, projectUser) => {
  return getClient(true).put(
    "/projectuser/" + projectUserId + "/",
    projectUser
  );
};

// Add NewTopic To About Me & Other Question
const addNewTopicAboutMeAPI = (
  topicName,
  topicComment,
  questionId,
  projectUserId
) => {
  return getClient(true).post("/amresponsetopic/", {
    topicName: topicName,
    topicComment: topicComment,
    amQuestion: questionId,
    responseUser: projectUserId,
  });
};

const addNewTopicAboutOtherAPI = (
  topicName,
  topicComment,
  questionId,
  projectUserId
) => {
  return getClient(true).post("/aoresponsetopic/", {
    topicName: topicName,
    topicComment: topicComment,
    aoQuestion: questionId,
    responseUser: projectUserId,
  });
};

const updateTopicAboutMeAPI = (
  topicId,
  topicName,
  topicComment,
  questionId,
  projectUserId
) => {
  return getClient(true).put("/amresponsetopic/" + topicId + "/", {
    id: topicId,
    topicName: topicName,
    topicComment: topicComment,
    amQuestion: questionId,
    responseUser: projectUserId,
  });
};

const deleteTopicAboutMeAPI = (topicId) => {
  return getClient(true).delete(`/amresponsetopic/${topicId}/`);
};

/* Account */
const changePasswordAPI = (token, email, password) => {
  return getClient(true).post("/changepassword/", {
    token,
    email,
    password,
  });
};

const getProfileAPI = (userId) => {
  return getClient(true).get("/users/" + userId + "/");
};

const changeProfileAPI = (
  token,
  firstName,
  lastName,
  email,
  team,
  organization
) => {
  return getClient(true).post("/userprofile/", {
    token,
    first_name: firstName,
    last_name: lastName,
    email,
    team,
    organization,
  });
};

const changeAvatarAPI = (avatarId, data) => {
  return getClient(true).put("/useravatar/" + avatarId + "/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const updateUserGuideAPI = (token, guide) => {
  return getClient(true).post("/userguidemode", {
    token: token,
    guidemode: guide,
  });
};

/**
 * Report
 */
const getOverallSentimentAPI = (surveyId) => {
  return getClient(true).get(`/overallsentimentreport/?survey=${surveyId}`);
};

const getTopPositiveAndNegativeAPI = (surveyId) => {
  return getClient(true).get(`/aoresponsereport/?survey=${surveyId}`);
};

const getFeedbackSummaryAPI = (surveyId) => {
  return getClient(true).get(`/feedbacksummaryreport/?survey=${surveyId}`);
};


/**
 * deprecated...
 */
const projectUserListAPI = () => {
  return getClient(true).get("/projectuser/");
};

const getKeyDataFromLambda = () => {
  return getLambdaClient().get(
    "https://gft6ixgrq7.execute-api.us-east-2.amazonaws.com/default/PulseLambda-NeptuneLambdaFunction-QI9VKCO1VXK1"
  );
};

export {
  loginAPI,
  setPasswordAPI,
  projectListByUserAPI,
  surveyListByProjectAPI,
  getSurveyUserAPI,
  getNikelTourAPI,
  getTooltipGuideAPI,
  getConfigPageAPI,
  pageListAPI,
  submitAboutMeAPI,
  submitSurveyAPI,
  teamListAPI,
  shgroupListAPI,
  optionListAPI,
  driverListAPI,
  userListAPI,
  projectUserListAPI,
  getProjectAPI,
  skipQuestionListAPI,
  stakeholderListAPI,
  shCategoryListAPI,
  addUserAPI,
  deleteTopicAboutMeAPI,
  updateStakeholderAPI,
  myMapAPI,
  saveKMapAPI,
  projectMapAPI,
  saveProjectMapAPI,
  getKeyDataFromLambda,
  aoQuestionListAPI,
  submitAoQuestionAPI,
  addNewTopicAboutMeAPI,
  updateTopicAboutMeAPI,
  addStakeholderAPI,
  addNewTopicAboutOtherAPI,
  changePasswordAPI,
  getProfileAPI,
  changeProfileAPI,
  changeAvatarAPI,
  updateUserGuideAPI,
  getOverallSentimentAPI,
  getTopPositiveAndNegativeAPI,
  getFeedbackSummaryAPI,
};
