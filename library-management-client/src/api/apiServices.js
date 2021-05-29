import "axios";
import axios from "axios";

const defaultURL = "https://localhost:5001";

const getToken = () => {
  let token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

const callApi = (endpoint, method = "GET", body) => {
  const url = defaultURL + "/" + endpoint;

  return axios({
    method: method,
    url,
    data: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getToken(),
    },
  });
};

export const POST = (endpoint, data) => {
  return callApi(endpoint, "POST", data);
};

export const PUT = (endpoint, id, data) => {
  console.log(endpoint + "/" + id);
  return callApi(endpoint + "/" + id, "PUT", data);
};

export const GET = (endpoint) => {
  return callApi(endpoint, "GET");
};

export const DELETE = (endpoint, id) => {
  return callApi(endpoint + "/" + id, "DELETE");
};

export const GET_BY_ID = (endpoint, id) => {
  return callApi(endpoint + "/" + id, "GET");
};
