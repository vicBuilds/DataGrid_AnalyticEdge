import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postArray: [],
  size: 0,
  startingIndexForDataToBeShown: 0,
  endingIndexForDataToBeShown: 10,
  currentPage: 1,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    storeDataInPost: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //   console.log("----****----", action.payload);
      if (state.postArray.length == 100) {
        return;
      }
      // state.postArray = state.postArray.length
      //   ? [...state.postArray, ...action.payload]
      //   : action.payload;
      state.postArray = action.payload;
      state.size = state.postArray.length;
    },
    changeIndexInPost: (state, action) => {
      let { si, ei, page } = action.payload;
      // console.log(action.payload);
      state.startingIndexForDataToBeShown = si;
      state.endingIndexForDataToBeShown = ei;
      state.currentPage = page;
      //console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeDataInPost, changeIndexInPost } = postSlice.actions;

export default postSlice.reducer;
