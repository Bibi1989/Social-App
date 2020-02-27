import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "./reducer";
import { GET_POSTS } from "./blogTypes";

export const BlogContext = createContext();

const initialState = {
  posts: []
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = async () => {
    try {
      const response = await axios(`http://localhost:5005/api/posts`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({ type: GET_POSTS, payload: response.data.data });
    } catch (error) {}
  };

  const addPost = async (body) => {
    const token = sessionStorage.getItem("auth")
    try {
      const response = await axios(`http://localhost:5005/api/posts`, body, {
        headers: {
          "Content-Type": "application/json",
          "auth": token
        }
      });
      dispatch({ type: GET_POSTS, payload: response.data.data });
    } catch (error) {}
  };
  console.log(state.posts[0]);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <BlogContext.Provider
      value={{
        posts: state.posts[0],
        addPost
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
