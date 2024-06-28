import { createSlice } from "@reduxjs/toolkit";

const authToken = localStorage.getItem("auth_token");
const initialState = { isAuthenticate: !!authToken };

const authsSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    updateAuthenticate(state, action) {
      state.isAuthenticate = action.payload;
    },
  },
});

export const { updateAuthenticate } = authsSlice.actions;
export default authsSlice.reducer;
