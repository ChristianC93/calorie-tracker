import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateTotalCaloriesByDate } from "../Auth/authSlice";


export const addExercise = createAsyncThunk("exercise/addExercise", async (body, thunkAPI) => {
   
    const resp = await fetch("/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (resp.ok) {
        const exerciseData = await resp.json();

        const userResp = await fetch("/my-page");
        if (userResp.ok) {
            const updatedUser = await userResp.json();
            const payload = Object.fromEntries(
                Object.entries(updatedUser.total_calories_by_date).map(([k, v]) => [k.toString(), v])
            )
            thunkAPI.dispatch(updateTotalCaloriesByDate(payload))
        }
        return exerciseData;
    } else {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
});

export const removeExercise = createAsyncThunk("exercise/removeExercise", async (id, thunkAPI) => {
    const resp = await fetch(`/exercises/${id}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
    const userResp = await fetch("/my-page");
        if (userResp.ok) {
            const updatedUser = await userResp.json();
            const payload = Object.fromEntries(
                Object.entries(updatedUser.total_calories_by_date).map(([k, v]) => [k.toString(), v])
            )
            thunkAPI.dispatch(updateTotalCaloriesByDate(payload))
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