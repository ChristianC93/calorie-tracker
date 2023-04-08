import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
        throw new Error(errorData.errors.join(", "));
    }
});

export const removeExercise = createAsyncThunk("exercise/removeExercise", async (id) => {
    const resp = await fetch(`/exercises/${id}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
    return id;
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
        },
        [removeExercise.pending](state) {
            state.loading = true;
            state.error = null;
        },
        [removeExercise.fulfilled](state, action) {
            state.loading = false;
            state.entities = state.entities.filter((entity) => entity.id !== action.payload);
        },
        [removeExercise.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default exerciseSlice.reducer;