import api from "./apiConfig";

export const addDepartment = async (
  departmentName: string,
  manager: string
) => {
  try {
    const response = await api.post("/departments/addDepartment", {
      name: departmentName,
      manager: manager,
    });
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await api.get("/departments/getAllDepartments");
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    const response = await api.delete(`/departments/deleteDepartment/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateDepartment = async (
  departmentId: string,
  departmentName: string,
  manager: string
) => {
  try {
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
