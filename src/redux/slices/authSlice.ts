import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string,
    email: string,
    role: "tenant" | "owner" | "admin";
};

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{id: string; email: string; role: "tenant" | "owner" | "admin"}>) => {
            state.user = action.payload;
        },

        logout: (state) => {
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;