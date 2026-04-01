import { loadAuth } from "@app/store/authPersistence";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const persisted = loadAuth();
const initialState: AuthState = {
  accessToken: persisted?.accessToken ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearCredentials: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
