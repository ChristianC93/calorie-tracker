import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { updateTotalCaloriesByDate } from "../Auth/authSlice";

//create new meal
export const addMeal = createAsyncThunk("meal/addMeal", async (body, thunkAPI) => {

    const resp = await fetch("/meals", {
        method: "POST",
        body: body
    });
    if (resp.ok) {
        const mealData = await resp.json();

        const userResp = await fetch("/my-page");
        if (userResp.ok) {
            const updatedUser = await userResp.json();
            const payload = Object.fromEntries(
                Object.entries(updatedUser.total_calories_by_date).map(([k, v]) => [k.toString(), v])
            )
            thunkAPI.dispatch(updateTotalCaloriesByDate(payload))
        }
        return mealData;
    } else {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
});

//delete meal
export const deleteMeal = createAsyncThunk("meal/deleteMeal", async (id, thunkAPI) => {
    const resp = await fetch(`/meals/${id}`, {
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

export const editMeal = createAsyncThunk("meal/editMeal", async (obj) => {
    const resp = await fetch(`/meals/${obj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(obj)
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
        [editMeal.pending](state) {
            state.loading = true;
        },
        [editMeal.fulfilled](state, action) {
            state.loading = false;
            state.entities = state.entities.map((entity) => {
                if (entity.id === action.payload.id) {
                    return action.payload
                } else {
                    return entity;
                }
            });
        },
        [editMeal.rejected](state, action) {
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