import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers";
import { rtkMiddlewares } from "./services";

const persisConfig = {
  key: "root",
  storage,
  whitelist: ["auth","profile"],
};

const persistedReducer = persistReducer(persisConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkMiddlewares),
});
