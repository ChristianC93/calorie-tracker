import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMeal } from "../meals/mealsSlice";

export const addExercise = createAsyncThunk("exercise/addExercise", async (body) => {
    const resp = await fetch("/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (resp.ok) {
        return await resp.json();
    } else {
        const errorData = await resp.json();
        console.log(errorData)
        throw new Error(errorData.errors.join(", "));
    }
});

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
        [addMeal.pending](state) {
            state.loading = true;
            state.error = null;
        },
        [addMeal.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [addMeal.fulfilled](state, action) {
            state.loading = false;
            state.error = null;
            state.entities = [...state.entities, action.payload]
        }
    }
});

export default exerciseSlice.reducer;