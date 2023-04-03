import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const exerciseSlice = createSlice({
    name: "exercise",
    initialState: {
        entities: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: {

    }
});

export default exerciseSlice.reducer;