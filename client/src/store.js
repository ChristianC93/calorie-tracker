import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import mealsReducer from "./features/meals/mealsSlice";
import exerciseReducer from "./features/exercises/exerciseSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        meals: mealsReducer,
        exercises: exerciseReducer
    }
});

export default store;