import React from "react";
import { ADD_POST, GET_POSTS } from "./blogTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
  return <div></div>;
};

export default reducer;
