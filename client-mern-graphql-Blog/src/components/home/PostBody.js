import React, { useContext } from "react";
import styled from "styled-components";
import Post from "./Post";
import PostForm from "./PostForm";
import { BlogContext } from "../blogContext/BlogProvider";

const PostBody = () => {
  const { posts } = useContext(BlogContext);
  const PostComponent = posts && posts.map(post => <Post key={post._id} post={post} />);
  return (
    <>
      <H1>
        <i className='fa fa-plus'></i> Create Post
      </H1>
      <PostForm />
      <Grid>
        {PostComponent}
      </Grid>
    </>
  );
};

const Grid = styled.div`
  display: grid;
  padding: 2% 20%;
`;

const H1 = styled.h1`
  padding: 0.5rem 20% 0 20%;
  font-size: 1.5rem;
  color: #777;
  i {
    color: teal;
  }
`;

export default PostBody;
