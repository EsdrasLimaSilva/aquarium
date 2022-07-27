import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../song";
import { RootState } from "../store";

type State = {
  songs: Song[];
  fetching: boolean;
};

const initialState: State = {
  songs: [],
  fetching: false,
};

const mySongsSlice = createSlice({
  name: "mySongs",
  initialState,
  reducers: {
    mySongsSet: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    fetchingMySongsStarted: (state) => {
      state.fetching = true;
    },

    fetchingMySongsFinished: (state) => {
      state.fetching = false;
    },

    songDeleted: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },

    songPushed: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
  },
});

export const {
  mySongsSet,
  fetchingMySongsStarted,
  fetchingMySongsFinished,
  songDeleted,
  songPushed,
} = mySongsSlice.actions;
export const selectMySongs = (state: RootState) => state.mySongs;

export default mySongsSlice.reducer;
