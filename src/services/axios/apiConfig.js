import axios from "axios";
import { apiUrl } from "Constants/defaultValues";
import { getToken } from "./utility";

const getClient = (auth) => {
  const client = axios.create({ baseURL: apiUrl });

  if (auth) {
    client.defaults.headers.common = {
      Authorization: `Token ${getToken().accessToken}`,
    };
  }

  return client;
};

const getLambdaClient = () => {
  const client = axios.create();
  return client;
};

export { getClient, getLambdaClient };
