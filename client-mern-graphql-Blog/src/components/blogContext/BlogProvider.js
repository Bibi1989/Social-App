import React, { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import reducer from "./reducer";
import { GET_POSTS, ADD_POST, LIKE_POST } from "./blogTypes";

export const BlogContext = createContext();

const initialState = {
  posts: [],
  added_post: {},
  like_post: {}
};

export const BlogProvider = ({ children }) => {
  const url = `http://localhost:5005/api/posts`;
  const [tracker, setTracker] = useState({
    updateState: false,
    like_style: ""
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPosts = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({ type: GET_POSTS, payload: response.data.data });
    } catch (error) {}
  };

  const addPost = async body => {
    const token = sessionStorage.getItem("blog");
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          auth: token
        }
      });
      setTracker({
        ...tracker,
        updateState: !tracker.updateState
      });
      dispatch({ type: ADD_POST, payload: response.data.data });
    } catch (error) {}
  };

  const likePost = async id => {
    const token = sessionStorage.getItem("blog");
    try {
      const response = await axios.post(
        `http://localhost:5005/api/likes`,
        { id },
        {
          headers: {
            auth: token
          }
        }
      );
      console.log(response.data);
      setTracker({
        updateState: !tracker.updateState,
        like_style: id
      });
      dispatch({ type: LIKE_POST, payload: response.data });
    } catch (error) {
      // dispatch({typ})
    }
  };
  useEffect(() => {
    getPosts();
  }, [tracker.updateState]);
  return (
    <BlogContext.Provider
      value={{
        posts: state.posts[0],
        addPost,
        likePost,
        like_style: tracker.like_style
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
