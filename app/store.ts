import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./slices/user";
import uploadReducer from "./slices/upload";
import songsReduer from "./slices/songs";

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
    songs: songsReduer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
const makeStore = () => store;
export const storeWrapper = createWrapper(makeStore, { debug: false });
