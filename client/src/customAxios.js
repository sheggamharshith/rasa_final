import axios from "axios";

import { signOutWithoutDispatcher } from "./context/userContext";

var url = process.env.REACT_BACKEND_BASE_API;
axios.defaults.baseURL = url ? url : "https://8eea-2600-4041-44b3-2f00-ebb4-9186-d23c-bef0.ngrok.io:8080/v1/";

// this will add the defualt token 
const token = localStorage.getItem("access_token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
}
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Do something with response error
    if (error.response.status === 401) {
      signOutWithoutDispatcher();
    }

    return Promise.reject(error);
  }
);

export default axios;