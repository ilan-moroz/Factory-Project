import { useEffect } from "react";
import { getAllEmployeesAction } from "../redux/EmployeeReducer";
import { getAllShiftsAction } from "../redux/ShiftReducer";
import { getAllDepartmentsAction } from "../redux/DepartmentReducer";
import { store } from "../redux/Store";
import {
  fetchGetAllDepartments,
  fetchGetAllEmployees,
  fetchGetAllShifts,
} from "../utils/fetchData";

const useDataFetching = () => {
  //if redux states are empty get all data from database and save in redux
  useEffect(() => {
    if (store.getState().employees.employees.length < 1) {
      fetchEmployees();
    }

    if (store.getState().shifts.allShifts.length < 1) {
      fetchShifts();
    }

    if (store.getState().departments.departments.length < 1) {
      fetchDepartments();
    }
  }, []);

  // fetch the employees
  const fetchEmployees = () => {
    console.log("getting employees from backend....");
    fetchGetAllEmployees()
      .then((response) => {
        store.dispatch(getAllEmployeesAction(response));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // fetch the shifts
  const fetchShifts = () => {
    console.log("getting shifts from backend....");
    fetchGetAllShifts()
      .then((response) => {
        store.dispatch(getAllShiftsAction(response));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // fetch the deparments
  const fetchDepartments = () => {
    console.log("getting departments from backend....");
    fetchGetAllDepartments()
      .then((response) => {
        store.dispatch(getAllDepartmentsAction(response));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
};

export default useDataFetching;
