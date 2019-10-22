import axios from "axios"
import { apiUrl } from 'Constants/defaultValues'

const client = axios.create({ baseURL: apiUrl})

client.defaults.headers.common = {
}

export { client }
