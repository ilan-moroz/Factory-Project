import api from "./apiConfig";

export const getAllShifts = async () => {
  try {
    const response = await api.get("/shifts/getAllShifts");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addShift = async (data = {}) => {
  try {
    const response = await api.post("/shifts/createShift", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

export const addShiftToEmployee = async (
  shiftId: string,
  employeeId: string
) => {
  try {
    const response = await api.post("/shifts/addShiftToEmployee", {
      shiftId,
      employeeId,
    });
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
