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

const projectUserListAPI = () => {
  return getClient(true).get("/projectuser/")
}

const getKeyDataFromLambda = () => {
  return getLambdaClient().get("https://gft6ixgrq7.execute-api.us-east-2.amazonaws.com/default/PulseLambda-NeptuneLambdaFunction-QI9VKCO1VXK1")
}

const aoQuestionListAPI = () => {
  return getClient(true).get("/aoquestion/?format=json")
}

const submitAoQuestionAPI = (answerData) => {
  return getClient(true).post("/aoresponse/", answerData)
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
  
  getKeyDataFromLambda,

  aoQuestionListAPI,
  submitAoQuestionAPI,
  
}