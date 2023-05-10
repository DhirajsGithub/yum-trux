import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store-slice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
  },
});
