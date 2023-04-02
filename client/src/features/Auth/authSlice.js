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
    } else {
        const errorData = await resp.json();
        throw new Error(errorData.errors.join(", "))
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
            state.error = null;
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
        },
        [myPage.pending](state) {
            state.loading = true;
        },
        [myPage.fulfilled](state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        [logout.pending](state) {
            state.loading = true;
        },
        [logout.fulfilled](state) {
            state.user = null;
            state.loading = false;
        }
    }
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;