import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "./slices/user";
import uploadReducer from "./slices/upload";
import songsReduer from "./slices/songs";
import operationReducer from "./slices/operation";
import searchReducer from "./slices/search";
import mySongsReducer from "./slices/mySongs";
import libraryReducer from "./slices/library";

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
    songs: songsReduer,
    operation: operationReducer,
    search: searchReducer,
    mySongs: mySongsReducer,
    library: libraryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
const makeStore = () => store;
export const storeWrapper = createWrapper(makeStore, { debug: false });
