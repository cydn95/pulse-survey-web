import { getClient, getLambdaClient } from './apiConfig'

const loginAPI = (username, password) => {
  return getClient(false).post("api-token-auth/", {
    username: username,
    password: password
  })
}

const pageListAPI = (rd) => {
  return getClient(true).get("/pages/?format=json")
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

export {
  loginAPI,
  pageListAPI,
  submitSurveyAPI,
  teamListAPI,
  shgroupListAPI,
  submitAboutMeAPI,
  userListAPI,
  projectUserListAPI,
  getKeyDataFromLambda
}