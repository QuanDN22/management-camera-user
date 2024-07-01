import axios from "axios";

const callAPI = axios.create({
  baseURL: "http://localhost:8080/v1/api",
});

// Add a request interceptor
callAPI.interceptors.request.use(
  (config) => {
    // Check if the access token is present
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default callAPI;
