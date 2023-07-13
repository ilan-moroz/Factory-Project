import axios from "axios";

const baseUrl = "http://localhost:4000";
const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (config) => {
    const persistedUsers = localStorage.getItem("persist:users");
    let token;
    if (persistedUsers) {
      const users = JSON.parse(persistedUsers);
      if (users.token) {
        // Remember to parse the token if it's still a JSON string
        token = JSON.parse(users.token);
      }
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
