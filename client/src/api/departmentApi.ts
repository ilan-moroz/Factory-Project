import api from "./apiConfig";

// Function to add a department
export const addDepartment = async (
  departmentName: string,
  manager: string
) => {
  try {
    // Make a POST request to add a new department
    const response = await api.post("/departments/addDepartment", {
      name: departmentName,
      manager: manager,
    });
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to get all departments
export const getAllDepartments = async () => {
  try {
    // Make a GET request to retrieve all departments
    const response = await api.get("/departments/getAllDepartments");
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to delete a department
export const deleteDepartment = async (id: string) => {
  try {
    // Make a DELETE request to remove a department by id
    const response = await api.delete(`/departments/deleteDepartment/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// Function to update a department
export const updateDepartment = async (
  departmentId: string,
  departmentName: string,
  manager: string
) => {
  try {
    // Make a PUT request to update a department
    const response = await api.put(
      `/departments/updateDepartment/${departmentId}`,
      {
        name: departmentName,
        manager: manager,
      }
    );
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
