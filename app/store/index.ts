import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  devTools: true,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
