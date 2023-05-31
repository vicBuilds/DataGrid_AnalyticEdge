import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userArray: [],
  size: 0,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    storeData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   console.log("----****----", action.payload);
      state.userArray = state.userArray.length
        ? [...state.userArray, ...action.payload]
        : action.payload;

      state.size = state.userArray.length;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeData } = userSlice.actions;

export default userSlice.reducer;
