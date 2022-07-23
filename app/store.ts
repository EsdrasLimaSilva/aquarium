import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./slices/user";
import uploadReducer from "./slices/upload";

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
const makeStore = () => store;
export const storeWrapper = createWrapper(makeStore, { debug: false });
