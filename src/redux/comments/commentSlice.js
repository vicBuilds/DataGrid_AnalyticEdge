import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentArray: [],
  size: 0,
  startingIndexForDataToBeShown: 0,
  endingIndexForDataToBeShown: 10,
  currentPage: 1,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    storeDataInComment: (state, action) => {
      if (state.commentArray.length === 100) {
        return;
      }
      state.commentArray = action.payload;
      state.size = state.commentArray.length;
    },
    changeIndexInComment: (state, action) => {
      let { si, ei, page } = action.payload;

      state.startingIndexForDataToBeShown = si;
      state.endingIndexForDataToBeShown = ei;
      state.currentPage = page;
    },
  },
});

export const { storeDataInComment, changeIndexInComment } =
  commentSlice.actions;

export default commentSlice.reducer;
