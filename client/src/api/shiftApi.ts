import api from "./apiConfig";

// Function to get all shifts
export const getAllShifts = async () => {
  try {
    // Make a GET request to retrieve all shifts
    const response = await api.get("/shifts/getAllShifts");
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to add an shift
export const addShift = async (data = {}) => {
  try {
    // Make a POST request to add a new shift
    const response = await api.post("/shifts/createShift", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to add an shift to employee
export const addShiftToEmployee = async (
  shiftId: string,
  employeeId: string
) => {
  try {
    // Make a POST request to add a new shift
    const response = await api.post("/shifts/addShiftToEmployee", {
      shiftId,
      employeeId,
    });
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
