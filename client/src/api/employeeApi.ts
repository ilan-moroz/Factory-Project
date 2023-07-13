import api from "./apiConfig";

export const addEmployee = async (data = {}) => {
  try {
    const response = await api.post("/employees/createEmployee", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await api.get("/employees/getAllEmployees");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const response = await api.delete(`/employees/deleteEmployee/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateEmployee = async (
  employeeId: string,
  firstName: string,
  lastName: string,
  startWorkYear: number,
  departmentId: string,
  shiftIds: [string]
) => {
  try {
    const response = await api.put(`/employees/updateEmployee/${employeeId}`, {
      firstName: firstName,
      lastName: lastName,
      startWorkYear: startWorkYear,
      departmentId: departmentId,
      shiftIds: shiftIds,
    });
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
