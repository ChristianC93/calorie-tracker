import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("/login", async (body) => {
    const resp = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await resp.json();
});

export const logout = createAsyncThunk("/logout", async () => {
    const resp = await fetch("/logout", {
        method: "DELETE"
    })
    return resp.json();
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false
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
        }
    }
})

export default userSlice.reducer;