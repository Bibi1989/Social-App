import React from "react";
import { ADD_POST, GET_POSTS, LIKE_POST } from "./blogTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case ADD_POST:
      return {
        ...state,
        added_post: action.payload
      };
    case LIKE_POST:
      return {
        ...state,
        like_post: action.payload
      };
    default:
      return state;
  }
  return <div></div>;
};

export default reducer;
