import { GET, ADD, LIKE_POST } from "./types";

const initialState = {
  posts: [],
  post: null,
  likes: [],
  added_post: null,
  updated_post: null,
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        posts: action.post,
      };
    case ADD:
      return {
        ...state,
        added_post: action.post,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: action.post,
      };

    default:
      return state;
  }
};
