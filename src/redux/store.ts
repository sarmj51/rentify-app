import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/propertySlice";
import appointmentReducer from "./slices/appointmentSlice";
import authSliceReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        property: propertyReducer,
        appointment: appointmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;