import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../blogContext/BlogProvider";
import styled from "styled-components";
import moment from "moment";

const Comments = () => {
  const {
    getAPost,
    single_post,
    likePost,
    comment,
    like,
    createComment
  } = useContext(BlogContext);
  const [form, setForm] = useState("");
  const [tracker, setTracker] = useState(false);
  const { commentId } = useParams();
  useEffect(() => {
    getAPost(commentId);
  }, [tracker, commentId]);

  const onsubmit = e => {
    e.preventDefault();
    setTracker(!tracker);
    setForm("");
    createComment(form, commentId);
  };

  const ShowComment = comment.map((c, i) => <Comment key={i} c={c} />);

  return (
    <div>
      <SubGrid>
        <div className='user'>
          {/* <p className='avatar'>{single_post.username}</p> */}
          <div>
            <p>{single_post.username}</p>
            <p className='date'>
              <span>
                {moment(single_post.createdAt).fromNow(true)}{" "}
                <i className='fas fa-users'></i>
              </span>
            </p>
          </div>
        </div>
        <div className='body'>
          <p>{single_post.body}</p>
        </div>
        <div className='comment'>
          <span onClick={() => likePost(single_post._id)}>
            <i className='fas fa-heart'></i> {like.length}
          </span>
          <div>
            <span style={{ color: "orangered", paddingRight: "1.3rem" }}>
              <i className='fas fa-trash'></i>
            </span>
            <span>
              <i className='fas fa-comments'></i> {comment.length}
            </span>
          </div>
        </div>
      </SubGrid>

      <Form>
        <form onSubmit={onsubmit}>
          <div className='input-group'>
            <i className='fas fa-blog icon'></i>
            <input
              type='text'
              name='body'
              placeholder='What is on your mind!!!'
              onChange={e => setForm(e.target.value)}
            />
          </div>
        </form>
      </Form>

      <Div>{ShowComment}</Div>
    </div>
  );
};

const Div = styled.div`
  padding: 0 20%;
`;

const SubGrid = styled.div`
  padding: 2% 15%;
  border-radius: 5px;
  border: 0.3px solid #999;
  box-shadow: 0 2px 25px #eee;
  margin: 0.5% 0;
  .user {
    display: flex;
    padding-bottom: 1rem;
    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #999;
      margin-right: 20px;
      font-size: 1.5rem;
    }
    p:first-child {
      color: #4267b2;
    }
    .date {
      font-size: 0.7rem;
    }
  }
  .body {
    padding: 0rem 4rem 1.1rem 0rem;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    padding: 5px 0;
    span:first-child {
      /* color: #999; */
    }
    .trash {
      padding-right: 1.3rem;
      color: #ff0000;
    }
  }
`;

const Form = styled.div`
  padding: 2% 20%;
  form {
    width: 100%;
    .input-group {
      width: 100%;
      display: flex;
      position: relative;
      .icon {
        font-size: 2.5rem;
        position: absolute;
        top: 25%;
        left: 1%;
        color: #4267b2;
      }
      input {
        width: 100%;
        padding: 30px 20px 30px 3.5rem;
        border: 0.3px solid #999;
        border-radius: 5px;
        box-shadow: 0 5px 25px #eee;
        font-size: 1.5rem;
        outline: none;
      }
    }
  }
`;

export default Comments;

const Comment = ({ c }) => (
  <SubGrid>
    <div className='user'>
      <div>
        <p>{c.username}</p>
        <p className='date'>
          <span>
            {moment(c.createdAt).fromNow(true)} <i className='fas fa-users'></i>
          </span>
        </p>
      </div>
    </div>
    <div className='body'>
      <p>{c.body}</p>
    </div>
  </SubGrid>
);
