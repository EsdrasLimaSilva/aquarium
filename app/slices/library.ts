import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../song";
import { RootState } from "../store";

type State = {
  songs: Song[];
};

const initialState: State = {
  songs: [],
};

const librarySlice = createSlice({
  name: "likedSongs",
  initialState,
  reducers: {
    librarySet: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },
    songRemovedFromLibrary: (state, action: PayloadAction<String>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },

    songAddedToLibrary: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
  },
});

export const { librarySet, songRemovedFromLibrary, songAddedToLibrary } =
  librarySlice.actions;
export const selectLibrary = (state: RootState) => state.library;

export default librarySlice.reducer;
