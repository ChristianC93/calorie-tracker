import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create new user frontend
export const signup =  createAsyncThunk("user/signup", async (body) => {
    const resp = await fetch("/signup", {
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

//login user frontend
export const login = createAsyncThunk("user/login", async (body) => {
    const resp = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (resp.ok) {
        return await resp.json();
    } else {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "));
    }
});

//get logged in user
export const myPage = createAsyncThunk("user/my-page", async () => {
    const resp = await fetch("/my-page")
    if (resp.ok) {
        return await resp.json();
    }
})

//logout user frontend
export const logout = createAsyncThunk("user/logout", async () => {
    await fetch("/logout", {
        method: "DELETE", 
    })
});


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        //reset error messages when navigating away from component
        resetError: (state) => {
            state.loading = false;
            state.error = null;
        },
        addMealToUser: (state, action) => {
            state.user.meals.push(action.payload);
        },
        removeMealFromUser: (state, action) => {
            const index = state.user.meals.findIndex((meal) => meal.id === action.payload);
            state.user.meals.splice(index, 1);
        },
        addUpdatedMealToUser: (state, action) => {
            const index = state.user.meals.findIndex((meal) => meal.id === action.payload.id);
            state.user.meals.splice(index, 1, action.payload);
        },
        addExerciseToUser: (state, action) => {
            state.user.exercises.push(action.payload);
        },
        removeExerciseFromUser: (state, action) => {
            const index = state.user.exercises.findIndex((exercise) => exercise.id === action.payload);
            state.user.exercises.splice(index, 1);
        },
        updateTotalCaloriesByDate: (state, action) => {
            state.user.total_calories_by_date = action.payload;
        }
    },
    extraReducers: {
        [signup.pending](state) {
            state.loading = true;
        },
        [signup.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [signup.fulfilled](state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        [login.pending](state) {
            state.loading = true;
        },
        [login.rejected](state, action) {
            state.error = action.error.message;
            state.loading = false;
        },
        [login.fulfilled](state, action) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        [myPage.pending](state) {
            state.loading = true;
        },
        [myPage.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message
        },
        [myPage.fulfilled](state, action) {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        [logout.pending](state) {
            state.loading = true;
        },
        [logout.fulfilled](state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const { resetError, addMealToUser, addUpdatedMealToUser, removeMealFromUser, addExerciseToUser, removeExerciseFromUser, updateTotalCaloriesByDate } = authSlice.actions;

export default authSlice.reducer;