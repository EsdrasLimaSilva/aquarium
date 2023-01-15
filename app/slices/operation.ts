import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = {
    current: string;
};

const initialState = {
    current: "homeSongs",
};

const operationSlice = createSlice({
    name: "operaion",
    initialState,
    reducers: {
        changedToHomeSongs: (state) => {
            state.current = "homeSongs";
        },
        changedToMySongs: (state) => {
            state.current = "mySongs";
        },
        changedToLibrary: (state) => {
            state.current = "library";
        },
        changedToSearchedSongs: (state) => {
            state.current = "searchedSongs";
        },
    },
});

export const {
    changedToHomeSongs,
    changedToMySongs,
    changedToLibrary,
    changedToSearchedSongs,
} = operationSlice.actions;
export const selectOperation = (state: RootState) => state.operation.current;

export default operationSlice.reducer;
