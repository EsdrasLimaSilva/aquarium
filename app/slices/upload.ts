import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = {
  actions: {
    processingImage: boolean;
    imageProcessed: boolean;
    imageAsset: { url: string; id: string };
    processingSong: boolean;
    songProcessed: boolean;
    songAsset: { url: string; id: string; name: string };
    uploadingSong: boolean;
    songWasUploaded: boolean;
    uploadContainerVisible: boolean;
  };
};

const initialState: State = {
  actions: {
    processingImage: false,
    imageProcessed: false,
    imageAsset: { url: "", id: "" },
    processingSong: false,
    songProcessed: false,
    songAsset: { url: "", id: "", name: "" },
    uploadingSong: false,
    songWasUploaded: false,
    uploadContainerVisible: false,
  },
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    processingImageStarted: (state) => {
      state.actions.processingImage = true;
    },
    processingImageFinished: (state) => {
      state.actions.processingImage = false;
    },
    imageWasProcessed: (state) => {
      state.actions.imageProcessed = true;
    },
    imageWasNotProcessed: (state) => {
      state.actions.imageProcessed = false;
    },
    imageAssetSet: (
      state,
      action: PayloadAction<{ url: string; id: string }>
    ) => {
      state.actions.imageAsset.id = action.payload.id;
      state.actions.imageAsset.url = action.payload.url;
      state.actions.imageProcessed = true;
    },
    imageAssetRemoved: (state) => {
      state.actions.imageAsset.id = "";
      state.actions.imageAsset.url = "";
    },
    processingSongStarted: (state) => {
      state.actions.processingSong = true;
    },
    processingSongFinished: (state) => {
      state.actions.processingSong = false;
    },
    songWasProcessed: (state) => {
      state.actions.songProcessed = true;
    },
    songWasNotProcessed: (state) => {
      state.actions.songProcessed = false;
    },
    songAssetSet: (
      state,
      action: PayloadAction<{ url: string; id: string; name: string }>
    ) => {
      state.actions.songAsset.id = action.payload.id;
      state.actions.songAsset.url = action.payload.url;
      state.actions.songAsset.name = action.payload.name;
      state.actions.songProcessed = true;
    },
    songAssetRemoved: (state) => {
      state.actions.songAsset.id = "";
      state.actions.songAsset.url = "";
      state.actions.songAsset.name = "";
    },
    songUploadStarted: (state) => {
      state.actions.uploadingSong = true;
    },
    songUploadFinished: (state) => {
      state.actions.uploadingSong = false;
    },
    songWasUploaded: (state) => {
      state.actions.songWasUploaded = true;
    },
    songWasNotUploaded: (state) => {
      state.actions.songWasUploaded = false;
    },
    uploadContainerSetToVisible: (state) => {
      state.actions.uploadContainerVisible = true;
    },
    uploadContainerSetToHidden: (state) => {
      state.actions.uploadContainerVisible = false;
    },
  },
});

export const {
  processingImageStarted,
  processingImageFinished,
  processingSongStarted,
  processingSongFinished,
  imageAssetSet,
  imageAssetRemoved,
  songAssetSet,
  songAssetRemoved,
  imageWasProcessed,
  imageWasNotProcessed,
  songWasProcessed,
  songWasNotProcessed,
  songUploadStarted,
  songUploadFinished,
  songWasUploaded,
  songWasNotUploaded,
  uploadContainerSetToVisible,
  uploadContainerSetToHidden,
} = uploadSlice.actions;

export const selectUpload = (state: RootState) => state.upload.actions;

export default uploadSlice.reducer;
