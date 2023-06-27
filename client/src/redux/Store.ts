import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./UserReducer";
import { departmentReducer } from "./DepartmentReducer";

const userPersistConfig = {
  key: "users",
  storage,
};

const departmentPersistConfig = {
  key: "departments",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedDepartmentReducer = persistReducer(
  departmentPersistConfig,
  departmentReducer
);

const reducers = {
  users: persistedUserReducer,
  departments: persistedDepartmentReducer,
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
