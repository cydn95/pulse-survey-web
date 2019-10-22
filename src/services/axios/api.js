import { client } from './apiConfig'

const pageListAPI = (rd) => {
  // return client.get("pages/?format=json", {})
  return client.get("/pages/?format=json")
}

export {
  pageListAPI, 
}