import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../song";
import { RootState } from "../store";

type State = {
  searching: boolean;
  songs: Song[];
};

const initialState: State = {
  searching: false,
  songs: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStarted: (state) => {
      state.searching = true;
    },
    searchedSongsSet: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    searchFinished: (state) => {
      state.searching = false;
    },
  },
});

export const { searchStarted, searchFinished, searchedSongsSet } =
  searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
