import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";


//create new meal
export const addMeal = createAsyncThunk("meal/addMeal", async (body) => {

    const resp = await fetch("/meals", {
        method: "POST",
        body: body
    });
    if (resp.ok) {
        return await resp.json();
    } else {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
});

export const clearErrors = createAction("meal/clearErrors");

const mealsSlice = createSlice({
    name: "meals",
    initialState: {
        entities: [],
        loading: false,
        error: null
    },

    reducers: {
        setUserMeals(state, action) {
            state.entities = action.payload;
        }

    },
    extraReducers: {
        [addMeal.pending](state) {
            state.loading = true;
        },
        [addMeal.fulfilled](state, action) {
            state.loading = false;
            state.entities = [...state.entities, action.payload]
        },
        [addMeal.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [clearErrors](state) {
            state.error = null;
        }
    }
});

export const { setUserMeals } = mealsSlice.actions;

export default mealsSlice.reducer;