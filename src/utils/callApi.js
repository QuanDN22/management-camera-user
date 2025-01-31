import axios from "axios";

const callAPI = axios.create({
  baseURL: "http://192.168.1.12:8080/v1/api",
});

// Add a request interceptor
callAPI.interceptors.request.use(
  (config) => {
    // Check if the access token is present
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default callAPI;
