import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, regime: [] },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    token: (state, action) => {
      state.value.token = action.payload;
    },
    initRegimes: (state, action) => {
      state.value.regime = action.payload;
    },
    addRegime: (state, action) => {
      state.value.regime.push(action.payload);
      console.log("added", action.payload);
    },
    removeRegime: (state, action) => {
      state.value.regime = state.value.regime.filter(
        (e) => e !== action.payload
      );
      console.log("removed", action.payload);
    },
  },
});

export const { token, addRegime, removeRegime, initRegimes } =
  userSlice.actions;
export default userSlice.reducer;
