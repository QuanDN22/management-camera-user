import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("access_token");
const initialState = { accessToken: accessToken };

const authsSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    updateAuthenticate(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { updateAuthenticate } = authsSlice.actions;
export default authsSlice.reducer;
