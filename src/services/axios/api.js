import { getClient, getLambdaClient } from "./apiConfig";

const getCRSFTokenAPI = () => {
  return getClient(false).get("get_csrf/");
};

const resetPasswordAPI = (email, csrf) => {
  return getClient(false).post(
    "password_reset/",
    { email: email },
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );
};

const resetPasswordConfirmAPI = (password, token, csrf) => {
  return getClient(false).post(
    "password_reset/confirm/?token=" + token,
    {
      password: password,
      token: token,
    },
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );
};
const loginAPI = (username, password, csrf) => {
  return getClient(false).post(
    "api-token-auth/",
    {
      username: username,
      password: password,
    },
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );
};

const setPasswordAPI = (email, password, token, csrf) => {
  return getClient(false).post(
    "setpassword/",
    {
      email,
      password,
      token,
    },
    {
      headers: {
        "X-CSRFToken": csrf,
      },
    }
  );
};

export const checkUserPasswordAPI = (email) => {
  return getClient(false).get(`/checkuserpasswordstatus/?format=json&email=${email}`);
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
const getNikelTourAPI = (surveyId) => {
  return getClient(true).get(
    `/nikelmobilepage/?format=json&survey=${surveyId}`
  );
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
  return getClient(true).get(`/driver/?format=json&survey=${surveyId}`);
};

const submitSurveyAPI = (answerData) => {
  return getClient(true).post("/amresponse/", answerData);
};

const teamListAPI = (projectId = 0, surveyId = 0) => {
  let url = "/team/?format=json";
  if (parseInt(projectId, 10) > 0) {
    url += `&project=${projectId}`;
  }
  if (parseInt(surveyId, 10) > 0) {
    url += `&survey=${surveyId}`;
  }
  return getClient(true).get(url);
};

const shgroupListAPI = (surveyId = 1) => {
  let url = "/shgroup/?format=json";
  if (parseInt(surveyId, 10) > 0) {
    url += `&survey=${surveyId}`;
  }
  return getClient(true).get(url);
};

const skipQuestionListAPI = () => {
  return getClient(true).get("skipoption/?format=json");
};

const submitAboutMeAPI = (data) => {
  return getClient(true).post("/projectuser/", data);
};

const userListAPI = (email = "") => {
  if (email !== "") {
    return getClient(true).get(`/users?/?format=json&email=${email}`);
  } else {
    return getClient(true).get("/users/");
  }
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
  var url = `/userbysurvey/?format=json&projectuser=${projectUserId}`;
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

// Update Stakeholder (dlg)
const updateStakeholderCategoryAPI = (projectUserId, projectUser) => {
  return getClient(true).put(
    `/updatestakeholder/${projectUserId}/`,
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
  if (avatarId == 0) {
    return getClient(true).post("/useravatar/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return getClient(true).put("/useravatar/" + avatarId + "/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
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
export const getAmResponseReportAPI = (
  surveyId,
  driverName,
  projectUser,
  controlType = "",
  startDate = "2021-01-01",
  endDate = "2021-12-31"
) => {
  // console.log('startDate', startDate);
  // console.log('endDate', endDate);
  let url = `/amresponsereport/?survey=${surveyId}&driver=${driverName}&projectUser=${projectUser}&stdt=${startDate}&eddt=${endDate}`;
  if (controlType !== "") {
    url += `&controltype=${controlType}`;
  }

  return getClient(true).get(url);
};

export const getAmQuestionCntAPI = (
  surveyId,
  driverName,
  projectId,
  userId
) => {
  return getClient(true).get(
    `/amquestioncnt/?survey=${surveyId}&driver=${driverName}&project=${projectId}&user=${userId}`
  );
};

export const getTotalStakeholderCntAPI = (surveyId) => {
  return getClient(true).get(`/totalshcnt/?survey=${surveyId}`);
};

export const getAoResponseReportAPI = (
  surveyId,
  driverName,
  startDate = "2021-01-01",
  endDate = "2021-12-31"
) => {
  return getClient(true).get(
    `/aoresponsereport/?survey=${surveyId}&driver=${driverName}&stdt=${startDate}&eddt=${endDate}`
  );
};

const getOverallSentimentAPI = (surveyId) => {
  return getClient(true).get(`/overallsentimentreport/?survey=${surveyId}`);
};

const getTopPositiveAndNegativeAPI = (surveyId) => {
  return getClient(true).get(
    `/aoresponsetoppositivenegativereport/?survey=${surveyId}`
  );
};

const getFeedbackSummaryAPI = (surveyId, subProjectUser) => {
  return getClient(true).get(
    `/feedbacksummaryreport/?survey=${surveyId}`
  );
};

export const getOverallTrendsAPI = (surveyId, subProjectUser) => {
  return getClient(true).get(
    `/feedbacksummaryreport/?survey=${surveyId}&trend=1`
  );
};

const getParticipationAPI = (surveyId) => {
  return getClient(true).get(`/userbysurvey/?survey=${surveyId}`);
};

export const getDriverAnalysisCntAPI = (
  surveyId,
  projectUser,
  controlType = "",
  startDate = "2021-01-01",
  endDate = "2021-12-31"
) => {
  let url = `/danalysiscnt/?survey=${surveyId}&stdt=${startDate}&eddt=${endDate}`;
  if (controlType !== "") {
    url += `&controltype=${controlType}`;
  }

  return getClient(true).get(url);
};

export const getDriverAnalysisAPI = (
  surveyId,
  driverName,
  projectUser,
  controlType = "",
  startDate = "2021-01-01",
  endDate = "2021-12-31"
) => {
  let url;
  if (driverName !== 'undefied') {
    url = `/driveranalysis/?survey=${surveyId}&driver=${driverName}&stdt=${startDate}&eddt=${endDate}`;
  } else {
    url = `/driveranalysis/?survey=${surveyId}&stdt=${startDate}&eddt=${endDate}`;
  }
  if (controlType !== "") {
    url += `&controltype=${controlType}`;
  }

  return getClient(true).get(url);
};

const getWordCloudAPI = (surveyId = 0, projectUser = 0) => {
  let url = `/wordcloud/?`;
  if (surveyId > 0) {
    url += `survey=${surveyId}&`;
  }
  if (projectUser > 0) {
    url += `projectUser=${projectUser}`;
  }

  return getClient(true).get(url);
};

export const getPerceptionRealityAPI = (surveyId = 0, projectUser = 0) => {
  return getClient(true).get(
    `/perceptionreality/?format=json&survey=${surveyId}&projectUser=${projectUser}`
  );
};

export const getBubbleChartAPI = (surveyId = 0, projectUser = 0) => {
  return getClient(true).get(
    `/bubblechart/?format=json&survey=${surveyId}&projectUser=${projectUser}`
  );
};

export const getMyMatrixAPI = (survey, projectUser) => {
  return getClient(true).get(
    `/mymatrix?survey=${survey}&projectuser=${projectUser}`
  );
};

export const getProjectMatrixAPI = (survey, projectUser) => {
  return getClient(true).get(
    `/projectmatrix?survey=${survey}&projectuser=${projectUser}`
  );
};

export const getTextValueAPI = (survey, tab, projectUser) => {
  return getClient(true).get(
    `/keytheme?survey=${survey}&tab=${tab}&projectuser=${projectUser}`
  );
};

export const getKeyThemeMenuCntAPI = (survey, projectUser) => {
  return getClient(true).get(
    `/keymenucnt?survey=${survey}&projectuser=${projectUser}`
  );
};

export const getAcknowledgementAPI = (responseId, projectUser) => {
  return getClient(true).get(
    `/acknowledgement?response=${responseId}&projectuser=${projectUser}`
  );
};

export const postAcknowledgementAPI = (data) => {
  return getClient(true).post(`/acknowledgement/`, data);
};

export const updateAcknowledgementAPI = (responseId, data) => {
  return getClient(true).put(`/acknowledgement/${responseId}/`, data);
};

export const voteKeyThemesAPI = (id, data) => {
  if (id === null) {
    return getClient(true).post(`/keythemeupdownvote/`, data);
  } else {
    return getClient(true).put(`/keythemeupdownvote/${id}/`, data);
  }
};

export const advisorAPI = (survey, projectUser) => {
  return getClient(true).get(
    `/advisorinsights?survey=${survey}&projectuser=${projectUser}`
  );
};

export const checkDashboardStatusAPI = (survey, projectUser) => {
  return getClient(true).get(
    `/checkdashboardstatus?survey=${survey}&projectuser=${projectUser}`
  );
};

// const getSentimentReportAPI = (
//   surveyId,
//   startDate = "2021-01-01",
//   endDate = "2021-12-31"
// ) => {
//   return getClient(true).get(
//     `/sentimentreport/?survey=${surveyId}&stdt=${startDate}&eddt=${endDate}`
//   );
// };

/**
 * deprecated...
 */
const projectUserListAPI = () => {
  return getClient(true).get("/projectuser/");
};

const adminProjectListAPI = (userId) => {
  return getClient(true).get(`/adminsurveybyuser/?user=${userId}`);
};

const putAdminProjectListAPI = (surveyId, data) => {
  return getClient(true).put(
    "/adminsurveybyuser/" + surveyId + "/",
    data
  );
}

const adminUserListAPI = (surveyId) => {
  return getClient(true).get(`/adminuserbysurvey/?survey=${surveyId}`);
};

const adminAOQuestionListAPI = (surveyId) => {
  return getClient(true).get(`/adminaoquestion/?survey=${surveyId}`);
};

const adminAMQuestionListAPI = (surveyId) => {
  return getClient(true).get(`/adminamquestion/?survey=${surveyId}`);
};

const postAdminSurveyAddAPI = (data) => {
  console.log('data', data)
  return getClient(true).post("/adminsurveyadd/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const adminUploadImagesAPI = (data) => {
  return getClient.apply(true).post("/adminuploadimages", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

const postAdminSurveyEditAPI = (data) => {
  console.log('data', data)
  return getClient(true).post("/adminsurveyedit/", data);
};

const adminSurveySetupAPI = (surveyId) => {
  return getClient(true).get(`/adminsurveysetup/?survey=${surveyId}`);
}

const adminSurveyConfigurationAPI = (surveyId) => {
  return getClient(true).get(`/adminsurveyconfiguration/?survey=${surveyId}`)
}

const adminBulkInvitationSendAPI = (ids) => {
  console.log('ids', `[${ids}]`)
  return getClient(true).post("/adminbulkinvitationsend", { ids: `[${ids}]` })
}

const adminBulkArchiveUserAPI = (ids) => {
  return getClient(true).post("/adminbulkarchive", { ids: `[${ids}]` })
}

const deleteMoreInfoPageAPI = (id) => {
  return getClient(true).delete(`/admindelmorepage/${id}`)
}

const deleteQuestionAPI = (id, filter) => {
  if(filter === 'About Me') {
    return getClient(true).delete(`/admindelamquestion/${id}`)
  } else {
    return getClient(true).delete(`/admindelaoquestion/${id}`)
  }
}

const getKeyDataFromLambda = () => {
  return getLambdaClient().get(
    "https://gft6ixgrq7.execute-api.us-east-2.amazonaws.com/default/PulseLambda-NeptuneLambdaFunction-QI9VKCO1VXK1"
  );
};

export {
  getCRSFTokenAPI,
  loginAPI,
  resetPasswordAPI,
  resetPasswordConfirmAPI,
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
  getParticipationAPI,
  updateStakeholderCategoryAPI,
  getWordCloudAPI,
  adminUserListAPI,
  adminProjectListAPI,
  postAdminSurveyAddAPI,
  postAdminSurveyEditAPI,
  putAdminProjectListAPI,
  adminAOQuestionListAPI,
  adminAMQuestionListAPI,
  adminSurveySetupAPI,
  adminSurveyConfigurationAPI,
  adminBulkInvitationSendAPI,
  adminBulkArchiveUserAPI,
  deleteMoreInfoPageAPI,
  deleteQuestionAPI,
  adminUploadImagesAPI
};
