import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../BlogRedux/store";
import PostCard from "./PostBody";
import PostForm from "./PostForm";

const Post = () => {
  const dispatch = useDispatch();
  const posts = useSelector(({ posts: { posts } }) => posts);
  const added_post = useSelector(({ posts: { added_post } }) => added_post);
  const likes = useSelector(({ posts: { likes } }) => likes);

  useEffect(() => {
    getAllPosts(dispatch);
  }, [added_post, likes]);

  return (
    <Container>
      <PostForm />
      <Grid>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Grid>
    </Container>
  );
};

export default Post;

export const Container = styled.div``;
export const Grid = styled.div``;
