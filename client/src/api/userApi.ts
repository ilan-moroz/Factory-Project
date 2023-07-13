import api from "./apiConfig";

export const login = async (data: { userName: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
