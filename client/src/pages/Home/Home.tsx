import { useEffect } from "react";
import { getAllEmployeesAction } from "../../redux/EmployeeReducer";
import { store } from "../../redux/Store";
import {
  fetchGetAllDepartments,
  fetchGetAllEmployees,
  fetchGetAllShifts,
} from "../../utils/fetchData";
import "./Home.css";
import { getAllShiftsAction } from "../../redux/ShiftReducer";
import { getAllDepartmentsAction } from "../../redux/DepartmentReducer";

const Home = () => {
  // get data from database and save in redux
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

  //if employees is empty get all departments from database and save in redux
  useEffect(() => {
    if (store.getState().employees.employees.length < 1) {
      fetchEmployees();
    }
  }, []);

  // get data from database and save in redux
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

  //if shifts is empty get all departments from database and save in redux
  useEffect(() => {
    if (store.getState().shifts.allShifts.length < 1) {
      fetchShifts();
    }
  }, []);

  // get data from database and save in redux
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

  //if departments is empty get all departments from database and save in redux
  useEffect(() => {
    if (store.getState().departments.departments.length < 1) {
      fetchDepartments();
    }
  }, []);

  return <div className="home"></div>;
};

export default Home;
