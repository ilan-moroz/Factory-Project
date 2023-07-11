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

export const fetchLogin = async (data: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/login", data);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAddDepartment = async (
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
    console.log(err);
  }
};

export const fetchGetAllDepartments = async () => {
  try {
    const response = await api.get("/departments/getAllDepartments");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDeleteDepartment = async (id: string) => {
  try {
    const response = await api.delete(`/departments/deleteDepartment/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUpdateDepartment = async (
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
    console.log(err);
  }
};

export const fetchAddEmployee = async (data = {}) => {
  try {
    const response = await api.post("/employees/createEmployee", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchGetAllEmployees = async () => {
  try {
    const response = await api.get("/employees/getAllEmployees");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDeleteEmployee = async (id: string) => {
  try {
    const response = await api.delete(`/employees/deleteEmployee/${id}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchGetAllShifts = async () => {
  try {
    const response = await api.get("/shifts/getAllShifts");
    if (response.status === 200) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAddShift = async (data = {}) => {
  try {
    const response = await api.post("/shifts/createShift", data);
    if (response.status === 201) return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAddShiftToEmployee = async (
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
    console.log(err);
  }
};

export const fetchUpdateEmployee = async (
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
    console.log(err);
  }
};
