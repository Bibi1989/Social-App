import axios from "axios";
import { LOADING, LIKE_POST } from "./types";
import { getAction, addAction, likePostAction } from "./actions";

const POST_URL = `http://localhost:5005/api`;

export const getAllPosts = async (dispatch) => {
  try {
    dispatch({ type: LOADING, loading: true });
    const response = await axios.get(`${POST_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: LOADING, loading: false });
    dispatch(getAction(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
export const addPost = async (dispatch, data) => {
  const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.post(`${POST_URL}/posts`, data, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    });
    dispatch(addAction(response.data));
  } catch (error) {}
};

export const likePost = async (dispatch, id) => {
  const token = sessionStorage.getItem("blog");
  try {
    const response = await axios.post(
      `${POST_URL}/likes`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    dispatch(likePostAction(response.data));
  } catch (error) {
    console.log(error);
  }
};
