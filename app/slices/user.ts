import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = {
  authenticated: boolean;
  authenticating: boolean;
  data: {
    username: string;
    image: string;
    id: string;
  };
};

const initialState: State = {
  authenticated: false,
  authenticating: false,
  data: {
    username: "",
    image: "",
    id: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthenticated: (
      state,
      action: PayloadAction<{ username: string; image: string; id: string }>
    ) => {
      const { username, image, id } = action.payload;
      state.authenticated = true;
      state.data.username = username;
      state.data.image = image;
      state.data.id = id;
    },

    userCleared: (state) => {
      state.authenticated = false;
      state.data.username = "";
      state.data.image = "";
      state.data.id = "";
    },

    fetchingUserDataAttemptStarted: (state) => {
      state.authenticating = true;
    },

    fetchingUserDataAttemptFinished: (state) => {
      state.authenticating = false;
    },
  },
});

export const {
  userAuthenticated,
  userCleared,
  fetchingUserDataAttemptFinished,
  fetchingUserDataAttemptStarted,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
