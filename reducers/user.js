import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, regime: [], menu: null },
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
    setMenu: (state, action) => {
      state.value.menu = action.payload
    },
    clearMenu: (state, action) => {
      state.value.menu = null
    }
  },
});

export const { token, addRegime, removeRegime, initRegimes, setMenu, clearMenu } =
  userSlice.actions;
export default userSlice.reducer;
