import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("access_token");
const role = localStorage.getItem("role");
const initialState = {
  accessToken: accessToken,
  role: role
};

const authsSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    updateAuthenticate(state, action) {
      console.log(action.payload);
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
    },
  },
});

export const { updateAuthenticate } = authsSlice.actions;
export default authsSlice.reducer;
