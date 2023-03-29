import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const login = createAsyncThunk("user/login", async (body) => {
    const resp = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await resp.json();
});

export const logout = createAsyncThunk("user/logout", async () => {
    const resp = await fetch("/logout", {
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
        
    },
    extraReducers: {
        [login.pending](state) {
            state.loading = true;
        },
        [login.fulfilled](state, action) {
            state.user = action.payload;
            state.loading = false;
        },
        [logout.pending](state) {
            state.loading = true;
        },
        [logout.fulfilled](state) {
            state.user = null;
            state.loading = false;
        }
    }
})

export default authSlice.reducer;