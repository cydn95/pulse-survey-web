import { getClient } from './apiConfig'

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
  return getClient(false).post("/amresponse/", answerData)
}

export {
  loginAPI,
  pageListAPI,
  submitSurveyAPI
}