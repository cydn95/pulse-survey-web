import { getClient, getLambdaClient } from './apiConfig'

const loginAPI = (username, password) => {
  return getClient(false).post("api-token-auth/", {
    username: username,
    password: password
  })
}

const projectListByUserAPI = (userId) => {
  return getClient(true).get("/projectByUser/?format=json&user=" + userId)
}
const pageListAPI = () => {
  return getClient(true).get("/pages/?format=json")
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

const aoQuestionListAPI = () => {
  return getClient(true).get("/aoquestion/?format=json")
}

const submitAoQuestionAPI = (answerData) => {
  return getClient(true).post("/aoresponse/", answerData)
}

// Get StakeholderList (get users by project id)
const stakeholderListAPI = (projectId) => {
  return getClient(true).get("/userByProject/?format=json&project=" + projectId);
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
  shCategoryListAPI,
  
  addUserAPI,
  addStakeholderAPI,
  
  myMapAPI,
  saveKMapAPI,
  getKeyDataFromLambda,

  aoQuestionListAPI,
  submitAoQuestionAPI,
  
}