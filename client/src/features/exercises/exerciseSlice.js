import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const addExercise = createAsyncThunk("exercise/addExercise", async (body, { getState }) => {
    const { auth } = getState();
    const user_id = auth.user.id;
    body.user_id = user_id;

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
        [addExercise.pending](state) {
            state.loading = true;
            state.error = null;
        },
        [addExercise.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [addExercise.fulfilled](state, action) {
            state.loading = false;
            state.error = null;
            state.entities = [...state.entities, action.payload]
        }
    }
});

export default exerciseSlice.reducer;