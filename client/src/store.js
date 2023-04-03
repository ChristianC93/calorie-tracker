import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import mealsReducer from "./features/meals/mealsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        meals: mealsReducer
    }
})

export default store;