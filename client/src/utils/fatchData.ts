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

export const fetchLoginData = async (data: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAddDepartment = async (department: string) => {
  try {
    const response = await api.post(`/departments/addDepartment`, department);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
