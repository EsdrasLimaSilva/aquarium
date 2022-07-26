import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../song";
import { RootState } from "../store";

type State = {
  recent: Song[];
  pop: Song[];
  rock: Song[];
  currentSong: {
    songUrl: string;
    author: string;
    cover: string;
    name: string;
    playing: boolean;
    visible: boolean;
  };
};

const initialState: State = {
  recent: [],
  rock: [],
  pop: [],
  currentSong: {
    author: "",
    cover: "",
    name: "",
    songUrl: "",
    playing: false,
    visible: false,
  },
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

    currentSongSet: (
      state,
      action: PayloadAction<{
        author: string;
        cover: string;
        name: string;
        songUrl: string;
      }>
    ) => {
      const { author, cover, name, songUrl } = action.payload;
      state.currentSong.author = author;
      state.currentSong.cover = cover;
      state.currentSong.name = name;
      state.currentSong.songUrl = songUrl;
    },

    currentSongStartedToPlay: (state) => {
      state.currentSong.playing = true;
    },

    currentSongWasPaused: (state) => {
      state.currentSong.playing = false;
    },

    playerSetToVisible: (state) => {
      state.currentSong.visible = true;
    },

    playerSetToHidden: (state) => {
      state.currentSong.visible = false;
    },
  },
});

export const {
  songsSet,
  currentSongSet,
  currentSongStartedToPlay,
  currentSongWasPaused,
  playerSetToHidden,
  playerSetToVisible,
} = songsSlice.actions;
export const selectSongs = (state: RootState) => state.songs;

export default songsSlice.reducer;
