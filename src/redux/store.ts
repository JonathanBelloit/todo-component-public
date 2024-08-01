import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import projectSlice from "./projectSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    projects: projectSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;