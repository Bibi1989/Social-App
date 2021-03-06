import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Form } from "./PostForm";
import { Icon, Button, Label } from "semantic-ui-react";
import { getAPost, createComment } from "../BlogRedux/store";
import { Buttons, H1 } from "./PostBody";

const Comments = () => {
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState("");
  const post = useSelector(({ posts: { post } }) => post);
  const added_comment = useSelector(
    ({ posts: { added_comment } }) => added_comment
  );
  useEffect(() => {
    getAPost(dispatch, commentId);
  }, [added_comment]);
  const handleInput = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setForm(value);
  };
  console.log({ post });

  const onsubmit = (e) => {
    e.preventDefault();

    createComment(dispatch, form, commentId);
    setForm({
      body: "",
    });
  };
  return (
    <Container>
      <Row>
        <div className='post'>
          <H1>{post !== null && post.body}</H1>
          <Buttons>
            <Button as='div' labelPosition='right'>
              <Button icon color='red'>
                <Icon name='heart' />
              </Button>
              <Label as='a' basic pointing='left' color='red'>
                {post !== null && post.likes.length}
              </Label>
            </Button>
            <Button as='div' labelPosition='left'>
              <Label as='a' basic color='blue'>
                {post !== null && post.comments.length}
              </Label>
              <Button icon color='blue'>
                <Icon name='comments' />
              </Button>
            </Button>
          </Buttons>
        </div>
      </Row>
      <Form onSubmit={onsubmit}>
        <div className='input-group'>
          <Icon name='comment' className='icon' size='big' />
          <input
            type='text'
            name='body'
            placeholder='Comment on this post!!!'
            onChange={handleInput}
          />
        </div>
      </Form>
      {post !== null &&
        post.comments.map((comment) => (
          <Comment comment={comment !== null && comment} />
        ))}
    </Container>
  );
};

export const Container = styled.div``;
export const SubGrid = styled.div`
  max-width: 80%;
  background: #ffffff;
  margin: auto;
  padding: 1em;
  border-radius: 0.8em;
  margin-bottom: 0.8em;
`;
export const Row = styled.div`
  padding: 2% 10%;

  .post {
    background: #ffffff;
    padding: 1em;
    border-radius: 0.8em;
  }
`;
// export const H1 = styled.h1``;

export default Comments;

const Comment = ({ comment }) => (
  <SubGrid>
    <div className='user'>
      <div>
        <p>{comment.username}</p>
        <div className='body'>
          <p>{comment.body}</p>
        </div>
        <p className='date'>
          <span>
            {moment(comment.createdAt).fromNow(true)}{" "}
            <i className='fas fa-users'></i>
          </span>
        </p>
      </div>
    </div>
  </SubGrid>
);
