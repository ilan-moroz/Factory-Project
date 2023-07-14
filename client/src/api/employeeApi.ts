import api from "./apiConfig";

// Function to add an employee
export const addEmployee = async (data = {}) => {
  try {
    // Make a POST request to add a new employee
    const response = await api.post("/employees/createEmployee", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to get all employees
export const getAllEmployees = async () => {
  try {
    // Make a GET request to retrieve all employees
    const response = await api.get("/employees/getAllEmployees");
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to delete an employee
export const deleteEmployee = async (id: string) => {
  try {
    // Make a DELETE request to remove an employee using the id
    const response = await api.delete(`/employees/deleteEmployee/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to update an employee
export const updateEmployee = async (employeeId: string, data: {}) => {
  try {
    // Make a PUT request to update an employee
    const response = await api.put(
      `/employees/updateEmployee/${employeeId}`,
      data
    );
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
