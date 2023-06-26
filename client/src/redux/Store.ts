import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./UserReducer";

const userPersistConfig = {
  key: "users",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const reducers = {
  users: persistedUserReducer,
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
