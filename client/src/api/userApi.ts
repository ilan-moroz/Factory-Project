import api from "./apiConfig";

// function to login the user
export const login = async (data: { userName: string; password: string }) => {
  try {
    // Make a POST request to the '/auth/login' endpoint, passing the user's credentials
    const response = await api.post("/user/login", data);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
