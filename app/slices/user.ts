import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = {
  authenticated: boolean;
  data: {
    username: string;
    image: string;
    id: string;
  };
};

const initialState: State = {
  authenticated: false,
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
  },
});

export const { userAuthenticated } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
