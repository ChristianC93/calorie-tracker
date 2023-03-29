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
        method: "DELETE"
    })
    return resp.json();
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        entity: null,
        loading: false
    },
    reducers: {
        
    },
    extraReducers: {
        [login.pending](state) {
            state.loading = true;
        },
        [login.fulfilled](state, action) {
            state.entity = action.payload;
            state.loading = false;
        }
    }
})

export default userSlice.reducer;