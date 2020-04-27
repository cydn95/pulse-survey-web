import { getClient, getLambdaClient } from './apiConfig'

const loginAPI = (username, password) => {
  return getClient(false).post("api-token-auth/", {
    username: username,
    password: password
  })
}

const setPasswordAPI = (email, password, token) => {
  return getClient(false).post("setpassword/", {
    email,
    password,
    token
  })
}

const projectListByUserAPI = (userId) => {
  return getClient(true).get("/projectByUser/?format=json&user=" + userId)
}

const pageListAPI = (projectUserId) => {
  return getClient(true).get("/pages/?format=json&survey=1&projectuser=" + projectUserId)
}

const optionListAPI = () => {
  return getClient(true).get("/option/?format=json")
}

const driverListAPI = () => {
  return getClient(true).get("/driver/?format=json")
}

const submitSurveyAPI = (answerData) => {
  return getClient(true).post("/amresponse/", answerData)
}

const teamListAPI = () => {
  return getClient(true).get("/team/?format=json")
}

const shgroupListAPI = () => {
  return getClient(true).get("/shgroup/?format=json")
}

const skipQuestionListAPI = () => {
  return getClient(true).get("skipOption/?format=json")
}

const submitAboutMeAPI = (data) => {
  return getClient(true).post("/projectuser/", data)
}

const userListAPI = () => {
  return getClient(true).get("/users/")
}

const myMapAPI = (userId, projectId) => {
  return getClient(true).get("/mymaplayouts/?format=json&user=" + userId + "&project=" + projectId);
}

// const aoQuestionListAPI = (projectUserId) => {
//   return getClient(true).get("/aoquestion/?format=json&projectuser=" + projectUserId)
// }

const aoQuestionListAPI = (projectUserId) => {
  return getClient(true).get("/pages/?format=json&survey=1&projectuser=" + projectUserId)
}

const submitAoQuestionAPI = (answerData) => {
  return getClient(true).post("/aoresponse/", answerData)
}

// Get StakeholderList (get users by project id)
const stakeholderListAPI = (projectId) => {
  return getClient(true).get("/userByProject/?format=json&project=" + projectId);
}
const getProjectUserAPI = (userId, projectId) => {
  return getClient(true).get("/userByProject/?format=json&user=" + userId + "&project=" + projectId);
}

// Get ShCategory
const shCategoryListAPI = () => {
  return getClient(true).get("/shcategory/?format=json");
}

// Save Map Data
const saveKMapAPI = (mapData) => {
  return getClient(true).post("/mymaplayouts/", mapData);
}

// Add User
const addUserAPI = (user) => {
  return getClient(true).post("/stakeholder/", user);
}

// Add Stakeholder (ProjectUser)
const addStakeholderAPI = (projectUser) => {
  return getClient(true).post("/projectuser/", projectUser);
}

const updateStakeholderAPI = (projectUserId, projectUser) => {
  return getClient(true).put("/projectuser/" + projectUserId + "/", projectUser);
};

// Add NewTopic To About Me & Other Question 
const addNewTopicAboutMeAPI = (topicName, topicComment, questionId, projectUserId) => {
  return getClient(true).post("/amresponsetopic/", {
    'topicName': topicName,
    'topicComment': topicComment,
    amQuestion: questionId,
    responseUser: projectUserId
  });
}

const addNewTopicAboutOtherAPI = (topicName, topicComment, questionId, projectUserId) => {
  return getClient(true).post("/aoresponsetopic/", {
    'topicName': topicName,
    'topicComment': topicComment,
    aoQuestion: questionId,
    responseUser: projectUserId
  });
}

/* Account */
const changePasswordAPI = (token, email, password) => {
  return getClient(true).post("/changepassword/", {
    token,
    email,
    password
  });
}

const getProfileAPI = (userId) => {
  return getClient(true).get("/users/" + userId + "/");
}

const changeProfileAPI = (token, firstName, lastName, email, team, organization) => {
  return getClient(true).post("/userprofile/", {
    token,
    first_name: firstName,
    last_name: lastName,
    email,
    team,
    organization
  });
}

const changeAvatarAPI = (avatarId, data) => {
  return getClient(true).put("/useravatar/" + avatarId + "/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

/**
 * deprecated...
 */
const projectUserListAPI = () => {
  return getClient(true).get("/projectuser/")
}

const getKeyDataFromLambda = () => {
  return getLambdaClient().get("https://gft6ixgrq7.execute-api.us-east-2.amazonaws.com/default/PulseLambda-NeptuneLambdaFunction-QI9VKCO1VXK1")
}

export {
  loginAPI,
  setPasswordAPI,
  
  projectListByUserAPI,
  
  pageListAPI,
  submitAboutMeAPI,
  submitSurveyAPI,

  teamListAPI,
  shgroupListAPI,
  optionListAPI,
  driverListAPI,
  userListAPI,
  projectUserListAPI,
  skipQuestionListAPI,
  stakeholderListAPI,
  getProjectUserAPI,
  shCategoryListAPI,
  
  addUserAPI,
  addStakeholderAPI,
  updateStakeholderAPI,
  
  myMapAPI,
  saveKMapAPI,
  getKeyDataFromLambda,

  aoQuestionListAPI,
  submitAoQuestionAPI,
  
  addNewTopicAboutMeAPI,
  addNewTopicAboutOtherAPI,

  changePasswordAPI,
  getProfileAPI,
  changeProfileAPI,
  changeAvatarAPI
}