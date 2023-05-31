import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/users/userSlice";
import postReducer from "./redux/posts/postSlice";
import commentReducer from "./redux/comments/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});
