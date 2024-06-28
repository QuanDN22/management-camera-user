import { configureStore } from "@reduxjs/toolkit";
import authsReducer from "../slice/authsSlice";

const store = configureStore({ reducer: { auths: authsReducer } });

export default store;
