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

//delete meal
export const deleteMeal = createAsyncThunk("meal/deleteMeal", async (id) => {
    const resp = await fetch(`/meals/${id}`, {
        method: "DELETE"
    });
    if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
    return id;
});

export const editMeal = createAsyncThunk("meal/editMeal", async (meal) => {
    const resp = await fetch(`/meals/${meal.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(meal)
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
        [deleteMeal.pending](state) {
            state.loading = true;
        },
        [deleteMeal.fulfilled](state, action) {
            state.loading = false;
            state.entities = state.entities.filter((entity) => entity !== action.payload)
        },
        [clearErrors](state) {
            state.error = null;
        }
    }
});

export const { setUserMeals } = mealsSlice.actions;

export default mealsSlice.reducer;