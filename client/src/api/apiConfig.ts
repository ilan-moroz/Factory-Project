import axios from "axios";

const baseUrl = "http://localhost:4000";

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: baseUrl,
});

// Use axios interceptors to alter requests before they are sent
api.interceptors.request.use(
  (config) => {
    // Retrieve the persisted users from local storage
    const persistedUsers = localStorage.getItem("persist:users");
    let token;

    if (persistedUsers) {
      const users = JSON.parse(persistedUsers);
      if (users.token) {
        token = JSON.parse(users.token);
      }
    }
    if (token) {
      // Add the token to the request headers
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
