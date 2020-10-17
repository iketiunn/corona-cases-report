import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import globalReducer from "./global";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
  devTools: true,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
