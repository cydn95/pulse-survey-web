import { getClient } from './apiConfig'

const loginAPI = (username, password) => {
  return getClient(false).post("/rest-auth/login/", {
    username: username,
    password: password
  })
}

const pageListAPI = (rd) => {
  return getClient(true).get("/pages/?format=json")
}

export {
  loginAPI,
  pageListAPI, 
}