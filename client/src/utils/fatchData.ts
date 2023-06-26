import axios from "axios";

const baseUrl = "http://localhost:4000";

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
