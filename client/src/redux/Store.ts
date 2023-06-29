import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./UserReducer";
import { departmentReducer } from "./DepartmentReducer";
import { shiftReducer } from "./ShiftReducer";
import { employeeReducer } from "./EmployeeReducer";

const userPersistConfig = {
  key: "users",
  storage,
};

const departmentPersistConfig = {
  key: "departments",
  storage,
};

const shiftPersistConfig = {
  key: "shifts",
  storage,
};

const employeePersistConfig = {
  key: "employees",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedDepartmentReducer = persistReducer(
  departmentPersistConfig,
  departmentReducer
);
const persistedShiftReducer = persistReducer(shiftPersistConfig, shiftReducer);
const persistedEmployeeReducer = persistReducer(
  employeePersistConfig,
  employeeReducer
);

const reducers = {
  users: persistedUserReducer,
  departments: persistedDepartmentReducer,
  shifts: persistedShiftReducer,
  employees: persistedEmployeeReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  }),
});

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
