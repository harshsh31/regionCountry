import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import country from "./countrySlice";
import regions from "./regionsSlice";

const reducer = {
  regions,
  country,
};
const preloadedState = {};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export default store;
