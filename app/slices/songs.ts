import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Song = {
  author: string;
  authorId: string;
  cover: string;
  coverAssetId: string;
  genre: string;
  name: string;
  songAssetId: string;
  songUrl: string;
  tags: string;
  _id: string;
};

type State = {
  recent: Song[];
  pop: Song[];
  rock: Song[];
};

const initialState: State = {
  recent: [],
  rock: [],
  pop: [],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    songsSet: (
      state,
      action: PayloadAction<{ pop: Song[]; rock: Song[]; recent: Song[] }>
    ) => {
      state.recent = [...action.payload.recent];
      state.pop = [...action.payload.pop];
      state.rock = [...action.payload.rock];
    },
  },
});

export const { songsSet } = songsSlice.actions;
export const selectSongs = (state: RootState) => state.songs;

export default songsSlice.reducer;
