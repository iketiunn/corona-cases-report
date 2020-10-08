import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: true,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
